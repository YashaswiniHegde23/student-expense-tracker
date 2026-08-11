package com.yashaswini.studentexpensetracker.service;

import com.yashaswini.studentexpensetracker.dto.DashboardResponse;
import com.yashaswini.studentexpensetracker.dto.ExpenseRequest;
import com.yashaswini.studentexpensetracker.exception.ResourceNotFoundException;
import com.yashaswini.studentexpensetracker.model.Expense;
import com.yashaswini.studentexpensetracker.model.User;
import com.yashaswini.studentexpensetracker.repository.ExpenseRepository;
import com.yashaswini.studentexpensetracker.repository.UserRepository;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));
    }

    public String addExpense(ExpenseRequest request) {

        User user = getLoggedInUser();

        Expense expense = new Expense();

        expense.setTitle(request.getTitle());
        expense.setCategory(request.getCategory());
        expense.setAmount(request.getAmount());
        expense.setDate(request.getDate());
        expense.setDescription(request.getDescription());
        expense.setUser(user);

        expenseRepository.save(expense);

        return "Expense Added Successfully";
    }

    public List<Expense> getAllExpenses() {

        User user = getLoggedInUser();

        return expenseRepository.findByUserId(user.getId());
    }

    public Expense getExpenseById(Long id) {

        User user = getLoggedInUser();

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense Not Found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Expense Not Found");
        }

        return expense;
    }

    public String updateExpense(
            Long id,
            ExpenseRequest request) {

        User user = getLoggedInUser();

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense Not Found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Expense Not Found");
        }

        expense.setTitle(request.getTitle());
        expense.setCategory(request.getCategory());
        expense.setAmount(request.getAmount());
        expense.setDate(request.getDate());
        expense.setDescription(request.getDescription());

        expenseRepository.save(expense);

        return "Expense Updated Successfully";
    }

    public String deleteExpense(Long id) {

        User user = getLoggedInUser();

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense Not Found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Expense Not Found");
        }

        expenseRepository.delete(expense);

        return "Expense Deleted Successfully";
    }

    public List<Expense> getExpensesByCategory(
            String category) {

        User user = getLoggedInUser();

        return expenseRepository.findByCategoryAndUserId(
                category,
                user.getId()
        );
    }

    public List<Expense> searchExpensesByTitle(
            String title) {

        User user = getLoggedInUser();

        return expenseRepository
                .findByTitleContainingIgnoreCaseAndUserId(
                        title,
                        user.getId()
                );
    }

    public List<Expense> getExpensesByDate(
            LocalDate date) {

        User user = getLoggedInUser();

        return expenseRepository.findByDateAndUserId(
                date,
                user.getId()
        );
    }

    public List<Expense> getExpensesBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        User user = getLoggedInUser();

        return expenseRepository.findByDateBetweenAndUserId(
                startDate,
                endDate,
                user.getId()
        );
    }

    public List<Expense> getExpensesGreaterThan(
            Double amount) {

        User user = getLoggedInUser();

        return expenseRepository
                .findByAmountGreaterThanAndUserId(
                        amount,
                        user.getId()
                );
    }

    public List<Expense> getExpensesLessThan(
            Double amount) {

        User user = getLoggedInUser();

        return expenseRepository
                .findByAmountLessThanAndUserId(
                        amount,
                        user.getId()
                );
    }

    public List<Expense> getExpensesBetweenAmounts(
            Double min,
            Double max) {

        User user = getLoggedInUser();

        return expenseRepository
                .findByAmountBetweenAndUserId(
                        min,
                        max,
                        user.getId()
                );
    }

    public Double getTotalExpenses(Long userId) {

        Double total =
                expenseRepository.getTotalExpensesByUserId(userId);

        return total != null ? total : 0.0;
    }

    public Long getExpenseCount(Long userId) {

        return expenseRepository.getExpenseCountByUserId(userId);
    }

    public Map<String, Double> getCategoryWiseSummary(
            Long userId) {

        List<Object[]> results =
                expenseRepository.getCategoryWiseSummary(userId);

        Map<String, Double> summary =
                new HashMap<>();

        for (Object[] row : results) {

            summary.put(
                    (String) row[0],
                    (Double) row[1]
            );
        }

        return summary;
    }

    public Double getMonthlyExpenseSummary(
            Long userId,
            int month,
            int year) {

        Double total =
                expenseRepository.getMonthlyExpenseSummary(
                        userId,
                        month,
                        year
                );

        return total != null ? total : 0.0;
    }

    public DashboardResponse getDashboardStatistics(
            Long userId) {

        Double totalExpense =
                expenseRepository.getTotalExpensesByUserId(userId);

        Long expenseCount =
                expenseRepository.getExpenseCountByUserId(userId);

        Double highestExpense =
                expenseRepository.getHighestExpense(userId);

        Double lowestExpense =
                expenseRepository.getLowestExpense(userId);

        Double averageExpense =
                expenseRepository.getAverageExpense(userId);

        return new DashboardResponse(
                totalExpense != null ? totalExpense : 0.0,
                expenseCount != null ? expenseCount : 0L,
                highestExpense != null ? highestExpense : 0.0,
                lowestExpense != null ? lowestExpense : 0.0,
                averageExpense != null ? averageExpense : 0.0
        );
    }

    public Page<Expense> getExpensesWithPagination(
            int page,
            int size) {

        User user = getLoggedInUser();

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("date").descending()
                );

        return expenseRepository.findByUserId(
                user.getId(),
                pageable
        );
    }

    public List<Expense> getExpensesSorted(
            String sortBy,
            String direction) {

        User user = getLoggedInUser();

        Sort sort;

        if (direction.equalsIgnoreCase("desc")) {

            sort = Sort.by(sortBy).descending();

        } else {

            sort = Sort.by(sortBy).ascending();
        }

        return expenseRepository.findByUserId(
                user.getId(),
                sort
        );
    }

    public byte[] exportExpensesToExcel()
            throws IOException {

        User user = getLoggedInUser();

        XSSFWorkbook workbook =
                new XSSFWorkbook();

        Sheet sheet =
                workbook.createSheet("Expenses");

        Row header =
                sheet.createRow(0);

        header.createCell(0)
                .setCellValue("Title");

        header.createCell(1)
                .setCellValue("Category");

        header.createCell(2)
                .setCellValue("Amount");

        header.createCell(3)
                .setCellValue("Date");

        header.createCell(4)
                .setCellValue("Description");

        List<Expense> expenses =
                expenseRepository.findByUserId(
                        user.getId()
                );

        int rowNumber = 1;

        for (Expense expense : expenses) {

            Row row =
                    sheet.createRow(rowNumber++);

            row.createCell(0)
                    .setCellValue(expense.getTitle());

            row.createCell(1)
                    .setCellValue(expense.getCategory());

            row.createCell(2)
                    .setCellValue(expense.getAmount());

            row.createCell(3)
                    .setCellValue(
                            expense.getDate().toString()
                    );

            row.createCell(4)
                    .setCellValue(
                            expense.getDescription()
                    );
        }

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
    }
}