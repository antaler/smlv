package com.antaler.smlv.products.services.external;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.antaler.smlv.products.model.services.OpenFoodProduct;
import com.antaler.smlv.products.model.services.OpenFoodResponse;
import com.antaler.smlv.products.properties.AppProperties;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OpenFoodService {

	private WebClient wc;
	private String url;

	public OpenFoodService(WebClient wc, AppProperties appProps) {
		this.wc = wc;
		this.url = appProps.getExternalServices().openFood();
	}

	public Optional<OpenFoodProduct> getProductByBarCode(String barcode) {
		
		
		var urlCode = url.replace("_BARCODE_",barcode);
		try {
			var response = this.wc.get().uri(URI.create(urlCode)).retrieve().toEntity(OpenFoodResponse.class).toFuture()
					.get();
			if (response.getStatusCode() != HttpStatus.OK || !response.getBody().getStatus().equals("success")) {
				return Optional.empty();
			}

			return Optional.ofNullable(response.getBody()).map(OpenFoodResponse::getProduct);
		} catch (InterruptedException | ExecutionException e) {
			return Optional.empty();
		}

		

	}


}
