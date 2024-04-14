package com.antaler.smlv.products.model.errors;


import com.antaler.smlv.products.model.dto.AddProductBarcodeDTO;

public class ProductBarcodeNotFoundException extends RuntimeException {

    private final AddProductBarcodeDTO addProductBarcodeDTO;

    public ProductBarcodeNotFoundException(AddProductBarcodeDTO addProductBarcodeDTO) {
        super("Product %s can't be created with barcode".formatted(addProductBarcodeDTO.barcode()));
       this.addProductBarcodeDTO = addProductBarcodeDTO;
    }

    public AddProductBarcodeDTO getProductData() {
        return addProductBarcodeDTO;
    }

   




}
