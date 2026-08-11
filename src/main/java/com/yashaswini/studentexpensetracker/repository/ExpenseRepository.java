package com.yashaswini.studentexpensetracker.repository;

import com.yashaswini.studentexpensetracker.model.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserId(Long userId);

    List<Expense> findByUserId(Long userId, Sort sort);

    Page<Expense> findByUserId(Long userId, Pageable pageable);

    List<Expense> findByCategoryAndUserId(
            String category,
            Long userId
    );

    List<Expense> findByTitleContainingIgnoreCaseAndUserId(
            String title,
            Long userId
    );

    List<Expense> findByDateAndUserId(
            LocalDate date,
            Long userId
    );

    List<Expense> findByDateBetweenAndUserId(
            LocalDate startDate,
            LocalDate endDate,
            Long userId
    );

    List<Expense> findByAmountGreaterThanAndUserId(
            Double amount,
            Long userId
    );

    List<Expense> findByAmountLessThanAndUserId(
            Double amount,
            Long userId
    );

    List<Expense> findByAmountBetweenAndUserId(
            Double min,
            Double max,
            Long userId
    );

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Double getTotalExpensesByUserId(
            @Param("userId") Long userId
    );

    @Query("SELECT COUNT(e) FROM Expense e WHERE e.user.id = :userId")
    Long getExpenseCountByUserId(
            @Param("userId") Long userId
    );

    @Query("""
            SELECT e.category, SUM(e.amount)
            FROM Expense e
            WHERE e.user.id = :userId
            GROUP BY e.category
            """)
    List<Object[]> getCategoryWiseSummary(
            @Param("userId") Long userId
    );

    @Query("""
            SELECT SUM(e.amount)
            FROM Expense e
            WHERE e.user.id = :userId
            AND MONTH(e.date) = :month
            AND YEAR(e.date) = :year
            """)
    Double getMonthlyExpenseSummary(
            @Param("userId") Long userId,
            @Param("month") int month,
            @Param("year") int year
    );

    @Query("SELECT MAX(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Double getHighestExpense(
            @Param("userId") Long userId
    );

    @Query("SELECT MIN(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Double getLowestExpense(
            @Param("userId") Long userId
    );

    @Query("SELECT AVG(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Double getAverageExpense(
            @Param("userId") Long userId
    );
}