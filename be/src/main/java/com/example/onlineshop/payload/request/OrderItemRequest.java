package com.example.onlineshop.payload.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemRequest {
	Long cartItemId;
	Long bookId;
	int quantity;
}
