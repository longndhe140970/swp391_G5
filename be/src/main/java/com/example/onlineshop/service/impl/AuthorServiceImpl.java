package com.example.onlineshop.service.impl;

import com.example.onlineshop.entity.Author;
import com.example.onlineshop.exception.BadRequestException;
import com.example.onlineshop.payload.request.AuthorRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;

import com.example.onlineshop.dto.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.onlineshop.entity.Author;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.AuthorRepository;
import com.example.onlineshop.service.AuthorService;


@Service
public class AuthorServiceImpl implements AuthorService{

	@Autowired
	private AuthorRepository authorRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ResponseEntity<ResponseMessage> createAuthor(AuthorRequest createRequest) {
		
		if (authorRepository.existsByName(createRequest.getName())) {
		    throw new BadRequestException("Tác giả đã tồn tại");
		}
		Author author = new Author();
		author.setName(createRequest.getName());
		authorRepository.save(author);

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Cập nhật danh sách tác giả thành công"));
	}

	@Override
	public ResponseEntity<ResponseObject> listAuthor(int indexPage) {
		// TODO Auto-generated method stub
		return null; 
	}



	@Override
	public ResponseEntity<ResponseMessage> editAuthor(AuthorRequest creatRequest, Long authorId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<ResponseObject> searchAuthor(SearchTextRequest searchRequest, int indexPage) {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
