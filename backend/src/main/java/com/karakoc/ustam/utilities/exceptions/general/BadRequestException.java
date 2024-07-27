package com.karakoc.ustam.utilities.exceptions.general;

import com.karakoc.ustam.utilities.exceptions.RestException;
import lombok.Getter;
import org.springframework.http.HttpStatus;

public class BadRequestException extends RestException {
    @Getter
    private final HttpStatus httpStatus;

    public BadRequestException(String msg) {
        super(msg, httpStatus);
        this.httpStatus = HttpStatus.BAD_REQUEST;
    }


}
