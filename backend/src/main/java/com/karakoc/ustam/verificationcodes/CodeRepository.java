package com.karakoc.ustam.verificationcodes;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CodeRepository extends JpaRepository<Code,String> {
    Optional<Code> findByUserId(String userId);
}
