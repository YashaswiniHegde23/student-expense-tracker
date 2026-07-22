package com.yashaswini.studentexpensetracker.service;

import com.yashaswini.studentexpensetracker.dto.ExpenseRequest;
import com.yashaswini.studentexpensetracker.model.Expense;
import com.yashaswini.studentexpensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.yashaswini.studentexpensetracker.model.User;
import com.yashaswini.studentexpensetracker.repository.UserRepository;
import com.yashaswini.studentexpensetracker.exception.ResourceNotFoundException;
import com.yashaswini.studentexpensetracker.dto.DashboardResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import java.util.List;
import java.time.LocalDate;
import java.util.Map;
import java.util.HashMap;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    public String addExpense(ExpenseRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

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
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense Not Found"));
    }

    public String deleteExpense(Long id) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense Not Found"));

        expenseRepository.delete(expense);

        return "Expense Deleted Successfully";
    }

    public String updateExpense(Long id, ExpenseRequest request) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense Not Found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

        expense.setTitle(request.getTitle());
        expense.setCategory(request.getCategory());
        expense.setAmount(request.getAmount());
        expense.setDate(request.getDate());
        expense.setDescription(request.getDescription());
        expense.setUser(user);

        expenseRepository.save(expense);

        return "Expense Updated Successfully";
    }

    public List<Expense> getExpensesByCategory(String category) {

        return expenseRepository.findByCategory(category);
    }

    public List<Expense> searchExpensesByTitle(String title) {

        return expenseRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Expense> getExpensesByDate(LocalDate date) {

        return expenseRepository.findByDate(date);
    }

    public List<Expense> getExpensesBetweenDates(LocalDate startDate, LocalDate endDate) {

        return expenseRepository.findByDateBetween(startDate, endDate);
    }

    public List<Expense> getExpensesGreaterThan(Double amount) {

        return expenseRepository.findByAmountGreaterThan(amount);
    }

    public List<Expense> getExpensesLessThan(Double amount) {

        return expenseRepository.findByAmountLessThan(amount);
    }

    public List<Expense> getExpensesBetweenAmounts(Double min, Double max) {

        return expenseRepository.findByAmountBetween(min, max);
    }

    public Double getTotalExpenses(Long userId) {

        Double total = expenseRepository.getTotalExpensesByUserId(userId);

        return total != null ? total : 0.0;
    }

    public Long getExpenseCount(Long userId) {

        return expenseRepository.getExpenseCountByUserId(userId);
    }

    public Map<String, Double> getCategoryWiseSummary(Long userId) {

        List<Object[]> results = expenseRepository.getCategoryWiseSummary(userId);

        Map<String, Double> summary = new HashMap<>();

        for (Object[] row : results) {
            summary.put((String) row[0], (Double) row[1]);
        }

        return summary;
    }

    public Double getMonthlyExpenseSummary(Long userId, int month, int year) {

        Double total = expenseRepository.getMonthlyExpenseSummary(userId, month, year);

        return total != null ? total : 0.0;
    }

    public DashboardResponse getDashboardStatistics(Long userId) {

        Double totalExpense = expenseRepository.getTotalExpensesByUserId(userId);
        Long expenseCount = expenseRepository.getExpenseCountByUserId(userId);
        Double highestExpense = expenseRepository.getHighestExpense(userId);
        Double lowestExpense = expenseRepository.getLowestExpense(userId);
        Double averageExpense = expenseRepository.getAverageExpense(userId);

        return new DashboardResponse(
                totalExpense != null ? totalExpense : 0.0,
                expenseCount != null ? expenseCount : 0L,
                highestExpense != null ? highestExpense : 0.0,
                lowestExpense != null ? lowestExpense : 0.0,
                averageExpense != null ? averageExpense : 0.0
        );
    }

    public Page<Expense> getExpensesWithPagination(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return expenseRepository.findAll(pageable);
    }

    public List<Expense> getExpensesSorted(String sortBy, String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        return expenseRepository.findAll(sort);
    }

    public byte[] exportExpensesToExcel() throws IOException {

        XSSFWorkbook workbook = new XSSFWorkbook();

        Sheet sheet = workbook.createSheet("Expenses");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("Title");
        header.createCell(1).setCellValue("Category");
        header.createCell(2).setCellValue("Amount");
        header.createCell(3).setCellValue("Date");
        header.createCell(4).setCellValue("Description");

        List<Expense> expenses = expenseRepository.findAll();

        int rowNumber = 1;

        for (Expense expense : expenses) {

            Row row = sheet.createRow(rowNumber++);

            row.createCell(0).setCellValue(expense.getTitle());
            row.createCell(1).setCellValue(expense.getCategory());
            row.createCell(2).setCellValue(expense.getAmount());
            row.createCell(3).setCellValue(expense.getDate().toString());
            row.createCell(4).setCellValue(expense.getDescription());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        workbook.write(outputStream);
        workbook.close();

        return outputStream.toByteArray();
    }
}