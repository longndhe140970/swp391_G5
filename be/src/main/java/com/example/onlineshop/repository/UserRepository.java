package com.example.onlineshop.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

	@Query(value = "SELECT * FROM onlineshop.user", nativeQuery = true)
	Page<User> getListAccount(Pageable pageable);

	@Query(value = "SELECT * FROM user WHERE :username IS NULL OR user.username LIKE %:username%", countQuery = "SELECT COUNT(id) FROM user WHERE :username IS NULL OR user.username LIKE %:username%", nativeQuery = true)
	Page<User> searchAccountByUsernamer(@Param("username") String username, Pageable pageable);
}
