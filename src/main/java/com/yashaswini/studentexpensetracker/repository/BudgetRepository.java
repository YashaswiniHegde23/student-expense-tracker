package com.yashaswini.studentexpensetracker.repository;

import com.yashaswini.studentexpensetracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    Budget findByUserIdAndMonthAndYear(Long userId, Integer month, Integer year);
}