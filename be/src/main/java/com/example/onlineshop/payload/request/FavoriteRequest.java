package com.example.onlineshop.payload.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FavoriteRequest {
    Long bookId;
    boolean favorite;
}
