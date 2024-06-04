package com.example.onlineshop.service.impl;

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

import com.example.onlineshop.dto.BookCardDto;
import com.example.onlineshop.dto.CustomPage;
import com.example.onlineshop.dto.OrderItemDto;
import com.example.onlineshop.entity.OrderItem;
import com.example.onlineshop.entity.User;
import com.example.onlineshop.exception.AuthException;
import com.example.onlineshop.payload.response.ResponseMessage;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.OrderItemRepository;
import com.example.onlineshop.repository.UserRepository;
import com.example.onlineshop.service.OrderItemService;
import com.example.onlineshop.utils.SecurityUtils;

@Service
public class OrderItemServiceImpl implements OrderItemService {

	@Autowired
	private OrderItemRepository orderItemRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ResponseEntity<ResponseMessage> createOrderItem(OrderItem orderItem) {
		orderItemRepository.save(orderItem);
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(200, "Thêm mới thành công"));
	}

	@Override
	public ResponseEntity<ResponseObject> getHistory(int indexPage) {
		if (SecurityUtils.checkAuth().equals("anonymousUser")) {
			throw new AuthException("Quý khách chưa đăng nhập để lấy thông tin danh sách!");
		}

		int size = 8;
		int page = indexPage - 1;

		Pageable pageable = PageRequest.of(page, size);

		// thorw exception not found
		User user = userRepository.findById(SecurityUtils.getPrincipal().getId()).orElseThrow();
		if (!Objects.isNull(user)) {

			Page<OrderItem> listOrderItem = null;
			List<OrderItemDto> listDto = new ArrayList<>();
			if (user.getRole().getName().name().equals("ROLE_CUSTOMER")) {
				listOrderItem = orderItemRepository.getAllOrderItemByUserId(user.getId(), pageable);
			}

			for (OrderItem item : listOrderItem) {

				OrderItemDto oIDto = new OrderItemDto();
				oIDto.setOrderItemId(item.getOrderItemId());
				oIDto.setBookDto(modelMapper.map(item.getBook(), BookCardDto.class));
				listDto.add(oIDto);
			}

			CustomPage<OrderItemDto> pageResponse = new CustomPage<>(listDto, indexPage, size,
					listOrderItem.getTotalElements(), listOrderItem.getTotalPages());

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Lịch sử sách mua", new HashMap<>() {
				{
					put("purchaseList", pageResponse);
				}
			}));
		}
		return null;
	}
}
