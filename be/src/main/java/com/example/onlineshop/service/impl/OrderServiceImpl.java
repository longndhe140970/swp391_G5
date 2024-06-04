package com.example.onlineshop.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.dto.CartItemDto;
import com.example.onlineshop.dto.OrderDto;
import com.example.onlineshop.dto.OrderItemDto;
import com.example.onlineshop.entity.Book;
import com.example.onlineshop.entity.Cart;
import com.example.onlineshop.entity.CartItem;
import com.example.onlineshop.entity.Order;
import com.example.onlineshop.entity.OrderItem;
import com.example.onlineshop.entity.Role;
import com.example.onlineshop.entity.User;
import com.example.onlineshop.exception.AuthException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.CreateOrderRequest;
import com.example.onlineshop.payload.request.SearchTextRequest;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.BookRepository;
import com.example.onlineshop.repository.CartRepository;
import com.example.onlineshop.repository.OrderItemRepository;
import com.example.onlineshop.repository.OrderRepository;
import com.example.onlineshop.repository.RoleRepository;
import com.example.onlineshop.repository.UserRepository;
import com.example.onlineshop.service.CartService;
import com.example.onlineshop.service.OrderService;
import com.example.onlineshop.utils.SecurityUtils;
import com.example.onlineshop.utils.Utils;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private CartService cartService;
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private OrderItemRepository orderItemRepository;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ResponseEntity<ResponseMessage> createOrder(CreateOrderRequest orderRequest) {
		User user = userRepository.findById(SecurityUtils.getPrincipal().getId()).orElseThrow();

		Role role = roleRepository.findById(user.getRole().getId()).orElseThrow();

		if (role.getName().name().equals("ROLE_CUSTOMER")) {
			// create order with user
			Cart cart = transferDataCart(cartService.findUserCart(user.getId()));

			List<OrderItem> orderItems = new ArrayList<>();
			List<CartItem> cartTemp = cart.getCartItems();

			for (int i = 0; i < cartTemp.size(); i++) {
				OrderItem orderItem = new OrderItem();

				orderItem.setBook(cartTemp.get(i).getBook());
				orderItem.setQuantity(cartTemp.get(i).getQuantity());

				orderItem.setCustomer(cartTemp.get(i).getCustomer());

				Double price = cartTemp.get(i).getPrice();
				orderItem.setPrice(price);

				OrderItem createdOrderItem = orderItemRepository.save(orderItem);

				orderItems.add(createdOrderItem);
			}

			Order createdOrder = new Order();
			createdOrder.setCustomer(user);
			createdOrder.setOrderItems(orderItems);

			Double totalPrice = (double) 0;
			for (OrderItem item : orderItems) {
				totalPrice += item.getPrice();
			}

			createdOrder.setTotalPrice(totalPrice);
			createdOrder.setOrderStatus(false);
			createdOrder.setTotalItem(cart.getTotalItem());
			createdOrder.setCreatedAt(LocalDateTime.now());

			// need fix gencode
			String code = Utils.genCode(12);
//			if (orderRepository.existsByCodeOrder(code)) {
//				code = Utils.genCode(12);
//			}
			createdOrder.setCodeOrder(code);

			cart.setOrdered(!cart.isOrdered());
			cartRepository.save(cart);
			Order savedOrder = orderRepository.save(createdOrder);

			for (OrderItem item : orderItems) {
				item.setOrder(savedOrder);
				OrderItem savedOrderItem = orderItemRepository.findById(item.getOrderItemId())
						.orElseThrow(() -> new NotFoundException("Không tìm thấy sách trong giỏ hàng"));
				if (!Objects.isNull(savedOrderItem)) {
					savedOrderItem.setPayed(false);
					orderItemRepository.save(savedOrderItem);
				}
			}

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Tạo đơn mượn thành công"));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(403, "Tạo đơn mượn lỗi"));
		}
	}

	@Override
	public ResponseEntity<ResponseObject> findOrderByCode(SearchTextRequest searchRequest, int indexPage) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<ResponseMessage> confirmedOrder(Long orderId) {
		// throw exception
		User employee = userRepository.findById(SecurityUtils.getPrincipal().getId()).orElseThrow();
		Order order = orderRepository.findById(orderId).orElseThrow();

		if (Objects.isNull(order)) {
			throw new NotFoundException("không tìm thấy order id");
		} else {
			order.setEmployee(employee);

			List<OrderItem> orderItems = orderItemRepository.findAllOrderItemsByOrderId(orderId);

			for (OrderItem item : orderItems) {
				item.setEmployee(employee);
				item.setPayed(true);
				orderItemRepository.save(item);
				Book book = bookRepository.findById(item.getBook().getBookId())
						.orElseThrow(() -> new NotFoundException("Không tìm thấy sách"));
				int quantity = item.getQuantity();
				book.setCopies(book.getCopies() + quantity);
				book.setCopies_available(book.getCopies_available() - quantity);

				bookRepository.save(book);
			}
			order.setOrderStatus(true);

			orderRepository.save(order);
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Chấp nhận order thành công"));
	}

	@Override
	public ResponseEntity<ResponseMessage> cancledOrder(Long orderId) {
		// throw exception
		User employee = userRepository.findById(SecurityUtils.getPrincipal().getId()).orElseThrow();
		Order order = orderRepository.findById(orderId).orElseThrow();

		if (Objects.isNull(order)) {
			throw new NotFoundException("Không tìm thấy order");
		} else {
			order.setEmployee(employee);
			List<OrderItem> orderItems = orderItemRepository.findAllOrderItemsByOrderId(orderId);

			for (OrderItem item : orderItems) {
				item.setEmployee(employee);
				item.setPayed(false);
				orderItemRepository.save(item);
			}
			order.setOrderStatus(false);
		}
		orderRepository.save(order);
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Từ chối order thành công"));
	}

	@Override
	public ResponseEntity<ResponseObject> getAllOrders(int indexPage) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<ResponseObject> getOrderDetail(Long orderId) {
		User user = userRepository.findById(SecurityUtils.getPrincipal().getId()).orElseThrow();
		if (!user.getRole().getName().name().equals("ROLE_EMPLOYEE")) {
			throw new AuthException("Truy cập bị từ chối");
		} else {
			Order order = orderRepository.findById(orderId).orElseThrow();

			if (Objects.isNull(order)) {
				throw new NotFoundException("Không tìm thấy order");
			} else {
				OrderDto orderDto = new OrderDto();
				orderDto.setOrderId(order.getOrderId());

				orderDto.setCode(order.getCodeOrder());
				orderDto.setTotalPrice(order.getTotalPrice());
				orderDto.setStatus(order.isOrderStatus());
				orderDto.setTotalItem(order.getTotalItem());
				orderDto.setCustomerId(order.getCustomer().getId());
				orderDto.setCreateAt(order.getCreatedAt());
				List<OrderItem> list = orderItemRepository.findAllOrderItemsByOrderId(orderId);
				List<OrderItemDto> listDto = new ArrayList<>();
				for (OrderItem item : list) {
					OrderItemDto dto = modelMapper.map(item, OrderItemDto.class);
					listDto.add(dto);
				}

				return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Order", new HashMap<>() {
					{
						put("orderDetials", orderDto);
						put("orderItems", listDto);
					}
				}));
			}
		}
	}

	private List<CartItem> transferDataCartItem(List<CartItemDto> cartItemDtos) {
		List<CartItem> cartItems = new ArrayList<>();
		for (CartItemDto cartItemDto : cartItemDtos) {
			CartItem cartItem = new CartItem();

			cartItem.setCartItemId(cartItemDto.getCartItemId());
			Cart cart = cartRepository.findById(cartItemDto.getCartId())
					.orElseThrow(() -> new NotFoundException("Không tìm thấy giỏ hàng"));

			cartItem.setCarts(cart);
			Book book = bookRepository.findById(cartItemDto.getBookId()).orElseThrow();

			cartItem.setBook(book);
			cartItem.setCustomer(cart.getCustomer());
			cartItem.setPrice(cartItemDto.getPrice());
			cartItem.setQuantity(cartItemDto.getQuantity());

			cartItems.add(cartItem);
		}
		return cartItems;
	}

	private Cart transferDataCart(com.example.onlineshop.dto.CartDto cartDto) {
		Cart cart = new Cart();
		cart.setCartId(cartDto.getCartId());
		User customer = userRepository.findById(cartDto.getCustomerId()).orElseThrow();
		cart.setCustomer(customer);

		cart.setCartItems(transferDataCartItem(cartDto.getCartItemDtos()));
		cart.setTotalPrice(cartDto.getTotalPrice());
		cart.setTotalItem(cartDto.getTotalItem());
		return cart;
	}

}
