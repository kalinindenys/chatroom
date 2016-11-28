var ChatRoomsDomain = function (commandBus, eventBus, eventHandler) {

    var _onCreateChatRoom = function (command) {
        var chatRoom = command.data;

        var resultingEvent;
        try {
            var allChatRooms = eventHandler.createChatRoom(chatRoom);
            resultingEvent = new ChatRoomListUpdatedEvent(allChatRooms);
        } catch (err) {
            var allChatRooms = eventHandler.readAllChatRooms();
            var resultingEvent = new TaskCannotBeCreatedEvent("Server error: " + err, allChatRooms);
        }

        eventBus.emit(resultingEvent.toMessage());
    }

    commandBus.subscribe(Commands.CREATE_CHATROOM, _onCreateChatRoom);
//todo: FINISH
};