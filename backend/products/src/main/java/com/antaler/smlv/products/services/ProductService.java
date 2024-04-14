package com.antaler.smlv.products.services;

import com.antaler.smlv.products.model.dto.AddProductBarcodeDTO;
import com.antaler.smlv.products.model.dto.AmountType;
import com.antaler.smlv.products.model.dto.ProductDTO;
import com.antaler.smlv.products.model.dto.ReduceProductBarcodeDTO;
import com.antaler.smlv.products.model.services.OpenFoodProduct;

public interface ProductService {

	
	ProductDTO addProductByBarCode(AddProductBarcodeDTO addProductBarcodeDTO);
	
	float reduceProductByBarcode(ReduceProductBarcodeDTO reduceProductDTO);
}
