package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.EditProfileRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.request.SignInRequest;
import com.example.onlineshop.payload.request.SignUpRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface AuthService {
	public ResponseEntity<ResponseObject> login(SignInRequest signInRequest);

	public ResponseEntity<ResponseObject> register(SignUpRequest signUpRequest);

	public ResponseEntity<ResponseObject> editProfile(EditProfileRequest editProfileRequest);

	public ResponseEntity<ResponseObject> profile();

	public ResponseEntity<ResponseObject> listAccount(int indexPage);

	public ResponseEntity<ResponseObject> searchAccountByUsername(SearchTextRequest textSearch, int indexPage);
	
	public ResponseEntity<ResponseMessage> changeStatus(Long id);
}
