package com.karakoc.ustam.skills;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Skill {

    @Id
    private String id;
    private String name;
    private double mechanicCounter;

}
