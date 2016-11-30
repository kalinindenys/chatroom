var MessageService = function (chatroomStorage, chatroomService) {

    var postMessage = function (messageDTO) {
        var chatroom = chatroomService.findById(messageDTO.getChatroomId());

        chatroom.getMessages().push(DTOConverter.toMessageEntity(messageDTO));
        chatroomStorage.update(DTOConverter.toChatroomEntity(chatroom));

        return chatroom;
    };

    return {
        postMessage: postMessage
    }

};