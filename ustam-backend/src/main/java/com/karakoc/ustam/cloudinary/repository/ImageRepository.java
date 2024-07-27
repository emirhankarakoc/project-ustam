package com.karakoc.ustam.cloudinary.repository;

import com.karakoc.ustam.cloudinary.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image,Integer> {
    List<Image> findByOrderById();
}