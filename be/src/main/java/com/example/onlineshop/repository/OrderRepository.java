package com.example.onlineshop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

	boolean existsByCodeOrder(String codeOrder);
	
	@Query(value = "SELECT * FROM orders WHERE code_order LIKE %:code%", countQuery = "SELECT COUNT(orderbook.id) FROM orderbook WHERE code LIKE %:code%", nativeQuery = true)
	Page<Order> searchByCode(@Param("code") String code, Pageable pageable);
	
	@Query(value = "SELECT * FROM orders ORDER BY order_status , created_at", countQuery = "SELECT (orders.order_id) FROM orders ORDER BY order_status , created_at", nativeQuery = true)
	Page<Order> findAllOrders(Pageable pageable);
}
