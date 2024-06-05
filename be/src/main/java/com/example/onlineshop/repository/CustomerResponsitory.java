package com.example.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerResponsitory extends JpaRepository<Customer,Integer> {
    Customer findById(int id);
}
