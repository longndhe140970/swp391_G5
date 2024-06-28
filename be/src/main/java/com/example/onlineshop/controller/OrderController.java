package com.example.onlineshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onlineshop.payload.request.CreateOrderRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.service.OrderItemService;
import com.example.onlineshop.service.OrderService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private OrderItemService orderItemService;

	@PostMapping("/add")
	@PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> createOrderHandler(@RequestBody CreateOrderRequest orderRequest) {
		return orderService.createOrder(orderRequest);
	}

	@PutMapping("/{orderId}/confirmed")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> ConfirmedOrderHandler(@PathVariable Long orderId) {
		return orderService.confirmedOrder(orderId);
	}

	@PutMapping("/{orderId}/cancel")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> canceledOrderHandler(@PathVariable Long orderId) {
		return orderService.cancledOrder(orderId);
	}

	@GetMapping("/{orderId}")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> getDetailOrdersHandler(@PathVariable Long orderId) {
		return orderService.getOrderDetail(orderId);
	}

	@GetMapping("")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> getAllOrders(@RequestParam("index-page") int indexPage) {
		return orderService.getAllOrders(indexPage);
	}

	@PostMapping("/search")
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	public ResponseEntity<?> searchOrderByCode(@RequestBody SearchTextRequest nameSearch,
			@RequestParam("index-page") int indexPage) {
		return orderService.findOrderByCode(nameSearch, indexPage);
	}

	@GetMapping("/history")
	@PreAuthorize("hasRole('ROLE_CUSTOMER')")
	public ResponseEntity<?> getHistory(@RequestParam("index-page") int indexPage) {
		return orderItemService.getHistory(indexPage);
	}

}
