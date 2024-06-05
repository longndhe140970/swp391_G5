package com.example.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.onlineshop.entity.Cart;

@Repository
@Transactional
public interface CartRepository extends JpaRepository<Cart, Long> {

	@Query(value = "SELECT * FROM carts WHERE customer_id=:customerId AND is_ordered is false", nativeQuery = true)
	public Cart findByUserId(@Param("customerId") Long customerId);
}
