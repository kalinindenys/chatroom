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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RestResponse<?> that = (RestResponse<?>) o;

        if (code != that.code) return false;
        return responseEntity.equals(that.responseEntity);

    }

    @Override
    public int hashCode() {
        int result = code;
        result = 31 * result + responseEntity.hashCode();
        return result;
    }
}
