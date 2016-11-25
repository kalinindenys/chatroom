var ChatRoomsDomain = function(commandBus, eventBus, server) {

    var _onCreateChatRoom = function(command) {
        var chatRoom = command.data;

        var resultingEvent;
        try {
            var allChatRooms = server.createChatRoom(chatRoom);
            resultingEvent = new ChatRoomListUpdatedEvent(allChatRooms);
        } catch (err) {
            var allChatRooms = server.readAllChatRooms();
            var resultingEvent = new TaskCannotBeCreatedEvent("Server error: " + err, allChatRooms);
        }

        eventBus.emit(resultingEvent.toMessage());
    }

    commandBus.subscribe(Commands.CREATE_TASK, _onCreateTask);
//FINISH
};