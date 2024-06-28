package com.example.onlineshop.service;

import com.example.onlineshop.payload.request.BookRequest;
import com.example.onlineshop.payload.request.RatingRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.SearchFilterRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface BookService {
	public ResponseEntity<ResponseObject> searchFilter(SearchFilterRequest searchFilterRequest, int indexPage);

	public ResponseEntity<ResponseObject> searchFill(SearchTextRequest searchTextRequest, int indexPage);

	public ResponseEntity<ResponseObject> bookForHome();

	public ResponseEntity<ResponseObject> bookDetails(Long bookId);

	public ResponseEntity<ResponseObject> getAllBooks(int indexPage);

	//public ResponseEntity<ResponseObject> addBook(BookRequest bookRequest);

	//public ResponseEntity<ResponseObject> searchByName(String name);

	public ResponseEntity<ResponseMessage> rateBook(RatingRequest ratingRequest);
}
