package com.karakoc.ustam.skills;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill,String> {
    Optional<Skill> findByName(String name);
}
