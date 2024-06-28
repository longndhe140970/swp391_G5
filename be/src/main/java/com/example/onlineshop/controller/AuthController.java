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

import com.example.onlineshop.payload.request.EditProfileRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.request.SignInRequest;
import com.example.onlineshop.payload.request.SignUpRequest;
import com.example.onlineshop.service.AuthService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("signin")
	public ResponseEntity<?> signIn(@RequestBody SignInRequest signInRequest) {
		return authService.login(signInRequest);
	}

	@PostMapping("signup")
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
		return authService.register(signUpRequest);
	}

	@PutMapping("edit")
	public ResponseEntity<?> editProfile(@RequestBody EditProfileRequest editProfileRequest) {
		return authService.editProfile(editProfileRequest);
	}

	@GetMapping("profile")
	@PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> profile() {
		return authService.profile();
	}

	@PostMapping("/search")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> searchAccountByUsername(@RequestBody SearchTextRequest nameSearch,
			@RequestParam("index-page") int indexPage) {
		return authService.searchAccountByUsername(nameSearch, indexPage);
	}

	@GetMapping("/list")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getListAccount(@RequestParam("index-page") int indexPage) {
		return authService.listAccount(indexPage);
	}
	
	@PutMapping("/change-status/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateStatus(@PathVariable Long id) {
		return authService.changeStatus(id);
	}

}
