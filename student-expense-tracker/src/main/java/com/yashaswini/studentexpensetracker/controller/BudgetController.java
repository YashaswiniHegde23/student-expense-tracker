package com.yashaswini.studentexpensetracker.controller;

import com.yashaswini.studentexpensetracker.dto.BudgetRequest;
import com.yashaswini.studentexpensetracker.dto.BudgetStatusResponse;
import com.yashaswini.studentexpensetracker.model.Budget;
import com.yashaswini.studentexpensetracker.service.BudgetService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;


    @PostMapping
    public String setBudget(
            @Valid @RequestBody BudgetRequest request) {

        return budgetService.setBudget(request);
    }


    @GetMapping("/user/{userId}")
    public Budget getBudget(
            @PathVariable Long userId,
            @RequestParam Integer month,
            @RequestParam Integer year) {

        return budgetService.getBudget(
                userId,
                month,
                year
        );
    }


    @PutMapping("/user/{userId}")
    public String updateBudget(
            @PathVariable Long userId,
            @Valid @RequestBody BudgetRequest request) {

        return budgetService.updateBudget(
                userId,
                request
        );
    }


    @GetMapping("/user/{userId}/status")
    public BudgetStatusResponse getBudgetStatus(
            @PathVariable Long userId,
            @RequestParam Integer month,
            @RequestParam Integer year) {

        return budgetService.getBudgetStatus(
                userId,
                month,
                year
        );
    }
}