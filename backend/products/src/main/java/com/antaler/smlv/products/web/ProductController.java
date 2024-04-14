package com.antaler.smlv.products.web;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.antaler.smlv.products.model.dto.AddProductBarcodeDTO;
import com.antaler.smlv.products.model.dto.ProductDTO;
import com.antaler.smlv.products.model.dto.ReduceProductBarcodeDTO;
import com.antaler.smlv.products.services.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("v1/products")
public class ProductController {

	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@PostMapping("barcode/add")
	public ResponseEntity<ProductDTO> add(@RequestBody AddProductBarcodeDTO addProduct) {
		return Optional.ofNullable(productService.addProductByBarCode(addProduct)).map(ResponseEntity::ok)
				.orElseGet(ResponseEntity.noContent()::build);
	}

	@PostMapping("barcode/reduce")
	public ResponseEntity<Map<String, Object>> reduce(@RequestBody ReduceProductBarcodeDTO reduceProduct) {
		var remainAmount = productService.reduceProductByBarcode(reduceProduct);
		ResponseEntity<Map<String,Object>> response;
		if (remainAmount < 0) {
			response = ResponseEntity.badRequest().body(Map.of("error", "the operation can't be performed"));
		} else {
			response = ResponseEntity.ok(Map.of("newAmount", remainAmount));
		}
		
		return response;
		
	}


	@PostMapping("manually/add")
	public String addManually(@RequestBody String entity) {
		
		
		return entity;
	}


	@GetMapping("calculate/nutrition")
	public String calculateNutrition(@RequestParam String param) {
		return new String();
	}


	@GetMapping("calculate/amount")
	public String calculateAmount(@RequestParam String param) {
		return new String();
	}


	
	
	
	

}
