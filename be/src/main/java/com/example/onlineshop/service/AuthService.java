package com.example.onlineshop.service;

import com.example.onlineshop.payload.request.EditProfileRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.SignInRequest;
import com.example.onlineshop.payload.request.SignUpRequest;
import com.example.onlineshop.payload.response.ResponseObject;

import jakarta.servlet.http.HttpServletRequest;


@Service
public interface AuthService {
	public ResponseEntity<ResponseObject> login(SignInRequest signInRequest);
	
	public ResponseEntity<ResponseObject> register(SignUpRequest signUpRequest);

	public ResponseEntity<ResponseObject> editProfile(EditProfileRequest editProfileRequest);
	
	public ResponseEntity<ResponseObject> profile();
}
