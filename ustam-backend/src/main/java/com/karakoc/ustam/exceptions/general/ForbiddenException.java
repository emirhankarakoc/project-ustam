package com.karakoc.ustam.exceptions.general;

import com.karakoc.ustam.exceptions.RestException;
import lombok.Getter;
import org.springframework.http.HttpStatus;


public class ForbiddenException extends RestException {
    @Getter
    private final HttpStatus httpStatus;

    public ForbiddenException(String msg) {
        super(msg);
        this.httpStatus = HttpStatus.FORBIDDEN;
    }

}

