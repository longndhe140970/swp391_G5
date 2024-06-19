package com.example.onlineshop.service.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.service.FavoriteService;

@Service
public class FavoriteServiceImpl implements FavoriteService {

	@Override
	public ResponseEntity<ResponseObject> createLikeBookByUser(Long bookId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<ResponseObject> editLikeBookByUser(Long bookId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<ResponseObject> getAllBookFavoriteByUserId(int indexPage) {
		// TODO Auto-generated method stub
		return null;
	}

}