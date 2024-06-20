package com.example.onlineshop.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class CustomerDto {
    String name;
    String avatarUrl;
    String dob;
}
