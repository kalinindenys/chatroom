var MessageService = function (chatroomStorage, chatroomService, commandBus, eventBus) {

    var postMessage = function (messageDTO) {
        var chatroom = chatroomService.findById(messageDTO.getChatroomId());

        chatroom.messages.push(messageDTO.getMessage());
        chatroomStorage.update(chatroom);

        eventBus.emitMessage(new ChatroomUpdated(chatroom).toMessage());
    };


    commandBus.subscribe(Commands.POST_MESSAGE, postMessage);

};