package com.example.onlineshop.service;

import com.example.onlineshop.payload.request.FavoriteRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface FavoriteService {
//	public ResponseEntity<ResponseMessage> createLikeBookByUser(Long bookId);

	public ResponseEntity<ResponseMessage> editLikeBookByUser(FavoriteRequest request);

	public ResponseEntity<ResponseObject> getAllBookFavoriteByUserId(int indexPage);
}
