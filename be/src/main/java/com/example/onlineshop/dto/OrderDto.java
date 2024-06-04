package com.example.onlineshop.dto;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDto {
	Long OrderId;

	double totalPrice;

	boolean status;

	int totalItem;

	Long customerId;
	Long employeeId;

	LocalDateTime createAt;
	String code;
}
