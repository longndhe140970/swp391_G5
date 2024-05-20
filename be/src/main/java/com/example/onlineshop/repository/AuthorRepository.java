package com.example.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

}
