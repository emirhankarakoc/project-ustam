package com.karakoc.ustam.utilities.socketio.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IdCardRepository extends JpaRepository<IdCard,String> {
    List<IdCard> findAllByStatus(CardStatus status);
    Optional<IdCard> findByUserId(String userId);
}
