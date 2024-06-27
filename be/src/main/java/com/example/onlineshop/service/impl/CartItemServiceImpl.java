package com.example.onlineshop.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.dto.CartItemDto;
import com.example.onlineshop.entity.Book;
import com.example.onlineshop.entity.Cart;
import com.example.onlineshop.entity.CartItem;
import com.example.onlineshop.entity.User;
import com.example.onlineshop.exception.BadRequestException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.CartItemRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.CartItemRepository;
import com.example.onlineshop.repository.CartRepository;
import com.example.onlineshop.repository.UserRepository;
import com.example.onlineshop.service.CartItemService;

@Service
public class CartItemServiceImpl implements CartItemService {

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository customerRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CartItem createCartItem(CartItem cartItem) {
		cartItem.setQuantity(1);
		cartItem.setPrice(cartItem.getBook().getPrice() * cartItem.getQuantity());
		cartItem.setCreateAt(LocalDateTime.now());
		CartItem createdCartItem = cartItemRepository.save(cartItem);

		return createdCartItem;
	}

	@Override
	public ResponseEntity<ResponseObject> updateCartItem(Long userId, Long cartItemId,
//			CartItemRequest cartItemRequest
			int quantity
			) {
		CartItem item = findCartItemById(cartItemId);
		// throw not found
		User user = customerRepository.findById(userId).orElseThrow();

		// id user is correctly
		if (user.getId().equals(item.getCustomer().getId())) {

			if (item.getBook().getCopies_available() < quantity) {
				throw new BadRequestException(
						"Hiện tại trong kho chỉ còn " + item.getBook().getCopies_available() + " cuốn");
			}
			item.setQuantity(quantity);

			Double price = item.getBook().getPrice() * quantity;

			item.setPrice(price);

			CartItem updatedCartItem = cartItemRepository.save(item);
			CartItemDto cartItemDto = modelMapper.map(updatedCartItem, CartItemDto.class);
			cartItemDto.setImageUrl(updatedCartItem.getBook().getImageUrl());
			cartItemDto.setTitle(updatedCartItem.getBook().getTitle());

			// update cart
			Cart cart = cartRepository.findByUserId(user.getId());

			List<CartItem> cartItems = cart.getCartItems();

			double totalPrice = 0;
			int totalItem = 0;

			for (CartItem cartItem1 : cartItems) {
				totalPrice += cartItem1.getPrice();
				totalItem += cartItem1.getQuantity();
			}

			cart.setCartItems(cartItems);
			cart.setTotalPrice(totalPrice);
			cart.setTotalItem(totalItem);

			cartRepository.save(cart);

			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.body(new ResponseObject("Thông tin order item", new HashMap<>() {
						{
							put("cartItem", cartItemDto);
						}
					}));

		} else {
			throw new NotFoundException("Bạn không thể cập nhật vào giỏ hàng của người khác");
		}
	}

	@Override
	public CartItem isCartItemExist(Cart cart, Book book, Long userId) {
		CartItem cartItem = new CartItem();

		cartItem = cartItemRepository.isCartItemExist(cart.getCartId(), book.getBookId(), userId);

		return cartItem;
	}

	@Override
	public ResponseEntity<ResponseMessage> removeCartItem(Long userId, Long cartItemId) {
		CartItem cartItem = findCartItemById(cartItemId);
		// throw exception not found
		User user = customerRepository.findById(cartItem.getCustomer().getId()).orElseThrow();
		User reqUser = customerRepository.findById(userId).orElseThrow();

		// id user is correctly
		if (user.getId().equals(reqUser.getId())) {

			Cart cart = cartRepository.findByUserId(user.getId());

			List<CartItem> cartItems = cart.getCartItems();

			cartItems.remove(cartItem);

			cartItemRepository.deleteById(cartItemId);

			double totalPrice = 0;
			int totalItem = 0;

			for (CartItem cartItem1 : cartItems) {
				totalPrice += cartItem1.getPrice();
				totalItem += cartItem1.getQuantity();
			}

			cart.setCustomer(reqUser);
			cart.setCartItems(cartItems);
			cart.setTotalPrice(totalPrice);
			cart.setTotalItem(totalItem);

			cartRepository.save(cart);

			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseMessage(200, "Xoá sản phẩm khỏi giỏ hàng thành công"));
		} else {
			throw new NotFoundException("Bạn không thể xóa sản phẩm");
		}
	}

	@Override
	public CartItem findCartItemById(Long cartItemId) {
		Optional<CartItem> item = cartItemRepository.findById(cartItemId);

		if (item.isPresent()) {
			return item.get();
		}
		throw new NotFoundException("Giỏ hàng không tìm thấy có id : " + cartItemId);
	}

}
