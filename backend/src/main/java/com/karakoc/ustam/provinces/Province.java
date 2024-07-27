package com.karakoc.ustam.provinces;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Province {
    @Id
    private String id;
    private String name;
    private double mechanicCounter;

}
