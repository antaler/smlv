package com.antaler.smlv.products.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.antaler.smlv.products.model.entity.Product;

public interface ProductsRepository extends MongoRepository<Product, String> {

	@Query("{barcode: ?0}")
	Optional<Product> findByBarcode(String barcode);
}
