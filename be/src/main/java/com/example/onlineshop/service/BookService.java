package com.example.onlineshop.service;

import com.example.onlineshop.dto.BookCardDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.SearchFilterRequest;
import com.example.onlineshop.payload.response.ResponseObject;

import java.util.List;

@Service
public interface BookService {
	public ResponseEntity<ResponseObject> searchFilter(SearchFilterRequest searchFilterRequest, int indexPage);

	public ResponseEntity<ResponseObject>  bookForHome();
	
	public ResponseEntity<ResponseObject> bookDetails(Long bookId);
}
