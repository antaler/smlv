package com.antaler.smlv.products.services.impl;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.antaler.smlv.products.model.dto.AddProductBarcodeDTO;
import com.antaler.smlv.products.model.dto.ProductDTO;
import com.antaler.smlv.products.model.dto.ReduceProductBarcodeDTO;
import com.antaler.smlv.products.model.entity.Nutrition;
import com.antaler.smlv.products.model.entity.Product;
import com.antaler.smlv.products.repository.ProductsRepository;
import com.antaler.smlv.products.services.ProductService;
import com.antaler.smlv.products.services.external.OpenFoodService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProductServiceImpl implements ProductService {

    private final OpenFoodService openFoodService;
    private final KafkaTemplate<String, String> kfk;

    private final ProductsRepository repo;

    public ProductServiceImpl(OpenFoodService openFoodService, KafkaTemplate<String, String> kfk, ProductsRepository repo) {
        this.openFoodService = openFoodService;
        this.kfk = kfk;
        this.repo = repo;
    }

    @Override
    public ProductDTO addProductByBarCode(AddProductBarcodeDTO addProductBarcodeDTO) {

        var productExisting = repo.findByBarcode(addProductBarcodeDTO.barcode()).map(product -> {
            product.setAmount(addProductBarcodeDTO.amount() + product.getAmount());
            return product;
        });
        Product productSaved = productExisting.map(repo::save)
                .orElseGet(() -> this.openFoodService.getProductByBarCode(addProductBarcodeDTO.barcode()).map(openProduct -> {
                    var product = new Product();
                    product.setName(openProduct.getName());
                    product.setBarcode(addProductBarcodeDTO.barcode());
                    product.setAmount(addProductBarcodeDTO.amount());
                    product.setAmountType(addProductBarcodeDTO.amountType());

                    var nutrition = new Nutrition(openProduct.getCarbohydrates(),
                            openProduct.getEnergy(), openProduct.getProteins(),
                            openProduct.getFat(), openProduct.getSalt(),
                            openProduct.getSaturatedFat(), openProduct.getSugars());

                    product.setNutrition(nutrition);
                    return product;
                }).map(repo::insert).orElse(null));

        try {
            kfk.send("products","add", new ObjectMapper().writeValueAsString(productSaved));
        }catch (Exception ignored) {}

        if (productSaved == null) {
            return null;
        }

        return new ProductDTO(productSaved.getName());


    }
    
    @Override
    public float reduceProductByBarcode(ReduceProductBarcodeDTO reduceProductDTO) {
    	 var productExisting = repo.findByBarcode(reduceProductDTO.barcode());
    	 
    	 if (productExisting.isEmpty() || Float.compare(0f, reduceProductDTO.amount())  >= 0 ||  Float.compare(reduceProductDTO.amount(), productExisting.get().getAmount())  >  0) {
			return -1;
		}
    	var newAmount = productExisting.get().getAmount() - reduceProductDTO.amount();
    	productExisting.get().setAmount(newAmount);
    	var productSaved = repo.save(productExisting.get());
    	try {
            kfk.send("products",Float.compare(0, newAmount) == 0 ? "empty": "reduce", new ObjectMapper().writeValueAsString(productSaved));
        }catch (Exception ignored) {}
   
    	 
    	return newAmount;
    }

}
