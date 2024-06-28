package com.example.onlineshop.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.dto.AuthorDto;
import com.example.onlineshop.dto.CustomPage;
import com.example.onlineshop.entity.Author;
import com.example.onlineshop.exception.BadRequestException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.AuthorRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.AuthorRepository;
import com.example.onlineshop.service.AuthorService;

@Service
public class AuthorServiceImpl implements AuthorService {

	@Autowired
	private AuthorRepository authorRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ResponseEntity<ResponseMessage> createAuthor(AuthorRequest createRequest) {

		if (createRequest.getName().isBlank() || createRequest.getName().isEmpty()) {
			throw new BadRequestException("Hãy nhập tên tác giả");
		}

		if (authorRepository.existsByName(createRequest.getName())) {
			throw new BadRequestException("Tác giả đã tồn tại");
		}

		Author author = new Author();
		author.setName(createRequest.getName());
		authorRepository.save(author);

		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseMessage(200, "Cập nhật danh sách tác giả thành công"));
	}

	@Override
	public ResponseEntity<ResponseObject> listAuthor(int indexPage) {
		int size = 5;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Author> listAuthor = authorRepository.getListAuthor(pageable);
		List<AuthorDto> list = new ArrayList<>();

		for (Author item : listAuthor.getContent()) {
			AuthorDto authorDto = modelMapper.map(item, AuthorDto.class);
			list.add(authorDto);
		}

		CustomPage<AuthorDto> pageResponse = new CustomPage<>(list, indexPage, size, listAuthor.getTotalElements(),
				listAuthor.getTotalPages());

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Danh sách tác giả", new HashMap<>() {
			{
				put("searchList", pageResponse);
			}
		}));
	}

	@Override
	public ResponseEntity<ResponseMessage> editAuthor(AuthorRequest creatRequest, Long authorId) {
		Author author = authorRepository.findById(authorId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy tác giả"));

		if (creatRequest.getName().isBlank() || creatRequest.getName().isEmpty()) {
			throw new BadRequestException("Hãy nhập tên tác giả");
		}

		String nameAuthor = creatRequest.getName().trim();
		if (authorRepository.existsByName(nameAuthor) && !author.getName().equals(nameAuthor)) {
			throw new BadRequestException("Tên tác giả đã tồn tại");
		} else {
			author.setName(nameAuthor);
			authorRepository.save(author);
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Thêm mới tác giả thành công"));
		}
	}

	@Override
	public ResponseEntity<ResponseObject> searchAuthor(SearchTextRequest searchRequest, int indexPage) {
		int size = 5;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Author> listAuthor = authorRepository.searchAuthor(searchRequest.getSearchText(), pageable);

		List<AuthorDto> list = new ArrayList<>();

		for (Author item : listAuthor.getContent()) {
			AuthorDto authorDto = modelMapper.map(item, AuthorDto.class);
			list.add(authorDto);
		}

		CustomPage<AuthorDto> pageResponse = new CustomPage<>(list, indexPage, size, listAuthor.getTotalElements(),
				listAuthor.getTotalPages());

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Tìm kiếm thành công", new HashMap<>() {
			{
				put("searchList", pageResponse);
			}
		}));
	}

	@Override
	public ResponseEntity<ResponseObject> detailAuthor(Long authorId) {
		Author author = authorRepository.findById(authorId)
				.orElseThrow(() -> new NotFoundException("không tìm thấy tác giả"));

		AuthorDto authorDto = modelMapper.map(author, AuthorDto.class);

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Thông tin tác giả", new HashMap<>() {
			{
				put("authorDetail", authorDto);
			}
		}));
	}

}
