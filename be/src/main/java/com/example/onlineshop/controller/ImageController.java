package com.example.onlineshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.onlineshop.service.ImageService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/images")
public class ImageController {
	
	@Autowired
	private ImageService imageService;

	@PostMapping(value = "/upload")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_CUSTOMER')")
	public ResponseEntity<?> insertPostImage(@RequestParam("file") MultipartFile multipartFiles) {
		return imageService.insertBookImage(multipartFiles);
	}
}
