package com.antaler.smlv.products.model.services;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class OpenFoodProduct {

	@JsonProperty("carbohydrates_100g")
	private float carbohydrates;
	@JsonProperty("energy-kcal_100g")
	private float energy;
	@JsonProperty("product_name")
	private String name;
	@JsonProperty("proteins_100g")
	private float proteins;
	@JsonProperty("fat_100g")
	private float fat;
	@JsonProperty("salt_100g")
	private float salt;
	@JsonProperty("saturated-fat_100g")
	private float saturatedFat;
	@JsonProperty("sugars_100g")
	private float sugars;

}
