package com.example.onlineshop.utils;

import org.springframework.security.core.context.SecurityContextHolder;

import com.example.onlineshop.configuration.services.UserDetailsImpl;

public class SecurityUtils {
	public static UserDetailsImpl getPrincipal() {
		return (UserDetailsImpl) (SecurityContextHolder.getContext()).getAuthentication().getPrincipal();
	}

	public static String checkAuth() {
		return (SecurityContextHolder.getContext()).getAuthentication().getPrincipal().toString();
	}
}
