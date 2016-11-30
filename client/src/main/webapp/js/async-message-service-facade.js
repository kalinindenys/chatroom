var AsyncMessageServiceFacade = function (messageService, commandBus, eventBus) {

    var onPostMessage = function (message) {
        var updatedChatroom = messageService.postMessage(message);

        eventBus.emitMessage(new ChatroomUpdated(chatroom).toMessage());
    };

    commandBus.subscribe(Commands.POST_MESSAGE, onPostMessage);

};