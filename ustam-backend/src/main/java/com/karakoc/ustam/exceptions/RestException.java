package com.karakoc.ustam.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@Data
@EqualsAndHashCode(callSuper = false)
public class RestException extends RuntimeException {

    private HttpStatus httpStatus;

    public RestException(String message) {
        super(message);
    }

    public RestException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
