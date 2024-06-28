package com.example.onlineshop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
	boolean existsByName(String name);

	@Query(value = "SELECT * FROM onlineshop.author", nativeQuery = true)
	Page<Author> listAuthor(@Param("authorId") Long authorId, Pageable pageable);
}
