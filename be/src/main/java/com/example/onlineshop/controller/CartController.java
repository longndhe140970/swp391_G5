package com.example.onlineshop.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onlineshop.dto.CartDto;
import com.example.onlineshop.payload.request.AddItemRequest;
import com.example.onlineshop.payload.request.CartItemRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.service.CartItemService;
import com.example.onlineshop.service.CartService;
import com.example.onlineshop.utils.SecurityUtils;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/carts")
public class CartController {
	@Autowired
	private CartService cartService;
	@Autowired
	private CartItemService cartItemService;

	@GetMapping("")
	@PreAuthorize("hasRole('ROLE_CUSTOMER')")
	public ResponseEntity<?> findUserCartHandler() {

		Long userId = SecurityUtils.getPrincipal().getId();

		CartDto cart = cartService.findUserCart(userId);

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Cart data", new HashMap<>() {
			{
				put("cart", cart);
			}
		}));
	}

	@PutMapping("/add")
	@PreAuthorize("hasRole('ROLE_CUSTOMER')")
	public ResponseEntity<ResponseMessage> addItemToCart(@RequestBody AddItemRequest req) {

		Long userId = SecurityUtils.getPrincipal().getId();

		return cartService.addCartItem(userId, req);

	}

	@DeleteMapping("/{cartItemId}")
	@PreAuthorize("hasRole('ROLE_CUSTOMER')")
	public ResponseEntity<ResponseMessage> deleteCartItemHandler(@PathVariable Long cartItemId) {

		Long userId = SecurityUtils.getPrincipal().getId();
		return cartItemService.removeCartItem(userId, cartItemId);
	}

	@PutMapping("/{cartItemId}")
	@PreAuthorize("hasRole('ROLE_CUSTOMER')")
	public ResponseEntity<?> updateCartItemHandler(@PathVariable Long cartItemId,
//			@RequestBody CartItemRequest cartItemRequest, 
			@RequestParam("quantity") int quantity) {

		Long userId = SecurityUtils.getPrincipal().getId();

		return cartItemService.updateCartItem(userId, cartItemId, quantity);
	}
}
