package com.example.onlineshop.controller;

import com.example.onlineshop.payload.request.EditProfileRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	public ResponseEntity<?> signIn(@RequestBody SignInRequest signInRequest){
		return authService.login(signInRequest);
	}
	
	@PostMapping("signup")
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest){
		return authService.register(signUpRequest);
	}

	@PutMapping("edit")
	public ResponseEntity<?> editProfile(@RequestBody EditProfileRequest editProfileRequest){
		return authService.editProfile(editProfileRequest);
	}
}
