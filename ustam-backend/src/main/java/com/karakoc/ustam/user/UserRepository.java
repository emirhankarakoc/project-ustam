package com.karakoc.ustam.user;

import com.karakoc.ustam.user.skill.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findUserByEmail(String email);
    @Query("SELECT u FROM User u JOIN u.skills s WHERE s.id = :skillId")
    List<User> findAllBySkillId(@Param("skillId") String skillId);

    Optional<User> findUserById(String id);
    List<User> findAllByStatus(UserType status);
    Optional<User> findUserByPhoneNumber(String phoneNumber);


    @Query("SELECT u FROM User u JOIN u.skills s WHERE s.id = :skillId")
    List<User> findUsersBySkillId(@Param("skillId") String skillId);
    @Query("SELECT u FROM User u JOIN u.provinces p WHERE p.id = :provinceId")
    List<User> findUsersByProvinceId(@Param("provinceId") String provinceId);

    List<User> findAllByRole(String role);
}
