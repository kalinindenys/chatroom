var ChatRoomsFacade = function (commandBus, eventBus) {
    var chatRoomService = new ChatRoomService();
    var _onCreateChatRoom = function (command) {
        var chatRoom = command.data;

        var resultingEvent;
        try {
            chatRoomService.createChatRoom(chatRoom);
            var allChatRooms = chatRoomService.readAllChatRooms();
            resultingEvent = new ChatRoomListUpdatedEvent(allChatRooms);
        } catch (err) {
            var allChatRooms = chatRoomService.readAllChatRooms();
            var resultingEvent = new ChatRoomCannotBeCreatedEvent("Server error: " + err, allChatRooms);
        }

        eventBus.emit(resultingEvent.toMessage());
    };

    var _onReadChatRoom = function () {
        var resultingEvent;
        var allChatRooms;
        try {
            allChatRooms = chatRoomService.readAllChatRooms();
            resultingEvent = new ChatRoomListUpdatedEvent(allChatRooms);
        } catch (err) {
            var resultingEvent = new TaskCannotBeCreatedEvent("Server error: " + err, allChatRooms);
        }

        eventBus.emit(resultingEvent.toMessage());
    };

    var _onGetChatRoom = function (command) {
        var resultingEvent;
        var chatRoom = chatRoomService.getChatRoom(command.data);
        resultingEvent = new OpenJoinDialogEvent(chatRoom);

        eventBus.emit(resultingEvent.toMessage());
    };

    _onReadChatRoom();

    commandBus.subscribe(Commands.CREATE_CHATROOM, _onCreateChatRoom);
    commandBus.subscribe(Commands.GET_CHATROOM, _onGetChatRoom);

};