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

import com.example.onlineshop.dto.CategoryDto;
import com.example.onlineshop.dto.CustomPage;
import com.example.onlineshop.entity.Category;
import com.example.onlineshop.exception.BadRequestException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.AuthorRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.CategoryRepository;
import com.example.onlineshop.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ResponseEntity<ResponseMessage> createCategory(AuthorRequest creatRequest) {
		if (creatRequest.getName().isBlank() || creatRequest.getName().isEmpty()) {
			throw new BadRequestException("Hãy nhập tên danh mục");
		}

		if (categoryRepository.existsByName(creatRequest.getName())) {
			throw new BadRequestException("Danh mục đã tồn tại");
		}

		Category category = new Category();
		category.setName(creatRequest.getName());
		categoryRepository.save(category);

		return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseMessage(200, "Cập nhật danh sách danh mục thành công"));
	}

	@Override
	public ResponseEntity<ResponseMessage> editCategory(AuthorRequest creatRequest, Long categoryId) {
		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy danh mục"));

		if (creatRequest.getName().isBlank() || creatRequest.getName().isEmpty()) {
			throw new BadRequestException("Hãy nhập tên danh mục");
		}

		String nameAuthor = creatRequest.getName().trim();
		if (categoryRepository.existsByName(nameAuthor) && !category.getName().equals(nameAuthor)) {
			throw new BadRequestException("Tên danh mục đã tồn tại");
		} else {
			category.setName(nameAuthor);
			categoryRepository.save(category);
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Thêm mới danh mục thành công"));
		}
	}

	@Override
	public ResponseEntity<ResponseObject> searchCategory(SearchTextRequest searchRequest, int indexPage) {
		String text = searchRequest.getSearchText();
		int size = 5;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Category> listAuthor = categoryRepository.searchCategory(text, pageable);

		List<CategoryDto> list = new ArrayList<>();

		for (Category item : listAuthor.getContent()) {
			CategoryDto authorDto = modelMapper.map(item, CategoryDto.class);
			list.add(authorDto);
		}

		CustomPage<CategoryDto> pageResponse = new CustomPage<>(list, indexPage, size, listAuthor.getTotalElements(),
				listAuthor.getTotalPages());

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Tìm kiếm thành công", new HashMap<>() {
			{
				put("searchList", pageResponse);
			}
		}));
	}

	@Override
	public ResponseEntity<ResponseObject> listCategory(int indexPage) {
		int size = 5;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Category> listCategory = categoryRepository.getListCategory(pageable);
		List<CategoryDto> list = new ArrayList<>();

		for (Category item : listCategory.getContent()) {
			CategoryDto authorDto = modelMapper.map(item, CategoryDto.class);
			list.add(authorDto);
		}

		CustomPage<CategoryDto> pageResponse = new CustomPage<>(list, indexPage, size, listCategory.getTotalElements(),
				listCategory.getTotalPages());

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Danh sách danh mục", new HashMap<>() {
			{
				put("searchList", pageResponse);
			}
		}));
	}

	@Override
	public ResponseEntity<ResponseObject> detailCategory(Long categoryId) {
		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(() -> new NotFoundException("không tìm thấy danh mục"));

		CategoryDto dto = modelMapper.map(category, CategoryDto.class);

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Thông tin danh mục", new HashMap<>() {
			{
				put("categoryDetail", dto);
			}
		}));
	}

}
