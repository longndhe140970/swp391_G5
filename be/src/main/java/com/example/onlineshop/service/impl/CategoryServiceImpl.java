package com.example.onlineshop.service.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.AuthorRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Override
	public ResponseEntity<ResponseMessage> createAuthor(AuthorRequest creatRequest) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<ResponseMessage> editAuthor(AuthorRequest creatRequest, Long authorId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<ResponseObject> searchAuthor(SearchTextRequest searchRequest, int indexPage) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<ResponseObject> listAuthor(int indexPage) {
		// TODO Auto-generated method stub
		return null;
	}

}
