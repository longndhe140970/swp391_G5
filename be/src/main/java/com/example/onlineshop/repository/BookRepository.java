package com.example.onlineshop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Book;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

	@Query(value = "SELECT book.* FROM book\r\n"
			+ "LEFT JOIN book_category bc ON book.book_id = bc.book_id\r\n"
			+ "LEFT JOIN category ON bc.category_id = category.category_id\r\n"
			+ "LEFT JOIN book_author ba ON book.book_id = ba.book_id\r\n"
			+ "LEFT JOIN author ON ba.author_id = author.author_id\r\n"
			+ "LEFT JOIN publisher ON book.publisher_id = publisher.publisher_id\r\n"
			+ "LEFT JOIN language ON book.language_id = language.language_id\r\n"
			+ "WHERE book.copies_available >= 0\r\n"
			+ "AND (:bookTitle IS NULL OR book.title LIKE %:bookTitle%)\r\n"
			+ "AND (:authorName IS NULL OR author.name LIKE %:authorName%)\r\n"
			+ "AND (:categoryName IS NULL OR category.name LIKE %:categoryName%)\r\n"
			+ "AND (:publisherName IS NULL OR publisher.name LIKE %:publisherName%)\r\n"
			+ "AND (:languageName IS NULL OR language.name LIKE %:languageName%)\r\n"
			+ "GROUP BY book.book_id", countQuery = "SELECT COUNT(book.book_id) FROM book\r\n"
					+ "LEFT JOIN book_category bc ON book.book_id = bc.book_id\r\n"
					+ "LEFT JOIN category ON bc.category_id = category.category_id\r\n"
					+ "LEFT JOIN book_author ba ON book.book_id = ba.book_id\r\n"
					+ "LEFT JOIN author ON ba.author_id = author.author_id\r\n"
					+ "LEFT JOIN publisher ON book.publisher_id = publisher.publisher_id\r\n"
					+ "LEFT JOIN language ON book.language_id = language.language_id\r\n"
					+ "WHERE book.copies_available >= 0\r\n"
					+ "AND (:bookTitle IS NULL OR book.title LIKE %:bookTitle%)\r\n"
					+ "AND (:authorName IS NULL OR author.name LIKE %:authorName%)\r\n"
					+ "AND (:categoryName IS NULL OR category.name LIKE %:categoryName%)\r\n"
					+ "AND (:publisherName IS NULL OR publisher.name LIKE %:publisherName%)\r\n"
					+ "AND (:languageName IS NULL OR language.name LIKE %:languageName%)\r\n"
					+ "GROUP BY book.book_id", nativeQuery = true)
	Page<Book> listSearchFilter(@Param("authorName") String authorName, @Param("categoryName") String categoryName,
			@Param("publisherName") String publisherName, @Param("bookTitle") String bookTitle,
			@Param("languageName") String languageName, Pageable pageable);

	@Query(value = "SELECT * FROM book order  by book_id desc limit 10", nativeQuery = true)
	public List<Book> getBookForHome();


}


