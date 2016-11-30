var MessageService = function (chatroomStorage, chatroomService, eventBus) {

    var postMessage = function (messageDTO) {
        var chatroom = chatroomService.findById(messageDTO.getChatroomId());

        chatroom.messages.push(messageDTO.getMessage());
        chatroomStorage.update(chatroom);

        eventBus.emitMessage(new ChatroomUpdated(chatroom).toMessage());
    };

    return {
        postMessage: postMessage
    }

};