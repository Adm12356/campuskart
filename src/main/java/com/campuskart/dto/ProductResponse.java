package com.campuskart.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponse {
    private Long id;
    private String title;
    private String description;
    private double price;
    private String location;
    private String category;
    private String sellerEmail; // ✅ so frontend knows who posted it
}