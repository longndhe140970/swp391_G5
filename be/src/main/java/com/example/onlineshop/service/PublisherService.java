package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.AuthorRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface PublisherService {
	public ResponseEntity<ResponseMessage> createPublisher(AuthorRequest creatRequest);

	public ResponseEntity<ResponseMessage> editPublisher(AuthorRequest creatRequest, Long publisherId);

	public ResponseEntity<ResponseObject> searchPublisher(SearchTextRequest searchRequest, int indexPage);

	public ResponseEntity<ResponseObject> listPublisher(int indexPage);
	
	public ResponseEntity<ResponseObject> detailPublisher(Long publisherId);	
}
