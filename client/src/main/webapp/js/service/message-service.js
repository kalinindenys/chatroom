var MessageService = function (chatroomStorage) {

    var postMessage = function (messageDTO) {
        var chatroom = chatroomStorage.findOne(messageDTO.getChatroomId());
        chatroom.messages.push(DTOConverter.toMessageEntity(messageDTO));

        chatroom = chatroomStorage.save(chatroom);

        return DTOConverter.toChatroomDTO(chatroom);
    };

    return {
        postMessage: postMessage
    }

};