package com.antaler.smlv.products.model.dto;

public record AddManuallyProductDTO(String barcode,String name,Float amount,AmountType amountType,NutritionDTO nutrition) {

}
