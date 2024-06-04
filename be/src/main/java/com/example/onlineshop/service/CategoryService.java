package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.AuthorRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface CategoryService {

	public ResponseEntity<ResponseMessage> createAuthor(AuthorRequest creatRequest);

	public ResponseEntity<ResponseMessage> editAuthor(AuthorRequest creatRequest, Long authorId);

	public ResponseEntity<ResponseObject> searchAuthor(SearchTextRequest searchRequest, int indexPage);

	public ResponseEntity<ResponseObject> listAuthor(int indexPage);
}
