package com.example.onlineshop.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import com.example.onlineshop.dto.*;
import com.example.onlineshop.entity.*;
import com.example.onlineshop.exception.AuthException;
import com.example.onlineshop.payload.request.BookRequest;
import com.example.onlineshop.payload.request.RatingRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.repository.OrderItemRepository;
import com.example.onlineshop.repository.RatingRepository;
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

import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.SearchFilterRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.BookRepository;
import com.example.onlineshop.service.BookService;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private OrderItemRepository orderItemRepository;
	@Autowired
	private RatingRepository ratingRepository;
	@Autowired
	private UserRepository userRepository;
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
			// remove duplicate elements
			List<CategoryDto> menuCa = caDtos.stream().distinct().collect(Collectors.toList());
			List<PublisherDto> menuPu = pDtos.stream().distinct().collect(Collectors.toList());
			List<AuthorDto> menuAu = aDtos.stream().distinct().collect(Collectors.toList());
			List<LanguageDto> menuLa = lDtos.stream().distinct().collect(Collectors.toList());

			// set page search
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

	@Override
	public ResponseEntity<ResponseObject> bookForHome() {
		List<Book> booksForHome = bookRepository.getBookForHome();
		List<BookCardDto> bookCardDtos = new ArrayList<>();

		for (Book book : booksForHome) {
			BookCardDto bookCardDto = new BookCardDto();

			bookCardDto.setBookId(book.getBookId());
			bookCardDto.setTitle(book.getTitle());
			bookCardDto.setDescription(book.getDescription());
			bookCardDto.setImageUrl(book.getImageUrl());
			bookCardDto.setPrice(book.getPrice());

			bookCardDtos.add(bookCardDto);
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Danh sach cho home", new HashMap<>() {
			{
				put("top10BookNew", bookCardDtos);
			}
		}));
	}

	@Override
	public ResponseEntity<ResponseObject> bookDetails(Long bookId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new NotFoundException("không tìm thấy sách"));

		BookDto bookDto = modelMapper.map(book, BookDto.class);

		List<String> auListDto = new ArrayList<>();
		for (Author item : book.getAuthors()) {
			auListDto.add(item.getName());
		}
		bookDto.setAuthors(auListDto);

		List<String> CategoriesListDto = new ArrayList<>();
		for (Category item : book.getCategories()) {
			CategoriesListDto.add(item.getName());
		}
		bookDto.setCategories(CategoriesListDto);

		bookDto.setLanguage(book.getLanguage().getName());

		bookDto.setPublisher(book.getPublisher().getName());

		List<BookCardDto> bookDtoRelate = new ArrayList<>();
		List<Book> relatedBooks = bookRepository.bookRelate(book.getBookId());

		for (Book relatedBook : relatedBooks) {
			if (!relatedBook.getBookId().equals(book.getBookId())) {
				BookCardDto relatedBookDto = modelMapper.map(relatedBook, BookCardDto.class);
				bookDtoRelate.add(relatedBookDto);
			}
		}

		;
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("thông tin sách", new HashMap<>() {
			{
				put("book", bookDto);
				put("bookRelate", bookDtoRelate);
			}
		}));

	}

	@Override
	public ResponseEntity<ResponseObject> getAllBooks() {
		List<Book> bookList = bookRepository.findAll();
		List<BookDto> dtoList = new ArrayList<>();
		for (Book book : bookList) {
			BookDto bookDto = modelMapper.map(book, BookDto.class);

			List<String> auListDto = new ArrayList<>();
			for (Author item : book.getAuthors()) {
				auListDto.add(item.getName());
			}
			bookDto.setAuthors(auListDto);

			List<String> CategoriesListDto = new ArrayList<>();
			for (Category item : book.getCategories()) {
				CategoriesListDto.add(item.getName());
			}
			bookDto.setCategories(CategoriesListDto);

			bookDto.setLanguage(book.getLanguage().getName());

			bookDto.setPublisher(book.getPublisher().getName());

			dtoList.add(bookDto);
		}
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Thông tin sách", new HashMap<>() {
			{
				put("bookDtoList", dtoList);
			}
		}));
	}

//	@Override
//	public ResponseEntity<ResponseObject> addBook(BookRequest bookRequest) {
//		Book book = new Book();
//		book.setTitle(bookRequest.getTitle());
//		book.setDescription((bookRequest.getDescription()));
//		book.setCopies(bookRequest.getCopies());
//		book.setImageUrl(bookRequest.getImageUrl());
//		book.setCreateAt(LocalDateTime.now());
//		book.setPrice(bookRequest.getPrice());
//		book.setPage(bookRequest.getPage());
//
//
//
//		return null;
//	}

	@Override
	public ResponseEntity<ResponseMessage> rateBook(RatingRequest ratingRequest) {
		if (SecurityUtils.checkAuth().equals("anonymousUser")) {
			throw new AuthException("Bạn hãy đăng kí thành viên để đánh giá sách");
		}

		Long userId = SecurityUtils.getPrincipal().getId();

		OrderItem orderItem = orderItemRepository.findByBookIdAndCustomerId(ratingRequest.getBookId(), userId);
		if (orderItem == null) {
			throw new NotFoundException("Bạn chưa mua sản phẩm này");
		}

		Rating rating = ratingRepository.findByBookIdAndCustomerId(ratingRequest.getBookId(), userId);
		if (rating == null) {
			rating = new Rating();
			User user = userRepository.findUserById(userId);
			Book book = bookRepository.findById(ratingRequest.getBookId()).orElseThrow(() -> new NotFoundException("ko tim thay sach"));
			rating.setCustomer(user);
			rating.setBook(book);
			rating.setRate(ratingRequest.getRating());
		}
		rating.setRate(ratingRequest.getRating());
		ratingRepository.save(rating);

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Đánh giá thành công"));
	}

	@Override
	public ResponseEntity<ResponseObject> searchFill(SearchTextRequest searchTextRequest) {
		List<Book> bookList = bookRepository.findByTitle(searchTextRequest.getSearchText());

		List<ViewSearchDto> vDtos = new ArrayList<>();
		for (Book book : bookList) {
			ViewSearchDto viewSearchDto = modelMapper.map(book, ViewSearchDto.class);

			viewSearchDto.setCategories(null);
			viewSearchDto.setDescription(null);
			viewSearchDto.setPublisher(null);
			viewSearchDto.setLanguage(null);

			vDtos.add(viewSearchDto);
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Tìm kiếm thành công", new HashMap<>() {
			{
				put("listBook", vDtos);
			}
		}));
	}

}
