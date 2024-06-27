package com.example.onlineshop.payload.request;

import com.example.onlineshop.entity.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookRequest {
    Long bookId;
    String title;
    String description;
    double price;
    String imageUrl;
    int copies;
    int page;
    List<Author> authors;
    List<Category> categories;
    Publisher publisher;
    Language language;
}
