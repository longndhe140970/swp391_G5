package com.example.onlineshop.repository;

import com.example.onlineshop.entity.OrderItem;
import com.example.onlineshop.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    @Query(value = "SELECT * FROM rating WHERE rating.book_id = :bookId AND rating.customer_id = :customerId",
            nativeQuery = true
    )
    Rating findByBookIdAndCustomerId(@Param("bookId")Long bookId, @Param("customerId")Long customerId);
}
