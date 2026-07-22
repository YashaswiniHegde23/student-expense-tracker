package com.yashaswini.studentexpensetracker.repository;

import com.yashaswini.studentexpensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByCategory(String category);

    List<Expense> findByTitleContainingIgnoreCase(String title);

    List<Expense> findByDate(LocalDate date);

    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Expense> findByAmountGreaterThan(Double amount);

    List<Expense> findByAmountLessThan(Double amount);

    List<Expense> findByAmountBetween(Double min, Double max);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Double getTotalExpensesByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(e) FROM Expense e WHERE e.user.id = :userId")
    Long getExpenseCountByUserId(@Param("userId") Long userId);

    @Query("SELECT e.category, SUM(e.amount) FROM Expense e WHERE e.user.id = :userId GROUP BY e.category")
    List<Object[]> getCategoryWiseSummary(@Param("userId") Long userId);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id = :userId AND MONTH(e.date) = :month AND YEAR(e.date) = :year")
    Double getMonthlyExpenseSummary(@Param("userId") Long userId,
                                    @Param("month") int month,
                                    @Param("year") int year);

    @Query("SELECT MAX(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Double getHighestExpense(@Param("userId") Long userId);

    @Query("SELECT MIN(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Double getLowestExpense(@Param("userId") Long userId);

    @Query("SELECT AVG(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Double getAverageExpense(@Param("userId") Long userId);

    Page<Expense> findAll(Pageable pageable);
}