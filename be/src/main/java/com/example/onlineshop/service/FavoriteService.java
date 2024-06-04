package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface FavoriteService {
	public ResponseEntity<ResponseObject> createLikeBookByUser(Long bookId);

	public ResponseEntity<ResponseObject> editLikeBookByUser(Long bookId);

	public ResponseEntity<ResponseObject> getAllBookFavoriteByUserId(int indexPage);
}
