package com.example.onlineshop.payload.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SignUpRequest {

	String username;

	String password;

	String fullName;

	String role;
}
