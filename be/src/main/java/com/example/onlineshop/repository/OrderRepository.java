package com.example.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

	boolean existsByCodeOrder(String codeOrder);
}
