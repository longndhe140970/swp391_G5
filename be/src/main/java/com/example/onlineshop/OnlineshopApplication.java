package com.example.onlineshop;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.onlineshop.constant.ERole;
import com.example.onlineshop.entity.Role;
import com.example.onlineshop.repository.RoleRepository;


@SpringBootApplication
public class OnlineshopApplication implements CommandLineRunner{
	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(OnlineshopApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		List<Role> roles = new ArrayList<>();
		roles.add(new Role(ERole.ROLE_ADMIN));
		roles.add(new Role(ERole.ROLE_EMPLOYEE));
		roles.add(new Role(ERole.ROLE_CUSTOMER));
		roles.forEach(role -> {
			if (!roleRepository.existsByName(role.getName())) {
				roleRepository.save(role);
			}
		});
	}
}
