package com.yashaswini.studentexpensetracker.dto;

public class BudgetStatusResponse {

    private Double budget;
    private Double totalSpent;
    private Double remainingBudget;
    private boolean budgetExceeded;

    public BudgetStatusResponse() {
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public Double getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(Double totalSpent) {
        this.totalSpent = totalSpent;
    }

    public Double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(Double remainingBudget) {
        this.remainingBudget = remainingBudget;
    }

    public boolean isBudgetExceeded() {
        return budgetExceeded;
    }

    public void setBudgetExceeded(boolean budgetExceeded) {
        this.budgetExceeded = budgetExceeded;
    }
}