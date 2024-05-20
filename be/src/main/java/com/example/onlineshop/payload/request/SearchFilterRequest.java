package com.example.onlineshop.payload.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchFilterRequest {
	String author;

	String category;

	String publisher;

	String title;

	String language;

	int price;
}
