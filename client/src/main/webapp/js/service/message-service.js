var MessageService = function (chatroomStorage, chatroomService) {

    var postMessage = function (messageDTO) {
        var chatroom = chatroomService.findById(messageDTO.getChatroomId());
        chatroom.getMessages().push(messageDTO);

        var chatroomEntity = DTOConverter.toChatroomEntity(chatroom);
        chatroomEntity = chatroomStorage.save(chatroomEntity);

        return DTOConverter.toChatroomDTO(chatroomEntity);
    };

    return {
        postMessage: postMessage
    }

};