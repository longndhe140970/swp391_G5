package com.example.onlineshop.dto;

import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ViewSearchDto {

	Long bookId;
	String title;
	String description;
	String imageUrl;
	int copies_available;
	double price;
	LanguageDto language;
	List<AuthorDto> authors;
	List<CategoryDto> categories;
	PublisherDto publisher;
}
