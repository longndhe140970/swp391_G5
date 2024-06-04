package com.example.onlineshop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;


@RestControllerAdvice
public class GlobalException {

	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	public ErrorResponse handleNotFoundException(NotFoundException ex, WebRequest req) {
		return new ErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
	}

	@ExceptionHandler(BadRequestException.class)
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	public ExceptionResponse handleBadRequestException(BadRequestException ex, WebRequest req) {
		return new ExceptionResponse(101, ex.getMessage());
	}

	@ExceptionHandler(SaveDataException.class)
	public ExceptionResponse handleSaveDataException(SaveDataException ex, WebRequest req) {
		return new ExceptionResponse(111, ex.getMessage());
	}

	@ExceptionHandler(EmptyDataException.class)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ExceptionResponse handlerEmptyDataException(EmptyDataException ex, WebRequest req) {
		return new ExceptionResponse(HttpStatus.NO_CONTENT.value(), ex.getMessage());
	}

	@ExceptionHandler(AuthException.class)
    @ResponseStatus(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    public ErrorResponse handlerAuthException(AuthException ex, WebRequest req) {
        return new ErrorResponse(HttpStatus.NON_AUTHORITATIVE_INFORMATION, ex.getMessage());
    }
}
