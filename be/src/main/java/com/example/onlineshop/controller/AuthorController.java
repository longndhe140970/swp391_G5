package com.example.onlineshop.controller;

import com.example.onlineshop.payload.request.AuthorRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import com.example.onlineshop.service.AuthorService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/author")
public class AuthorController {
	
	@Autowired
	private AuthorService authorService;
	
	@PostMapping("/add")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> createNewAuthor(@RequestBody AuthorRequest creatRequest) {
		return authorService.createAuthor(creatRequest);
	}
}