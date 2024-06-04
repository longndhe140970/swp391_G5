package com.example.onlineshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString

@Entity
@Table(name = "order_item")
public class OrderItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderItemId;

	private int quantity;

	private double price;

	private boolean isPayed;

	@OneToOne
	@JoinColumn(name = "book_id", referencedColumnName = "book_id")
	private Book book;

	@ManyToOne
	@JoinColumn(name = "customer_id", referencedColumnName = "id")
	private User customer;

	@ManyToOne
	@JoinColumn(name = "employee_id", referencedColumnName = "id")
	private User employee;

	@ManyToOne
	@JoinColumn(name = "order_id", referencedColumnName = "order_id")
	private Order order;
}
