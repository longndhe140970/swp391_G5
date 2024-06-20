package com.example.onlineshop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Favorite;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Page<Favorite> findByCustomerIdAndIsFavoriteTrue(Long customerId, Pageable pageable);

    Favorite findByCustomerIdAndBook_bookId(Long customerId, Long bookId);
}
