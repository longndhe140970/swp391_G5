package com.example.onlineshop.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.onlineshop.constant.ERole;
import com.example.onlineshop.dto.CartDto;
import com.example.onlineshop.dto.CartItemDto;
import com.example.onlineshop.dto.CustomPage;
import com.example.onlineshop.dto.OrderDto;
import com.example.onlineshop.dto.OrderItemDto;
import com.example.onlineshop.dto.UserDto;
import com.example.onlineshop.entity.Book;
import com.example.onlineshop.entity.Cart;
import com.example.onlineshop.entity.CartItem;
import com.example.onlineshop.entity.Order;
import com.example.onlineshop.entity.OrderItem;
import com.example.onlineshop.entity.Role;
import com.example.onlineshop.entity.User;
import com.example.onlineshop.entity.UserDetail;
import com.example.onlineshop.exception.AuthException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.exception.SaveDataException;
import com.example.onlineshop.payload.request.CreateOrderRequest;
import com.example.onlineshop.payload.request.OrderItemRequest;
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
				orderItem.setPayed(false);

				orderItem.setCustomer(cartTemp.get(i).getCustomer());

				Double price = cartTemp.get(i).getPrice();
				orderItem.setPrice(price);

				// OrderItem createdOrderItem = orderItemRepository.save(orderItem);

				orderItems.add(orderItem);
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

