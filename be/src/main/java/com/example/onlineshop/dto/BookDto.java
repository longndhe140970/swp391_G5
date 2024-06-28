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

public class BookDto {
	Long bookId;
	String title;
	String description;
	String imageUrl;
	int copies_available;
	double price;
	int page;
	int totalRate;
	int rate;
	boolean liked;
	String language;
	List<String> authors;
	List<String> categories;
	String publisher;

}
