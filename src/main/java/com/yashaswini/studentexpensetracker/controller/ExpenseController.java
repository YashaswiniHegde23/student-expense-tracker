package com.yashaswini.studentexpensetracker.controller;

import com.yashaswini.studentexpensetracker.dto.ExpenseRequest;
import com.yashaswini.studentexpensetracker.model.Expense;
import com.yashaswini.studentexpensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.yashaswini.studentexpensetracker.dto.DashboardResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

import java.util.List;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public String addExpense(@Valid @RequestBody ExpenseRequest request) {
        return expenseService.addExpense(request);
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    @PutMapping("/{id}")
    public String updateExpense(@PathVariable Long id,
                                @Valid @RequestBody ExpenseRequest request) {
        return expenseService.updateExpense(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        return expenseService.deleteExpense(id);
    }

    @GetMapping("/category/{category}")
    public List<Expense> getExpensesByCategory(@PathVariable String category) {

        return expenseService.getExpensesByCategory(category);
    }

    @GetMapping("/search")
    public List<Expense> searchExpenses(@RequestParam String title) {

        return expenseService.searchExpensesByTitle(title);
    }

    @GetMapping("/date/{date}")
    public List<Expense> getExpensesByDate(@PathVariable LocalDate date) {

        return expenseService.getExpensesByDate(date);
    }

    @GetMapping("/date-range")
    public List<Expense> getExpensesBetweenDates(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return expenseService.getExpensesBetweenDates(startDate, endDate);
    }

    @GetMapping("/amount/greater")
    public List<Expense> getExpensesGreaterThan(@RequestParam Double amount) {

        return expenseService.getExpensesGreaterThan(amount);
    }

    @GetMapping("/amount/less")
    public List<Expense> getExpensesLessThan(@RequestParam Double amount) {

        return expenseService.getExpensesLessThan(amount);
    }

    @GetMapping("/amount/between")
    public List<Expense> getExpensesBetweenAmounts(
            @RequestParam Double min,
            @RequestParam Double max) {

        return expenseService.getExpensesBetweenAmounts(min, max);
    }

    @GetMapping("/user/{userId}/summary/total")
    public Double getTotalExpenses(@PathVariable Long userId) {

        return expenseService.getTotalExpenses(userId);
    }

    @GetMapping("/user/{userId}/summary/count")
    public Long getExpenseCount(@PathVariable Long userId) {

        return expenseService.getExpenseCount(userId);
    }

    @GetMapping("/user/{userId}/summary/category")
    public Map<String, Double> getCategoryWiseSummary(@PathVariable Long userId) {

        return expenseService.getCategoryWiseSummary(userId);
    }

    @GetMapping("/user/{userId}/summary/month")
    public Double getMonthlyExpenseSummary(
            @PathVariable Long userId,
            @RequestParam int month,
            @RequestParam int year) {

        return expenseService.getMonthlyExpenseSummary(userId, month, year);
    }

    @GetMapping("/user/{userId}/dashboard")
    public DashboardResponse getDashboardStatistics(@PathVariable Long userId) {

        return expenseService.getDashboardStatistics(userId);
    }

    @GetMapping("/pagination")
    public Page<Expense> getExpensesWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return expenseService.getExpensesWithPagination(page, size);
    }

    @GetMapping("/sort")
    public List<Expense> getExpensesSorted(
            @RequestParam(defaultValue = "date") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return expenseService.getExpensesSorted(sortBy, direction);
    }

    @GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportExpensesToExcel() throws IOException {

        byte[] excelData = expenseService.exportExpensesToExcel();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=expenses.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excelData);
    }
}
