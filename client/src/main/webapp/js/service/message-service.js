var MessageService = function (chatroomStorage, chatroomService, commandBus, eventBus) {

    var postMessage = function (messageDTO) {
        var chatroom = chatroomService.findByName(messageDTO.getChatroomName());

        chatroom.messages.push(messageDTO.getMessage());
        chatroomStorage.updateItem(chatroom);

        eventBus.emitMessage(new ChatroomUpdated(chatroom).toMessage());
    };


    commandBus.subscribe(Commands.POST_MESSAGE, postMessage);

};