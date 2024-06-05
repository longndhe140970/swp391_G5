package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.entity.OrderItem;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface OrderItemService {
	public ResponseEntity<ResponseMessage> createOrderItem(OrderItem orderItem);

	public ResponseEntity<ResponseObject> getHistory(int indexPage);
}
