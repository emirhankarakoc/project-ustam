package com.karakoc.ustam.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@AllArgsConstructor
public class TokenManager {
    private final JwtProperties properties;

    //generatetoken
    public String issue(String userId,String email, List<String> roles){
        return JWT.create()
                //CONTENT
                .withSubject(userId)
                .withExpiresAt(Instant.now().plus(Duration.of(30, ChronoUnit.DAYS)))
                .withClaim("e", email)
                //buradaki "a" yi degistirirsen , jwtToPrincipalConveter classindaki key'i de degistirmelisin.
                .withClaim("a", roles)
                //SECRETKEY
                .sign(Algorithm.HMAC256(properties.getSecretKey()));
    }

    //extract token
    public DecodedJWT decode(String token){
        return JWT
                //burayi unutursan , cok fena olur.
                .require(Algorithm.HMAC256(properties.getSecretKey()))
                //buraya birden fazla sey istersen onlari da getirebilirsin, mesela rolu sadece "USER olanlar"
                // MESELA .withClaim("a", "USER")
                //MESELA .withClaim("uydurmabirfield","DEGERI")
                .build()
                .verify(token);
    }
}
