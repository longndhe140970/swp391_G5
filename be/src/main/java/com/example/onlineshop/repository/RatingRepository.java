package com.example.onlineshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.onlineshop.entity.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long> {
	@Query(value = "SELECT * FROM rating WHERE rating.book_id = :bookId AND rating.customer_id = :customerId", nativeQuery = true)
	Rating findByBookIdAndCustomerId(@Param("bookId") Long bookId, @Param("customerId") Long customerId);

	@Query(value = "SELECT * FROM rating where book_id = :bookId", nativeQuery = true)
	List<Rating> getRatingByBookId(@Param("bookId") Long bookId);

}
