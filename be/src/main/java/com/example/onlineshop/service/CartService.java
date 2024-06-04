package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.dto.CartDto;
import com.example.onlineshop.entity.Cart;
import com.example.onlineshop.entity.User;
import com.example.onlineshop.payload.request.AddItemRequest;
import com.example.onlineshop.payload.response.ResponseMessage;

@Service
public interface CartService {
	public Cart createCart(User user);

	public ResponseEntity<ResponseMessage> addCartItem(Long userId, AddItemRequest req);

	public CartDto findUserCart(Long userId);
}
