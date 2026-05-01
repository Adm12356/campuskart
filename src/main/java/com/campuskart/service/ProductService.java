package com.campuskart.service;

import com.campuskart.dto.ProductRequest;
import com.campuskart.dto.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse addProduct(ProductRequest request, String sellerEmail); // ✅ updated signature
    List<ProductResponse> getAllProducts();
    List<ProductResponse> getByCategory(String category);
    List<ProductResponse> getByLocation(String location);
    List<ProductResponse> getMyProducts(String sellerEmail);               // ✅ new
    void deleteProduct(Long id, String sellerEmail);
}