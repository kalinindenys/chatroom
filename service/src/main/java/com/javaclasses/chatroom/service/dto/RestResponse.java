package com.javaclasses.chatroom.service.dto;

public class RestResponse<ResponseEntity> {

    private final int code;
    private final ResponseEntity responseEntity;

    public RestResponse(int code, ResponseEntity responseEntity) {
        this.code = code;
        this.responseEntity = responseEntity;
    }

    public int getCode() {
        return code;
    }

    public ResponseEntity getResponseEntity() {
        return responseEntity;
    }

}
