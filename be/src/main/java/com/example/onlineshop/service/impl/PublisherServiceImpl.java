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
import com.example.onlineshop.dto.PublisherDto;
import com.example.onlineshop.entity.Author;
import com.example.onlineshop.entity.Publisher;
import com.example.onlineshop.exception.BadRequestException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.AuthorRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.PublisherRepository;
import com.example.onlineshop.service.PublisherService;

@Service
public class PublisherServiceImpl implements PublisherService {

	@Autowired
	private PublisherRepository authorRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ResponseEntity<ResponseMessage> createPublisher(AuthorRequest creatRequest) {
		if (creatRequest.getName().isBlank() || creatRequest.getName().isEmpty()) {
			throw new BadRequestException("Hãy nhập tên nhà xuất bản");
		}

		if (authorRepository.existsByName(creatRequest.getName())) {
			throw new BadRequestException("Nhà xuất bản đã tồn tại");
		}

		Publisher author = new Publisher();
		author.setName(creatRequest.getName());
		authorRepository.save(author);

		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseMessage(200, "Cập nhật danh sách nhà xuất bản thành công"));
	}

	@Override
	public ResponseEntity<ResponseMessage> editPublisher(AuthorRequest creatRequest, Long publisherId) {
		Publisher author = authorRepository.findById(publisherId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy nhà xuất bản"));

		if (creatRequest.getName().isBlank() || creatRequest.getName().isEmpty()) {
			throw new BadRequestException("Hãy nhập tên nhà xuất bản");
		}

		String namePublisher = creatRequest.getName().trim();
		if (authorRepository.existsByName(namePublisher) && !author.getName().equals(namePublisher)) {
			throw new BadRequestException("Tên nhà xuất bản đã tồn tại");
		} else {
			author.setName(namePublisher);
			authorRepository.save(author);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseMessage(200, "Thêm mới nhà xuất bản thành công"));
		}
	}

	@Override
	public ResponseEntity<ResponseObject> searchPublisher(SearchTextRequest searchRequest, int indexPage) {
		String text = searchRequest.getSearchText();
		int size = 5;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Publisher> listPublisher = authorRepository.searchPublisher(text, pageable);

		List<PublisherDto> list = new ArrayList<>();

		for (Publisher item : listPublisher.getContent()) {
			PublisherDto authorDto = modelMapper.map(item, PublisherDto.class);
			list.add(authorDto);
		}

		CustomPage<PublisherDto> pageResponse = new CustomPage<>(list, indexPage, size,
				listPublisher.getTotalElements(), listPublisher.getTotalPages());

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Tìm kiếm thành công", new HashMap<>() {
			{
				put("searchList", pageResponse);
			}
		}));
	}

	@Override
	public ResponseEntity<ResponseObject> listPublisher(int indexPage) {
		int size = 5;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Publisher> listPublisher = authorRepository.getListPublisher(pageable);
		List<PublisherDto> list = new ArrayList<>();

		for (Publisher item : listPublisher.getContent()) {
			PublisherDto authorDto = modelMapper.map(item, PublisherDto.class);
			list.add(authorDto);
		}

		CustomPage<PublisherDto> pageResponse = new CustomPage<>(list, indexPage, size,
				listPublisher.getTotalElements(), listPublisher.getTotalPages());

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Danh sách nhà xuất bản", new HashMap<>() {
			{
				put("searchList", pageResponse);
			}
		}));
	}

	@Override
	public ResponseEntity<ResponseObject> detailPublisher(Long publisherId) {
		Publisher pub = authorRepository.findById(publisherId)
				.orElseThrow(() -> new NotFoundException("không tìm thấy nhà xuất bản"));

		PublisherDto authorDto = modelMapper.map(pub, PublisherDto.class);

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Thông tin nhà xuất bản", new HashMap<>() {
			{
				put("publisherDetail", authorDto);
			}
		}));
	}

}
