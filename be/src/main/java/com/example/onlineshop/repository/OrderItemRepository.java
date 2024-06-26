package com.example.onlineshop.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

	@Query(value = "SELECT order_item.* FROM order_item\r\n"
			+ "LEFT JOIN orders ON order_item.order_id = orders.order_id\r\n"
			+ "WHERE order_item.customer_id= :customerId AND orders.order_status is true ORDER BY order_item.order_item_id DESC", countQuery = "SELECT COUNT(order_item.order_id) FROM order_item LEFT JOIN orderbook ON order_item.order_id = orders.order_id WHERE order_item.customer_id= :customerId AND orders.order_status is true",
			nativeQuery = true)
	Page<OrderItem> getAllOrderItemByUserId(@Param("customerId") Long customerId, Pageable pageable);
	
	@Query(value = "select order_item.* from order_item where order_id = :orderId", nativeQuery = true)
	List<OrderItem> findAllOrderItemsByOrderId(@Param("orderId") Long orderId);

	@Query(value = "SELECT order_item.* FROM order_item\r\n"
			+ "WHERE order_item.customer_id= :customerId AND order_item.book_id = :bookId", nativeQuery = true)
	OrderItem findByBookIdAndCustomerId(@Param("bookId") Long bookId, @Param("customerId") Long customerId);
}