//			for (OrderItem item : orderItems) {
//				item.setOrder(savedOrder);
//				OrderItem savedOrderItem = orderItemRepository.findById(item.getOrderItemId())
//						.orElseThrow(() -> new NotFoundException("Không tìm thấy sách trong giỏ hàng"));
//				if (!Objects.isNull(savedOrderItem)) {
//					savedOrderItem.setPayed(false);
//					orderItemRepository.save(savedOrderItem);
//				}
//			}

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Tạo đơn mượn thành công"));
		} else if (role.getName().name().equals("ROLE_EMPLOYEE")) {
			// create new user with role guest
			User guest = new User();
			UserDetail guestDetail = new UserDetail();

			if (orderRequest.getFullName().isBlank() || orderRequest.getFullName().isEmpty()) {
				throw new SaveDataException("Hãy nhập tên khách hàng");
			}
			guestDetail.setFullName(orderRequest.getFullName());

			if (orderRequest.getEmail().isBlank() || orderRequest.getEmail().isEmpty()) {
				throw new SaveDataException("Hãy nhập Email khách hàng");
			}
			guest.setEmail(orderRequest.getEmail());

			if (orderRequest.getPhoneNumber().isBlank() || orderRequest.getPhoneNumber().isEmpty()) {
				throw new SaveDataException("Hãy nhập số điện thoại khách hàng");
			}

			guest.setPhoneNumber(orderRequest.getPhoneNumber());
			Role guestRole = roleRepository.findByName(ERole.ROLE_GUEST)
					.orElseThrow(() -> new NotFoundException("Không tìm thấy role là guest"));
//						user.setUserStatus(false);
			guest.setRole(guestRole);
			String usernameForGuest = "guest-" + Utils.genCode(6);
			guest.setUsername(usernameForGuest);
			guest.setPassword("123@123");

			// check guest existed
			User userFind = userRepository.getUserByEmail(orderRequest.getEmail());

			User savedGuest = new User();
			if (Objects.isNull(userFind)) {
				savedGuest = userRepository.save(guest);
			}

			// resolve choose book
			if (orderRequest.getListOrderItem().size() == 0) {
				throw new SaveDataException("Hãy chọn sách cho khách hàng");
			}

			// code
			Order order = new Order();

			String code = Utils.genCode(12);
			order.setCodeOrder(code);
			order.setCreatedAt(LocalDateTime.now());
			order.setOrderStatus(true);
			order.setEmployee(user);
			order.setCustomer(savedGuest);

			if (!Objects.isNull(userFind)) {
				order.setCustomer(userFind);
			}

			List<OrderItemRequest> listOIRequest = orderRequest.getListOrderItem();
			double totalPrice = 0;
			int totalItem = 0;
			List<OrderItem> listOI = new ArrayList<>();

			// resolve ever item in request
			for (OrderItemRequest itemRequest : listOIRequest) {
				Book book = bookRepository.findById(itemRequest.getBookId())
						.orElseThrow(() -> new NotFoundException("Không tìm thấy id của sách"));

				OrderItem orderItem = new OrderItem();

				Double price = book.getPrice() * itemRequest.getQuantity();

				totalPrice += price;

				orderItem.setPrice(price);
				orderItem.setQuantity(itemRequest.getQuantity());

				totalItem += itemRequest.getQuantity();

				orderItem.setBook(book);
				orderItem.setEmployee(user);
				orderItem.setOrder(order);
				orderItem.setCustomer(savedGuest);
				orderItem.setPayed(true);

				if (!Objects.isNull(userFind)) {
					orderItem.setCustomer(userFind);
				}

//				orderItemRepository.save(orderItem);

				listOI.add(orderItem);

				// update copies in library
				book.setCopies_available(book.getCopies_available() - itemRequest.getQuantity());

				bookRepository.save(book);
			}
			order.setTotalItem(totalItem);
			order.setTotalPrice(totalPrice);

			orderRepository.save(order);

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Tạo đơn mượn thành công"));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(403, "Tạo đơn mượn lỗi"));
		}
	}

	@Override
	public ResponseEntity<ResponseObject> findOrderByCode(SearchTextRequest searchRequest, int indexPage) {
		int size = 5;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		Page<Order> listOrder = orderRepository.searchByCode(searchRequest.getSearchText(), pageable);

		List<OrderDto> listOrderDto = new ArrayList<>();

		for (Order item : listOrder) {

			OrderDto orderDto = new OrderDto();
			orderDto.setOrderId(item.getOrderId());
			orderDto.setTotalPrice(item.getTotalPrice());
			orderDto.setStatus(item.isOrderStatus());
			orderDto.setTotalItem(item.getTotalItem());
			orderDto.setCustomer(UserDto.convertToUserDto(item.getCustomer()));
			if (!Objects.isNull(item.getEmployee())) {
				orderDto.setEmployee(UserDto.convertToUserDto(item.getEmployee()));
			}
			orderDto.setCreatedAt(item.getCreatedAt());
			orderDto.setCode(item.getCodeOrder());

			listOrderDto.add(orderDto);
		}

		CustomPage<OrderDto> pageResponse = new CustomPage<>(listOrderDto, indexPage, size,
				listOrder.getTotalElements(), listOrder.getTotalPages());

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Tìm kiếm thành công", new HashMap<>() {
			{
				put("searchList", pageResponse);
			}
		}));
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

		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Chấp nhận đơn thành công"));
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
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Từ chối đơn thành công"));
	}

	@Override
	public ResponseEntity<ResponseObject> getAllOrders(int indexPage) {
		int sizeItemOfPage = 4;
		int page = indexPage - 1;
		User user = userRepository.findUserById(SecurityUtils.getPrincipal().getId());

		if (!user.getRole().getName().name().equals("ROLE_EMPLOYEE")) {
			throw new AuthException("Truy cập bị từ chối");
		} else {

			Pageable pageable = PageRequest.of(page, sizeItemOfPage);

			Page<Order> orders = orderRepository.findAllOrders(pageable);

			List<OrderDto> orderDtoList = new ArrayList<>();

			if (orders.getTotalElements() == 0) {
				throw new NotFoundException("Không tìm thấy đơn");
			} else {
				for (Order order : orders.getContent()) {
					OrderDto orderDto = new OrderDto();
					orderDto.setOrderId(order.getOrderId());
					orderDto.setCode(order.getCodeOrder());
					orderDto.setStatus(order.isOrderStatus());
					orderDto.setTotalItem(order.getTotalItem());
					orderDto.setTotalPrice(order.getTotalPrice());
					orderDto.setCreatedAt(order.getCreatedAt());

					orderDto.setCustomer(UserDto.convertToUserDto(order.getCustomer()));
					if (Objects.isNull(order.getEmployee())) {
						orderDto.setEmployee(null);
					} else {
						orderDto.setEmployee(UserDto.convertToUserDto(order.getEmployee()));
					}
					orderDtoList.add(orderDto);
				}
			}

			CustomPage<OrderDto> pageResponse = new CustomPage<>(orderDtoList, indexPage, sizeItemOfPage,
					orders.getTotalElements(), orders.getTotalPages());

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Danh sách đơn hàng", new HashMap<>() {
				{
					put("searchList", pageResponse);
				}
			}));
		}
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
				orderDto.setCustomer(UserDto.convertToUserDto(order.getCustomer()));
				orderDto.setCreatedAt(order.getCreatedAt());
				List<OrderItem> list = orderItemRepository.findAllOrderItemsByOrderId(orderId);
				List<OrderItemDto> listDto = new ArrayList<>();
				for (OrderItem item : list) {
					OrderItemDto dto = modelMapper.map(item, OrderItemDto.class);
					listDto.add(dto);
				}

				return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Order", new HashMap<>() {
					{
						put("orderDetail", orderDto);
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

	private Cart transferDataCart(CartDto cartDto) {
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
