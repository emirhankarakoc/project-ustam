package com.karakoc.ustam.user.province;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.boot.convert.DataSizeUnit;

@Entity
@Data
public class Province {
    @Id
    private String id;
    private String name;
    private double mechanicCounter;

}
