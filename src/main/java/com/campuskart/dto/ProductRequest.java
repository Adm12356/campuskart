package com.campuskart.dto;

import lombok.Data;

@Data
public class ProductRequest {
    private String title;
    private String description;
    private double price;
    private String location;
    private String category;
}
