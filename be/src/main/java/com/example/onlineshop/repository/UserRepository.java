package com.example.onlineshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);
	
	Boolean existsByPhoneNumber(String phoneNumber);

	Boolean existsByEmail(String email);

	Boolean existsByPassword(String password);

//	User getUserByCodeActive(String otp);

	User getUserByEmail(String email);

	User findUserById(Long id);
}
