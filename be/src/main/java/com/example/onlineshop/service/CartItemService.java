package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.entity.Book;
import com.example.onlineshop.entity.Cart;
import com.example.onlineshop.entity.CartItem;
import com.example.onlineshop.payload.request.CartItemRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface CartItemService {
	public CartItem createCartItem(CartItem cartItem);

	public ResponseEntity<ResponseObject> updateCartItem(Long userId, Long cartItemId, 
//			CartItemRequest cartItemRequest
			int quantity
			);

	public CartItem isCartItemExist(Cart cart, Book book, Long userId);

	public ResponseEntity<ResponseMessage> removeCartItem(Long userId, Long cartItemId);

	public CartItem findCartItemById(Long cartItemId);
}
