package com.antaler.smlv.products.web;

import java.net.URI;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.antaler.smlv.products.model.errors.ProductBarcodeNotFoundException;
import com.antaler.smlv.products.properties.AppProperties;

@ControllerAdvice
public class ErrorController {

    private URI redirectProductBarcodeNotFound;;

    ErrorController(AppProperties props) {
        this.redirectProductBarcodeNotFound = URI.create(props.getRedirects().productBarcodeNotFound());
    }

    @ExceptionHandler(ProductBarcodeNotFoundException.class)
    ResponseEntity<Map<String, Object>> productBarcodeNotFound(ProductBarcodeNotFoundException e) {
        Map<String, Object> body = Map.of("partialData", e.getProductData());

        return ResponseEntity.status(HttpStatus.PERMANENT_REDIRECT).location(redirectProductBarcodeNotFound).body(body);
    }

}
