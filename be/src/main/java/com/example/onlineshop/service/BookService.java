package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.SearchFilterRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface BookService {
	public ResponseEntity<ResponseObject> searchFilter(SearchFilterRequest searchFilterRequest, int indexPage);

	public ResponseEntity<ResponseObject> searchFill(SearchTextRequest searchTextRequest);

	public ResponseEntity<ResponseObject> bookForHome();

	public ResponseEntity<ResponseObject> bookDetails(Long bookId);
}
