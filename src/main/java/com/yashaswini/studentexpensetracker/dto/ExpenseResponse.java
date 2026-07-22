package com.yashaswini.studentexpensetracker.dto;

import java.time.LocalDate;

public class ExpenseResponse {

    private Long id;
    private String title;
    private String category;
    private Double amount;
    private LocalDate date;
    private String description;

    public ExpenseResponse() {
    }

    public ExpenseResponse(Long id, String title, String category, Double amount, LocalDate date, String description) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}