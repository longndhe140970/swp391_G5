package com.example.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityResponsitory extends JpaRepository<City, Integer> {
    City findByName(String name);
}
