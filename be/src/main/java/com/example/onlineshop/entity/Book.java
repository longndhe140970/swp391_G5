package com.example.onlineshop.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

@Entity
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_id")
	Long bookId;

	@Column(name = "title")
	String title;

	@Column(name = "description", columnDefinition = "LONGTEXT")
	String description;

	@Column(name = "price")
	double price;

	@Column(name = "image_url")
	String imageUrl;

	LocalDateTime createAt;

	int copies;

	int copies_available;

	int page;

	@ManyToMany
	@JoinTable(name = "book_author", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
	List<Author> authors;

	@ManyToMany
	@JoinTable(name = "book_category", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	List<Category> categories;

	@ManyToOne
	@JoinColumn(name = "publisher_id", nullable = false)
	Publisher publisher;

	@ManyToOne
	@JoinColumn(name = "language_id", nullable = false)
	Language language;

}
