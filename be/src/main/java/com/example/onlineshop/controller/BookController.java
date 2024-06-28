package com.example.onlineshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onlineshop.payload.request.RatingRequest;
import com.example.onlineshop.payload.request.SearchFilterRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.service.BookService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/book")
public class BookController {

	@Autowired
	private BookService bookService;

	@PostMapping("filter-search")
	public ResponseEntity<?> getSearchFilter(@RequestBody SearchFilterRequest searchFilterRequest,
			@RequestParam("index-page") int indexPage) {
		return bookService.searchFilter(searchFilterRequest, indexPage);
	}

	@PostMapping("search")
	public ResponseEntity<?> getSearchFill(@RequestBody SearchTextRequest searchTextRequest,
			@RequestParam("index-page") int indexPage) {
		return bookService.searchFill(searchTextRequest, indexPage);
	}

	@GetMapping("")
	public ResponseEntity<?> home() {
		return bookService.bookForHome();
	}

	@GetMapping("book-detail/{bookId}")
	public ResponseEntity<?> BookDetails(@PathVariable Long bookId) {
		return bookService.bookDetails(bookId);
	}

	@GetMapping("/list")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> getAllBooks(@RequestParam("index-page") int indexPage) {
		return bookService.getAllBooks(indexPage);
	}

//	@PostMapping("add")
//	public ResponseEntity<?> insertBook(@RequestBody BookRequest bookRequest) {
//		return bookService.addBook(bookRequest);
//	}
//
//	@PutMapping("edit")
//	public ResponseEntity<?> editBook(@RequestBody BookRequest bookRequest) {
//		return bookService.editBook(bookRequest);
//	}

	@PostMapping("/rate")
	@PreAuthorize("hasRole('ROLE_CUSTOMER')")
	public ResponseEntity<?> rateBook(@RequestBody RatingRequest ratingRequest) {
		return bookService.rateBook(ratingRequest);
	}
}
