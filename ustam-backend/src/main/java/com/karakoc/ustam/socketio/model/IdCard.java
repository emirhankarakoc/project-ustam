package com.karakoc.ustam.socketio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class IdCard {
    @Id
    private String id;
    private String userId;
    private String imagePath;
    private String imageCloudId;

    @Enumerated
    private CardStatus status;
}
