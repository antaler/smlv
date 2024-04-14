package com.antaler.smlv.products.model.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.antaler.smlv.products.model.dto.AmountType;

import lombok.Data;

@Data
@Document(collection = "products")
public class Product {
	
	@Id
	private String id;
	
	private String name;
	
	private String barcode;
	
	private Nutrition nutrition;
	
	private Float amount;
	 
	private AmountType amountType;


}
