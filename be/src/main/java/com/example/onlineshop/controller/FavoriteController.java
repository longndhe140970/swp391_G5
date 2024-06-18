package com.example.onlineshop.controller;

import com.example.onlineshop.payload.request.FavoriteRequest;
import com.example.onlineshop.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

//    @PutMapping("/add")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
//    public ResponseEntity<?> addItemToFavorite(@RequestBody FavoriteRequest req) {
//
//        return favoriteService.createLikeBookByUser(req.getBookId());
//
//    }

    @GetMapping("/list")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> getAllFavorite(@RequestParam("index-page") int indexPage) {
        return favoriteService.getAllBookFavoriteByUserId(indexPage);
    }

//    @PutMapping("/remove")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
//    public ResponseEntity<?> removeItemFromFavorite(@RequestBody FavoriteRequest req) {
//
//        return favoriteService.editLikeBookByUser(req.getBookId());
//
//    }

    @PutMapping("/edit")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> editItemFromFavorite(@RequestBody FavoriteRequest req) {
        System.out.println(req.getBookId());
        System.out.println(req.isFavorite());
        return favoriteService.editLikeBookByUser(req);

    }
}
