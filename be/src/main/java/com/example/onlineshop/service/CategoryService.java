package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.AuthorRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface CategoryService {

	public ResponseEntity<ResponseMessage> createCategory(AuthorRequest creatRequest);

	public ResponseEntity<ResponseMessage> editCategory(AuthorRequest creatRequest, Long categoryId);

	public ResponseEntity<ResponseObject> searchCategory(SearchTextRequest searchRequest, int indexPage);

	public ResponseEntity<ResponseObject> listCategory(int indexPage);
	
	public ResponseEntity<ResponseObject> detailCategory(Long categoryId);	
}
