package com.example.onlineshop.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
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
import com.example.onlineshop.dto.BookCardDto;
import com.example.onlineshop.dto.BookDto;
import com.example.onlineshop.dto.CategoryDto;
import com.example.onlineshop.dto.CustomPage;
import com.example.onlineshop.dto.LanguageDto;
import com.example.onlineshop.dto.PublisherDto;
import com.example.onlineshop.dto.ViewSearchDto;
import com.example.onlineshop.entity.Author;
import com.example.onlineshop.entity.Book;
import com.example.onlineshop.entity.Category;
import com.example.onlineshop.entity.Favorite;
import com.example.onlineshop.entity.OrderItem;
import com.example.onlineshop.entity.Publisher;
import com.example.onlineshop.entity.Rating;
import com.example.onlineshop.entity.User;
import com.example.onlineshop.exception.AuthException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.RatingRequest;
import com.example.onlineshop.payload.request.SearchFilterRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.BookRepository;
import com.example.onlineshop.repository.FavoriteRepository;
import com.example.onlineshop.repository.OrderItemRepository;
import com.example.onlineshop.repository.RatingRepository;
import com.example.onlineshop.repository.UserRepository;
import com.example.onlineshop.service.BookService;
import com.example.onlineshop.utils.SecurityUtils;

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
	@Autowired
	private FavoriteRepository favoriteRepository;

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
		List<Book> top10New = bookRepository.top10New();
		List<BookCardDto> top10NewDto = new ArrayList<>();

		for (Book book : top10New) {
			BookCardDto bookCardDto = new BookCardDto();

			bookCardDto.setBookId(book.getBookId());
			bookCardDto.setTitle(book.getTitle());
			bookCardDto.setDescription(book.getDescription());
			bookCardDto.setImageUrl(book.getImageUrl());
			bookCardDto.setPrice(book.getPrice());
			bookCardDto.setCopies_available(1);
			top10NewDto.add(bookCardDto);
		}

		List<Book> top10Sale = bookRepository.top10Sale();
		List<BookCardDto> top10SaleDto = new ArrayList<>();

		for (Book book : top10Sale) {
			BookCardDto bookCardDto = modelMapper.map(book, BookCardDto.class);
			bookCardDto.setCopies_available(1);
			top10SaleDto.add(bookCardDto);
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Danh sach cho home", new HashMap<>() {
			{
				put("top10New", top10NewDto);
				put("top10Sale", top10SaleDto);
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

		// set rate for book
		List<Rating> listRate = ratingRepository.getRatingByBookId(bookId);
		int avgRate = 0;
		int totalRate = 0;

		if (!listRate.isEmpty()) {
			totalRate = listRate.size();
			int totalRating = 0;
			for (Rating rating : listRate) {
				totalRating += rating.getRate();
			}
			avgRate = (int) totalRating / totalRate;
		}
		bookDto.setRate(avgRate);
		bookDto.setTotalRate(totalRate);

		// set like

		if (SecurityUtils.checkAuth().equals("anonymousUser")) {
			bookDto.setLiked(false);
		} else {
			User user = userRepository.findUserById(SecurityUtils.getPrincipal().getId());
			Favorite favorite = favoriteRepository.findByCustomerIdAndBook_bookId(user.getId(), bookId);
			if (Objects.isNull(favorite)) {
				bookDto.setLiked(false);
			} else {
				bookDto.setLiked(favorite.isFavorite());
			}
		}

		List<BookCardDto> bookDtoRelate = new ArrayList<>();
		List<Book> relatedBooks = bookRepository.bookRelate(book.getBookId());

		for (Book relatedBook : relatedBooks) {
			if (!relatedBook.getBookId().equals(book.getBookId())) {
				BookCardDto relatedBookDto = modelMapper.map(relatedBook, BookCardDto.class);
				bookDtoRelate.add(relatedBookDto);
			}
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("thông tin sách", new HashMap<>() {
			{
				put("book", bookDto);
				put("bookRelate", bookDtoRelate);
			}
		}));

	}

	@Override
	public ResponseEntity<ResponseObject> getAllBooks(int indexPage) {
		int size = 5;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Book> listBook = bookRepository.listBook(pageable);

		List<BookDto> list = new ArrayList<>();

		for (Book item : listBook.getContent()) {
			BookDto dto = modelMapper.map(item, BookDto.class);

			List<String> auSto = new ArrayList<>();
			for (Author aut : item.getAuthors()) {
				auSto.add(aut.getName());
			}
			dto.setAuthors(auSto);
			dto.setLanguage(item.getLanguage().getName());
			list.add(dto);
		}

		CustomPage<BookDto> pageResponse = new CustomPage<>(list, indexPage, size, listBook.getTotalElements(),
				listBook.getTotalPages());

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Danh sách", new HashMap<>() {
			{
				put("searchList", pageResponse);
			}
		}));
	}

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
			Book book = bookRepository.findById(ratingRequest.getBookId())
					.orElseThrow(() -> new NotFoundException("ko tim thay sach"));
			rating.setCustomer(user);
			rating.setBook(book);
			rating.setRate(ratingRequest.getRating());
		}
		rating.setRate(ratingRequest.getRating());
		ratingRepository.save(rating);

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Đánh giá thành công"));
	}

	@Override
	public ResponseEntity<ResponseObject> searchFill(SearchTextRequest searchTextRequest, int indexPage) {
		int size = 5;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Book> listBook = bookRepository.searchBook(searchTextRequest.getSearchText(), pageable);

		List<BookDto> list = new ArrayList<>();

		for (Book item : listBook.getContent()) {
			BookDto dto = modelMapper.map(item, BookDto.class);
			List<String> auSto = new ArrayList<>();
			for (Author aut : item.getAuthors()) {
				auSto.add(aut.getName());
			}
			dto.setAuthors(auSto);
			dto.setLanguage(item.getLanguage().getName());
			list.add(dto);
		}

		CustomPage<BookDto> pageResponse = new CustomPage<>(list, indexPage, size, listBook.getTotalElements(),
				listBook.getTotalPages());

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Danh sách", new HashMap<>() {
			{
				put("searchList", pageResponse);
			}
		}));
	}

}
