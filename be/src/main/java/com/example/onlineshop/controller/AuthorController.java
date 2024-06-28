package com.example.onlineshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onlineshop.payload.request.AuthorRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.service.AuthorService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/authors")
public class AuthorController {

	@Autowired
	private AuthorService authorService;

	@PostMapping("/add")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> createNewAuthor(@RequestBody AuthorRequest creatRequest) {
		return authorService.createAuthor(creatRequest);
	}

	@PutMapping("/edit")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> editAuthor(@RequestBody AuthorRequest pubRequest, @RequestParam("id") Long publisherId) {
		return authorService.editAuthor(pubRequest, publisherId);
	}

	@GetMapping("")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> getSearch(@RequestParam("index-page") int indexPage) {
		return authorService.listAuthor(indexPage);
	}

	@PostMapping("/search")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> getSearchByName(@RequestBody SearchTextRequest nameSearch,
			@RequestParam("index-page") int indexPage) {
		return authorService.searchAuthor(nameSearch, indexPage);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> getSearchByName(@PathVariable("id") Long idAuthor) {
		return authorService.detailAuthor(idAuthor);
	}
}