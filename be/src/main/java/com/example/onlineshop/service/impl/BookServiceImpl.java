package com.example.onlineshop.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.dto.AuthorDto;
import com.example.onlineshop.dto.CategoryDto;
import com.example.onlineshop.dto.CustomPage;
import com.example.onlineshop.dto.LanguageDto;
import com.example.onlineshop.dto.PublisherDto;
import com.example.onlineshop.dto.ViewSearchDto;
import com.example.onlineshop.entity.Author;
import com.example.onlineshop.entity.Book;
import com.example.onlineshop.entity.Category;
import com.example.onlineshop.entity.Publisher;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.SearchFilterRequest;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.BookRepository;
import com.example.onlineshop.service.BookService;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ResponseEntity<ResponseObject> searchFilter(SearchFilterRequest searchFilterRequest, int indexPage) {
		int size = 16;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Book> listBook = bookRepository.listSearchFilter(searchFilterRequest.getAuthor(),
				searchFilterRequest.getCategory(), searchFilterRequest.getPublisher(), searchFilterRequest.getTitle(),
				searchFilterRequest.getLanguage(), pageable);

		List<ViewSearchDto> list = new ArrayList<>();

		// list menu
		List<CategoryDto> caDtos = new ArrayList<>();
		List<AuthorDto> aDtos = new ArrayList<>();
		List<PublisherDto> pDtos = new ArrayList<>();
		List<LanguageDto> lDtos = new ArrayList<>();

		// convert to DTO
		for (Book book : listBook.getContent()) {
			ViewSearchDto searchDto = modelMapper.map(book, ViewSearchDto.class);
			// convert with author
			List<Author> authors = book.getAuthors();
			List<AuthorDto> authorDtos = new ArrayList<>();
			for (Author item : authors) {
				AuthorDto itemDto = modelMapper.map(item, AuthorDto.class);
				authorDtos.add(itemDto);
				aDtos.add(itemDto);
			}
			// convert with category
			List<Category> categories = book.getCategories();
			List<CategoryDto> categoryDtos = new ArrayList<>();
			for (Category item : categories) {
				CategoryDto itemDto = modelMapper.map(item, CategoryDto.class);
				categoryDtos.add(itemDto);
				caDtos.add(itemDto);
			}
			// convert with publisher
			Publisher publisher = book.getPublisher();
			PublisherDto publisherDto = modelMapper.map(publisher, PublisherDto.class);
			pDtos.add(publisherDto);
			lDtos.add(searchDto.getLanguage());

			searchDto.setAuthors(authorDtos);
			searchDto.setPublisher(publisherDto);
			searchDto.setCategories(categoryDtos);

			list.add(searchDto);
		}

		List<ViewSearchDto> price = new ArrayList<>();
		if (searchFilterRequest.getPrice() == 1) {
			System.out.println(searchFilterRequest.getPrice());
			price = list.stream().sorted(Comparator.comparing(ViewSearchDto::getPrice)).collect(Collectors.toList());
		} else if (searchFilterRequest.getPrice() == 2) {
			System.out.println(searchFilterRequest.getPrice());
			price = list.stream().sorted(Comparator.comparing(ViewSearchDto::getPrice).reversed())
					.collect(Collectors.toList());
		} else {
			price = list;
		}

		if (price.isEmpty()) {
			throw new NotFoundException("Không tìm thấy sách");
		} else {
			List<ViewSearchDto> result = new ArrayList<>();
			price.forEach(item -> {
				ViewSearchDto itemDto = ViewSearchDto.builder().bookId(item.getBookId()).title(item.getTitle())
						.description(item.getDescription()).imageUrl(item.getImageUrl())
						.copies_available(item.getCopies_available()).language(item.getLanguage())
						.price(item.getPrice()).authors(item.getAuthors()).publisher(item.getPublisher())
						.categories(item.getCategories()).build();
				result.add(itemDto);
			});
			//remove duplicate elements
			List<CategoryDto> menuCa=caDtos.stream().distinct().collect(Collectors.toList());
			List<PublisherDto> menuPu = pDtos.stream().distinct().collect(Collectors.toList());
			List<AuthorDto> menuAu = aDtos.stream().distinct().collect(Collectors.toList());
			List<LanguageDto> menuLa = lDtos.stream().distinct().collect(Collectors.toList());
			
			//set page search
			CustomPage<ViewSearchDto> pageResponse = new CustomPage<>(result, indexPage, size,
					listBook.getTotalElements(), listBook.getTotalPages());

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Tìm kiếm thành công", new HashMap<>() {
				{
					put("searchList", pageResponse);
					put("listAuthor", menuAu);
					put("listCategory", menuCa);
					put("listPublisher", menuPu);
					put("listLanguage", menuLa);
				}
			}));
		}
	}

}
