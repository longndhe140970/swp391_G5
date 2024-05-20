package com.example.onlineshop.controller;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.example.onlineshop.dto.ViewSearchDto;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.SearchFilterRequest;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private BookService bookService;

	private SearchFilterRequest req;
	private ResponseObject resObject;
	private ViewSearchDto searchDto;
	private Map<String, Object> data;

	@BeforeEach
	void setUp() {
		req = SearchFilterRequest.builder().title("").author("").category("").publisher("").price(1)
				.language("english").build();

		data = new HashMap<String, Object>();

		searchDto = ViewSearchDto.builder().bookId(17L).title("Tiếng Anh 7 - Tập 1").build();

		data.put("searchList", searchDto);

		resObject = new ResponseObject("Tìm kiếm thành công", data);
	}

	@Test
	void search_success() throws Exception {
		// Given
		ObjectMapper objectMapper = new ObjectMapper();
		String content = objectMapper.writeValueAsString(req);

		Mockito.when(bookService.searchFilter(req, 1)).thenReturn(ResponseEntity.status(HttpStatus.OK).body(resObject));

		// When Then
		mockMvc.perform(MockMvcRequestBuilders.post("/api/book/filter-search").param("index-page", "1")
				.contentType(MediaType.APPLICATION_JSON).content(content))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("data.listAuthor.authorId").value("10"));

	}

	@Test
	void search_notFound() throws Exception {
		// Given
		ObjectMapper objectMapper = new ObjectMapper();
		req = SearchFilterRequest.builder().title("asssss").author("").category("").publisher("").price(1)
				.language("english").build();
		String content = objectMapper.writeValueAsString(req);

		Mockito.when(bookService.searchFilter(req, 1)).thenThrow(new NotFoundException("Không tìm thấy sách"));

		// When Then
		mockMvc.perform(MockMvcRequestBuilders.post("/api/book/filter-search").param("index-page", "1")
				.contentType(MediaType.APPLICATION_JSON).content(content))
				.andExpect(MockMvcResultMatchers.status().isNotFound())
				.andExpect(MockMvcResultMatchers.jsonPath("status").value("NOT_FOUND"))
				.andExpect(MockMvcResultMatchers.jsonPath("message").value("Không tìm thấy sách"));

	}

}
