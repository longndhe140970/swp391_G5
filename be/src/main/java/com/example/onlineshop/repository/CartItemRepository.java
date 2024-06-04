package com.example.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	@Query(value = "SELECT * FROM cart_item WHERE cart_id=:cart AND book_id=:book AND customer_id =:customerId", nativeQuery = true)
	public CartItem isCartItemExist(@Param("cart") Long cartId, @Param("book") Long bookId,
			@Param("customerId") Long customerId);
}
