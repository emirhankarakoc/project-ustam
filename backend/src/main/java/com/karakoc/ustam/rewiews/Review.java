package com.karakoc.ustam.rewiews;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Review {
@Id
    private String id;
    private String clientId;
    private String mechanicIc;
    @Column(columnDefinition = "TEXT")
    private String description;

    private int point;
}
