package com.campuskart.controller;

import com.campuskart.dto.ProductRequest;
import com.campuskart.dto.ProductResponse;
import com.campuskart.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService service;

    // ➕ Add Product — seller email comes from JWT, not request body
    @PostMapping
    public ProductResponse addProduct(@RequestBody ProductRequest request,
                                      Principal principal) { // ✅ Spring injects this from JWT
        return service.addProduct(request, principal.getName()); // principal.getName() = email
    }
    // 🗑 Delete Product — only the seller can delete their own product
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id,
                                                Principal principal) {
        service.deleteProduct(id, principal.getName());
        return ResponseEntity.ok("Product deleted");
    }

    // 📦 Get All Products
    @GetMapping
    public List<ProductResponse> getAll() {
        return service.getAllProducts();
    }

    // 🔍 Filter by Category
    @GetMapping("/category/{category}")
    public List<ProductResponse> getByCategory(@PathVariable String category) {
        return service.getByCategory(category);
    }

    // 📍 Filter by Location
    @GetMapping("/location/{location}")
    public List<ProductResponse> getByLocation(@PathVariable String location) {
        return service.getByLocation(location);
    }

    // 👤 My Listings
    @GetMapping("/my")
    public List<ProductResponse> getMyProducts(Principal principal) { // ✅ new
        return service.getMyProducts(principal.getName());
    }
}