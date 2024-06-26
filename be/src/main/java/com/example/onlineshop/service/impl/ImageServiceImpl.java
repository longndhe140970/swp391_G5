package com.example.onlineshop.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.onlineshop.exception.BadRequestException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.service.ImageService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ImageServiceImpl implements ImageService {

	@Autowired
	private Cloudinary cloudinary;

	@Override
	public String upload(MultipartFile file) {
		if (file.isEmpty()) {
			throw new NotFoundException("File ảnh rỗng");
		}
		File fileObj = convertMultiPartFileToFile(file);

		Long size = fileObj.length() / (1024 * 1024);
		if (size > 25) {
			throw new BadRequestException("Size ảnh quá lớn");
		}

		String type = file.getContentType();

		if (type.contains("image/jpg") || type.equals("image/png") || type.equals("image/jpeg")) {
			String imageUrl = null;

			try {
				Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(),
						ObjectUtils.asMap("public_id", fileObj.getName(), "overwrite", true));
				imageUrl = (String) result.get("url");
				fileObj.delete();
			} catch (Exception e) {
				log.error("Lỗi khi upload file", e);
			}
			return imageUrl;
		} else {
			throw new BadRequestException("Hãy chọn ảnh có đuôi là jpg hoặc png");
		}
	}

	private File convertMultiPartFileToFile(MultipartFile file) {
		File convertedFile = new File(file.getOriginalFilename());
		try {
			FileOutputStream fos = new FileOutputStream(convertedFile);
			fos.write(file.getBytes());
			fos.close();
		} catch (Exception e) {
			log.error("Lỗi khi coverting multipartFile to file", e);
		}
		return convertedFile;
	}

	@Override
	public ResponseEntity<ResponseObject> insertBookImage(MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			throw new NotFoundException("File trống");
		} else {
			String fileName = upload(multipartFile);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Upload ảnh thành công", new HashMap<>() {
						{
							put("imageLink", fileName);
						}
					}));
		}
	}
}
