package com.example.onlineshop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
	boolean existsByName(String name);

	@Query(value = "SELECT * FROM onlineshop.category", nativeQuery = true)
	Page<Category> getListCategory(Pageable pageable);
	
	@Query(value = "SELECT * FROM category WHERE :categoryName IS NULL OR category.name LIKE %:categoryName%", countQuery = "SELECT COUNT(category_id) FROM category WHERE :categoryName IS NULL OR category.name LIKE %:categoryName%", nativeQuery = true)
	Page<Category> searchCategory(@Param("categoryName") String categoryName, Pageable pageable);
}
