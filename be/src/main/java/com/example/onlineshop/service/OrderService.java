package com.example.onlineshop.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.payload.request.CreateOrderRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;

@Service
public interface OrderService {
	public ResponseEntity<ResponseMessage> createOrder(CreateOrderRequest orderRequest);

	public ResponseEntity<ResponseObject> findOrderByCode(SearchTextRequest searchRequest, int indexPage);

	public ResponseEntity<ResponseMessage> confirmedOrder(Long orderId);

	public ResponseEntity<ResponseMessage> cancledOrder(Long orderId);

	public ResponseEntity<ResponseObject> getAllOrders(int indexPage);

	public ResponseEntity<ResponseObject> getOrderDetail(Long orderId);
}
