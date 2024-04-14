package com.antaler.smlv.products.model.services;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenFoodResponse {

	private String status;
	
	private OpenFoodProduct product;
}
