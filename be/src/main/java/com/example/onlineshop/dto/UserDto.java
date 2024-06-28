package com.example.onlineshop.dto;

import java.util.Date;

import com.example.onlineshop.entity.User;

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

public class UserDto {
	Long userId;
	String username;
	String fullName;
	boolean userStatus;
	String address;
	String avatarUrl;
	Date dob;

	public static UserDto convertToUserDto(User user) {
		UserDto userDto = new UserDto();
		userDto.setUserId(user.getId());
		userDto.setFullName(user.getUserDetail().getFullName());
		userDto.setUsername(user.getUsername());
		return userDto;
	}
}
