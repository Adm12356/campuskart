package com.campuskart.service.impl;

import com.campuskart.dto.ProductRequest;
import com.campuskart.dto.ProductResponse;
import com.campuskart.model.Product;
import com.campuskart.repository.ProductRepository;
import com.campuskart.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repo;

    @Override
    public ProductResponse addProduct(ProductRequest request, String sellerEmail) { // ✅ accepts seller

        if (request.getPrice() <= 0) {
            throw new RuntimeException("Price must be greater than 0");
        }

        Product product = new Product();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setLocation(request.getLocation());
        product.setCategory(request.getCategory());
        product.setSellerEmail(sellerEmail); // ✅ set from JWT, not from request body

        Product saved = repo.save(product);
        return mapToResponse(saved);
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        return repo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getByCategory(String category) {
        return repo.findByCategory(category)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getByLocation(String location) {
        return repo.findByLocation(location)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> getMyProducts(String sellerEmail) { // ✅ new
        return repo.findBySellerEmail(sellerEmail)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    @Override
    public void deleteProduct(Long id, String sellerEmail) {

        Product product = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // ✅ only the seller who posted it can delete it
        if (!product.getSellerEmail().equals(sellerEmail)) {
            throw new RuntimeException("You are not authorized to delete this product");
        }

        repo.delete(product);
    }

    private ProductResponse mapToResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .price(p.getPrice())
                .location(p.getLocation())
                .category(p.getCategory())
                .sellerEmail(p.getSellerEmail()) // ✅
                .build();
    }
}