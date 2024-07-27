package com.karakoc.ustam.verificationcodes;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Code {
    @Id
    private String id;
    private String value;
    private String userId;
    private LocalDateTime created;
    private LocalDateTime expires;
}
