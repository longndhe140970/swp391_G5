package com.example.onlineshop.service.impl;

import com.example.onlineshop.dto.BookCardDto;
import com.example.onlineshop.dto.CustomPage;
import com.example.onlineshop.entity.*;
import com.example.onlineshop.exception.AuthException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.FavoriteRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.repository.BookRepository;
import com.example.onlineshop.repository.FavoriteRepository;
import com.example.onlineshop.repository.UserRepository;
import com.example.onlineshop.utils.SecurityUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.service.FavoriteService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
public class FavoriteServiceImpl implements FavoriteService {

	@Autowired
	FavoriteRepository favoriteRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	BookRepository bookRepository;

	@Autowired
	private ModelMapper modelMapper;

//	@Override
//	public ResponseEntity<ResponseMessage> createLikeBookByUser(Long bookId) {
//
//		if (SecurityUtils.checkAuth().equals("anonymousUser")) {
//			throw new AuthException("Bạn hãy đăng kí thành viên để sử dụng danh sách yêu thích");
//		}
//
//		Long userId = SecurityUtils.getPrincipal().getId();
//
//		Favorite favorite = favoriteRepository.findByCustomerIdAndBook_bookId(userId, bookId);
//
//		if (favorite == null) {
//			User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("ko tim thay user"));
//			Book book = bookRepository.findById(bookId).orElseThrow(() -> new NotFoundException("ko tim thay sach"));
//			favorite = new Favorite();
//			favorite.setCustomer(user);
//			favorite.setBook(book);
//		}
//		favorite.setFavorite(true);
//		Favorite saveFavoriteItem = favoriteRepository.save(favorite);
//
//		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Đã thêm vào danh sách yêu thích"));
//	}

	@Override
	public ResponseEntity<ResponseMessage> editLikeBookByUser(FavoriteRequest request) {
		if (SecurityUtils.checkAuth().equals("anonymousUser")) {
			throw new AuthException("Bạn hãy đăng kí thành viên để sử dụng danh sách yêu thích");
		}

		Long userId = SecurityUtils.getPrincipal().getId();

		Favorite favorite = favoriteRepository.findByCustomerIdAndBook_bookId(userId, request.getBookId());

		if (favorite == null) {
			User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("ko tim thay user"));
			Book book = bookRepository.findById(request.getBookId()).orElseThrow(() -> new NotFoundException("ko tim thay sach"));
			favorite = new Favorite();
			favorite.setCustomer(user);
			favorite.setBook(book);
		}
		favorite.setFavorite(request.isFavorite());
		Favorite saveFavoriteItem = favoriteRepository.save(favorite);
		String message = request.isFavorite() ? "Đã thêm vào danh sách yêu thích" : "Đã xóa khỏi danh sách yêu thích";

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200,message));
	}

	@Override
	public ResponseEntity<ResponseObject> getAllBookFavoriteByUserId(int indexPage) {
		if (SecurityUtils.checkAuth().equals("anonymousUser")) {
			throw new AuthException("Quý khách chưa đăng nhập để sử dụng sách yêu thích!");
		}

		int size = 16;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		User user = userRepository.findById(SecurityUtils.getPrincipal().getId()).orElseThrow();
		if (!Objects.isNull(user)) {

			Page<Favorite> listFavorite = null;

			List<BookCardDto> listDto = new ArrayList<>();

			if (user.getRole().getName().name().equals("ROLE_CUSTOMER")) {
				listFavorite = favoriteRepository.findByCustomerIdAndIsFavoriteTrue(user.getId(), pageable);
			}

			for (Favorite item : listFavorite.getContent()) {

				BookCardDto bCDto = modelMapper.map(item.getBook(), BookCardDto.class);
				listDto.add(bCDto);
			}

			CustomPage<BookCardDto> pageResponse = new CustomPage<>(listDto, indexPage, size,
					listFavorite.getTotalElements(), listFavorite.getTotalPages());

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Sách yêu thích", new HashMap<>() {
				{
					put("favoriteList", pageResponse);
				}
			}));
		}
		return null;
	}
}