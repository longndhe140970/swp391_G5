package com.example.onlineshop.payload.request;

import java.util.List;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderRequest {

	String fullName;
	String email;
	String phoneNumber;
	List<OrderItemRequest> listOrderItem;
}
