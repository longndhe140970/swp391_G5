package com.example.onlineshop.controller;

import com.example.onlineshop.dto.BookCardDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.onlineshop.payload.request.SearchFilterRequest;
import com.example.onlineshop.service.BookService;

import java.util.List;

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

	@GetMapping("")
	public ResponseEntity<?>  home(){
		return bookService.bookForHome();
	}
	
	@GetMapping("book-detail/{bookId}")
	public ResponseEntity<?> BookDetails(@PathVariable Long bookId) {
		return bookService.bookDetails(bookId);
	} 

}
