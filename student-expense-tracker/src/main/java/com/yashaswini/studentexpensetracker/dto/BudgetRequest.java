package com.yashaswini.studentexpensetracker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class BudgetRequest {

    @NotNull(message = "Amount is required")
    @Min(value = 0, message = "Budget cannot be negative")
    private Double amount;

    @NotNull(message = "Month is required")
    private Integer month;

    @NotNull(message = "Year is required")
    private Integer year;

    @NotNull(message = "User ID is required")
    private Long userId;


    public BudgetRequest() {
    }


    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }


    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }


    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}