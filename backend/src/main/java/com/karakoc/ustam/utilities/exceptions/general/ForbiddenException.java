package com.karakoc.ustam.utilities.exceptions.general;

import com.karakoc.ustam.utilities.exceptions.RestException;
import lombok.Getter;
import org.springframework.http.HttpStatus;


public class ForbiddenException extends RestException {
    @Getter
    private final HttpStatus httpStatus;

    public ForbiddenException(String msg) {
        super(msg, httpStatus);
        this.httpStatus = HttpStatus.FORBIDDEN;
    }

}

