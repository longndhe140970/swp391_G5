package com.example.onlineshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onlineshop.entity.Language;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long>{

}
