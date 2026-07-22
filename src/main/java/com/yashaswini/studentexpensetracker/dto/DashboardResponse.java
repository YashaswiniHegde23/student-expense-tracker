package com.yashaswini.studentexpensetracker.dto;

public class DashboardResponse {

    private Double totalExpense;
    private Long expenseCount;
    private Double highestExpense;
    private Double lowestExpense;
    private Double averageExpense;

    public DashboardResponse() {
    }

    public DashboardResponse(Double totalExpense,
                             Long expenseCount,
                             Double highestExpense,
                             Double lowestExpense,
                             Double averageExpense) {
        this.totalExpense = totalExpense;
        this.expenseCount = expenseCount;
        this.highestExpense = highestExpense;
        this.lowestExpense = lowestExpense;
        this.averageExpense = averageExpense;
    }

    public Double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public Long getExpenseCount() {
        return expenseCount;
    }

    public void setExpenseCount(Long expenseCount) {
        this.expenseCount = expenseCount;
    }

    public Double getHighestExpense() {
        return highestExpense;
    }

    public void setHighestExpense(Double highestExpense) {
        this.highestExpense = highestExpense;
    }

    public Double getLowestExpense() {
        return lowestExpense;
    }

    public void setLowestExpense(Double lowestExpense) {
        this.lowestExpense = lowestExpense;
    }

    public Double getAverageExpense() {
        return averageExpense;
    }

    public void setAverageExpense(Double averageExpense) {
        this.averageExpense = averageExpense;
    }
}