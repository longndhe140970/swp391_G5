package com.example.onlineshop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Publisher;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
	boolean existsByName(String name);

	@Query(value = "SELECT * FROM onlineshop.publisher", nativeQuery = true)
	Page<Publisher> getListPublisher(Pageable pageable);

	@Query(value = "SELECT * FROM publisher WHERE :publisherName IS NULL OR publisher.name LIKE %:publisherName%", countQuery = "SELECT COUNT(publisher_id) FROM publisher WHERE :publisherName IS NULL OR publisher.name LIKE %:publisherName%", nativeQuery = true)
	Page<Publisher> searchPublisher(@Param("publisherName") String publisherName, Pageable pageable);
}
