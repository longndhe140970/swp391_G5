package com.example.onlineshop.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.dto.CartDto;
import com.example.onlineshop.dto.CartItemDto;
import com.example.onlineshop.entity.Book;
import com.example.onlineshop.entity.Cart;
import com.example.onlineshop.entity.CartItem;
import com.example.onlineshop.entity.User;
import com.example.onlineshop.exception.AuthException;
import com.example.onlineshop.exception.BadRequestException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.AddItemRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.repository.BookRepository;
import com.example.onlineshop.repository.CartItemRepository;
import com.example.onlineshop.repository.CartRepository;
import com.example.onlineshop.repository.UserRepository;
import com.example.onlineshop.service.CartItemService;
import com.example.onlineshop.service.CartService;
import com.example.onlineshop.utils.SecurityUtils;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private CartItemService cartItemService;
	@Autowired
	private CartItemRepository cartItemRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Cart createCart(User user) {
		Cart cart = new Cart();
		cart.setCustomer(user);
		cart.setOrdered(false);
		Cart createdCart = cartRepository.save(cart);
		return createdCart;
	}

	@Override
	public ResponseEntity<ResponseMessage> addCartItem(Long userId, AddItemRequest req) {
		if (SecurityUtils.checkAuth().equals("anonymousUser")) {
			throw new AuthException("Bạn hãy đăng kí thành viên để đặt đơn");
		}
		User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("ko tim thay user"));
		Cart cart = cartRepository.findByUserId(userId);
		Book book = bookRepository.findById(req.getBookId())
				.orElseThrow(() -> new NotFoundException("ko tim thay sach"));
		CartItem createdCartItem = null;

		// create new cart
		if (Objects.isNull(cart)) {
			System.err.println("cart null");
			Cart carts = new Cart();
			carts.setCustomer(user);

			CartItem cartItem = new CartItem();
			cartItem.setBook(book);
			cartItem.setCarts(carts);
			if (book.getCopies_available() < req.getQuantity()) {
				throw new BadRequestException("Hiện tại trong kho chỉ còn " + book.getCopies_available() + " cuốn");
			}
			cartItem.setQuantity(req.getQuantity());
			cartItem.setCustomer(user);

			cartItem.setPrice(req.getQuantity() * book.getPrice());

			List<CartItem> listCaItem = new ArrayList<>();
			listCaItem.add(createdCartItem);
			carts.setCartItems(listCaItem);
			carts.setTotalPrice(cartItem.getPrice());
			carts.setTotalItem(1);

			cartRepository.save(carts);
			createdCartItem = cartItemService.createCartItem(cartItem);
		} else {// have cart created in previous before
			// check cart item have created in previous before
			CartItem isPresent = cartItemService.isCartItemExist(cart, book, user.getId());

			// no created
			if (Objects.isNull(isPresent)) {
				CartItem cartItem = new CartItem();
				cartItem.setBook(book);
				cartItem.setCarts(cart);
				if (book.getCopies_available() < req.getQuantity()) {
					throw new BadRequestException(
							"Hiện tại trong thư viện chỉ còn " + book.getCopies_available() + " cuốn");
				}
				cartItem.setQuantity(req.getQuantity());
				cartItem.setCustomer(user);

				cartItem.setPrice(req.getQuantity() * book.getPrice());

				createdCartItem = cartItemService.createCartItem(cartItem);

				int totalPrice = 0;
				int totalItem = 0;
				for (CartItem cartsItem : cart.getCartItems()) {
					totalPrice += cartsItem.getPrice();
					totalItem += cartsItem.getQuantity();
				}

				cart.setTotalPrice(totalPrice);
				cart.setTotalItem(totalItem);

				cartRepository.save(cart);
			} else {
				// update cart item in cart
				int newQuantity = isPresent.getQuantity() + 1;
				isPresent.setQuantity(newQuantity);
				if (book.getCopies_available() < isPresent.getQuantity()) {
					throw new BadRequestException(
							"Hiện tại trong thư viện chỉ còn " + book.getCopies_available() + " cuốn");
				}
				isPresent.setPrice(newQuantity * book.getPrice());
				createdCartItem = isPresent;
				cartItemRepository.save(isPresent);
			}
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ResponseMessage(200, "Đã thêm vào giỏ hàng"));
	}

	@Override
	public CartDto findUserCart(Long userId) {
		// throw exception not found
		User user = userRepository.findById(userId).orElseThrow();

		Cart cart = cartRepository.findByUserId(user.getId());
		CartDto cartDto = new CartDto();

		if (cart != null) {
			int totalPrice = 0;
			int totalItem = 0;
			for (CartItem cartsItem : cart.getCartItems()) {
				totalPrice += cartsItem.getPrice();
				totalItem += cartsItem.getQuantity();
			}

			cart.setTotalPrice(totalPrice);
			cart.setTotalItem(totalItem);

			cartRepository.save(cart);
			cartDto.setCartId(cart.getCartId());
			cartDto.setCustomerId(user.getId());

			List<CartItemDto> cartItemDtos = new ArrayList<>();

			List<CartItem> cartItems = cart.getCartItems();

			for (CartItem cartItem : cartItems) {
				CartItemDto cartItemDto = modelMapper.map(cartItem, CartItemDto.class);
				cartItemDto.setCartId(cartItem.getCarts().getCartId());
				cartItemDto.setTitle(cartItem.getBook().getTitle());
				cartItemDto.setImageUrl(cartItem.getBook().getImageUrl());
				cartItemDtos.add(cartItemDto);
			}

			cartDto.setCartItemDtos(cartItemDtos);
			cartDto.setTotalPrice(cart.getTotalPrice());
			cartDto.setTotalItem(cart.getTotalItem());
		}
		return cartDto;
	}

}
