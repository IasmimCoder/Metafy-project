package com.ifpb.Metafy.exceptions.handler;

import java.util.Date;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.ifpb.Metafy.exceptions.BadRequestException;
import com.ifpb.Metafy.exceptions.ExceptionResponse;
import com.ifpb.Metafy.exceptions.NotFoundException;
import com.ifpb.Metafy.exceptions.UnauthorizedException;

@ControllerAdvice
public class ExceptionsHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    protected ResponseEntity<ExceptionResponse> handleSecurity(BadRequestException e) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ExceptionResponse(new Date(), e.getMessage()));
    }

    @ExceptionHandler(NotFoundException.class)
    protected ResponseEntity<ExceptionResponse> handleSecurity(NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ExceptionResponse(new Date(), e.getMessage()));
    }

    @ExceptionHandler(UnauthorizedException.class)
    protected ResponseEntity<ExceptionResponse> handleSecurity(UnauthorizedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ExceptionResponse(new Date(), e.getMessage()));
    }
}
