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
	Page<Author> getListAuthor(Pageable pageable);
	
	@Query(value = "SELECT * FROM author WHERE :authorName IS NULL OR author.name LIKE %:authorName%", countQuery = "SELECT COUNT(author_id) FROM author WHERE :authorName IS NULL OR author.name LIKE %:authorName%", nativeQuery = true)
	Page<Author> searchAuthor(@Param("authorName") String authorName, Pageable pageable);

}
