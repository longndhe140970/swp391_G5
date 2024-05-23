package com.example.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Publisher;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long>{

}
