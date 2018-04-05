package com.ihub.sharedtravel.strest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ExceptionInfo handleAnyException(Exception exception) {
        ExceptionInfo exInfo = new ExceptionInfo(exception);
        //technicalLog.error("OapRestExceptionHandler: " + exception.getMessage() + System.lineSeparator() + errorInfo);
        return exInfo;
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ExceptionInfo handleAnyException(AccessDeniedException exception) {
        ExceptionInfo exInfo = new ExceptionInfo(exception);
        //technicalLog.error("OapRestExceptionHandler: " + exception.getMessage() + System.lineSeparator() + errorInfo);
        return exInfo;
    }
    
}
