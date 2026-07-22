package com.yashaswini.studentexpensetracker.service;

import com.yashaswini.studentexpensetracker.dto.BudgetRequest;
import com.yashaswini.studentexpensetracker.exception.ResourceNotFoundException;
import com.yashaswini.studentexpensetracker.model.Budget;
import com.yashaswini.studentexpensetracker.model.User;
import com.yashaswini.studentexpensetracker.repository.BudgetRepository;
import com.yashaswini.studentexpensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.yashaswini.studentexpensetracker.dto.BudgetStatusResponse;
import com.yashaswini.studentexpensetracker.repository.ExpenseRepository;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public String setBudget(BudgetRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

        Budget existingBudget = budgetRepository.findByUserIdAndMonthAndYear(
                request.getUserId(),
                request.getMonth(),
                request.getYear()
        );

        if (existingBudget != null) {
            return "Budget already exists for this month";
        }

        Budget budget = new Budget();

        budget.setAmount(request.getAmount());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setUser(user);

        budgetRepository.save(budget);

        return "Budget Set Successfully";
    }

    public Budget getBudget(Long userId, Integer month, Integer year) {

        Budget budget = budgetRepository.findByUserIdAndMonthAndYear(userId, month, year);

        if (budget == null) {
            throw new ResourceNotFoundException("Budget Not Found");
        }

        return budget;
    }

    public String updateBudget(Long userId, BudgetRequest request) {

        Budget budget = budgetRepository.findByUserIdAndMonthAndYear(
                userId,
                request.getMonth(),
                request.getYear()
        );

        if (budget == null) {
            throw new ResourceNotFoundException("Budget Not Found");
        }

        budget.setAmount(request.getAmount());

        budgetRepository.save(budget);

        return "Budget Updated Successfully";
    }

    public BudgetStatusResponse getBudgetStatus(Long userId, Integer month, Integer year) {

        Budget budget = budgetRepository.findByUserIdAndMonthAndYear(userId, month, year);

        if (budget == null) {
            throw new ResourceNotFoundException("Budget Not Found");
        }

        Double totalSpent = expenseRepository.getMonthlyExpenseSummary(userId, month, year);

        if (totalSpent == null) {
            totalSpent = 0.0;
        }

        BudgetStatusResponse response = new BudgetStatusResponse();

        response.setBudget(budget.getAmount());
        response.setTotalSpent(totalSpent);
        response.setRemainingBudget(budget.getAmount() - totalSpent);
        response.setBudgetExceeded(totalSpent > budget.getAmount());

        return response;
    }
}