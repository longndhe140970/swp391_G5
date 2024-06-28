package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.onlineshop.payload.response.ResponseObject;


@Service
public interface ImageService {

	public String upload(MultipartFile file);
	
	public ResponseEntity<ResponseObject> insertBookImage(MultipartFile multipartFile);
}
