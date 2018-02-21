package com.ihub.sharedtravel.strest.exception;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.UUID;

public class ExceptionInfo {

    public String message;
    public Integer errorCode;
    public String uniqueCode;
    public String errorClass;
    public String stackTrace;

    public ExceptionInfo(Throwable throwable) {
        throwable.printStackTrace();
        setMessage("Internal Server Error");
        setUniqueCode(randomErrorCodeGenerator());
        setErrorClass(throwable.getClass().getName());
        setStackTrace(throwable);
    }

    private String randomErrorCodeGenerator() {
        return UUID.randomUUID().toString();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    public String getUniqueCode() {
        return uniqueCode;
    }

    public void setUniqueCode(String uniqueCode) {
        this.uniqueCode = uniqueCode;
    }

    public String getErrorClass() {
        return errorClass;
    }

    public void setErrorClass(String errorClass) {
        this.errorClass = errorClass;
    }

    public String getStackTrace() {
        return stackTrace;
    }

    public void setStackTrace(String stackTrace) {
        this.stackTrace = stackTrace;
    }

    public void setStackTrace(Throwable throwable) {
        StringWriter errors = new StringWriter();
        throwable.printStackTrace(new PrintWriter(errors));
        this.stackTrace = errors.toString();
    }
}
