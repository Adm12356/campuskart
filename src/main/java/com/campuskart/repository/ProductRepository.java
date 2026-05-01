package com.campuskart.repository;

import com.campuskart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findByLocation(String location);
    List<Product> findBySellerEmail(String sellerEmail); // ✅ new
}