package com.example.onlineshop.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String username;
	String password;

	@Column(name = "email", length = 50)
	String email;

	@Column(name = "phone_number", length = 10)
	String phoneNumber;

	@ManyToOne
	@JoinColumn(name = "role_id", nullable = false)
	Role role;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_detail_id", referencedColumnName = "user_detail_id")
	UserDetail userDetail;

	@OneToMany(mappedBy = "customer")
	private List<Favorite> favorites;

	@OneToMany(mappedBy = "customer")
	private List<CartItem> cartItems;

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<OrderItem> orderItems;

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Order> orders;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<OrderItem> orderItems_e;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Order> orders_e;

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private  List<Rating> ratings;
}
