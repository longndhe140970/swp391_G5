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

import com.example.onlineshop.dto.SigninDto;
import com.example.onlineshop.exception.BadRequestException;
import com.example.onlineshop.payload.request.SignUpRequest;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AuthService authService;

	private SignUpRequest req;
	private ResponseObject resObject;
	private SigninDto signinDto;
	private Map<String, Object> createdUser;

	@BeforeEach
	void initData() {
		req = SignUpRequest.builder().username("long123456").password("long123456").fullName("fullName")
				.role("customer").build();

		createdUser = new HashMap<String, Object>();
		signinDto = SigninDto.builder().username("long123456").password("long123456").role("customer").status(0)
				.build();
		createdUser.put("user", signinDto);
		resObject = new ResponseObject("Đăng ký tài khoản thành công", createdUser);
	}

	@Test
	void createUser_success() throws Exception {
		// Given
		ObjectMapper objectMapper = new ObjectMapper();
//		objectMapper.registerModule(new JavaTimeModule());
		String content = objectMapper.writeValueAsString(req);

		Mockito.when(authService.register(ArgumentMatchers.any()))
				.thenReturn(ResponseEntity.status(HttpStatus.OK).body(resObject));

		// When Then
		mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(content)).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("data.user.username").value("long123456"));
	}

	@Test
	void createUser_usernameInvalid_fail() throws Exception {
		// Given
		ObjectMapper objectMapper = new ObjectMapper();
		String content = objectMapper.writeValueAsString(req);

		Mockito.when(authService.register(ArgumentMatchers.any()))
				.thenThrow(new BadRequestException("Tên tài khoàn đã tồn tại"));

		// When Then
		mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON)
				.content(content)).andExpect(MockMvcResultMatchers.status().isBadRequest())
				.andExpect(MockMvcResultMatchers.jsonPath("status").value("101"))
				.andExpect(MockMvcResultMatchers.jsonPath("message").value("Tên tài khoàn đã tồn tại"));
	}
}
