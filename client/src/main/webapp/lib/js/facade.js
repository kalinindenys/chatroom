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

    var _onJoinValidation = function (command) {
        var chatRoomName = command.data.chatRoomName;
        var nickname = command.data.nickname;
        var resultingEvent;
        var isValidated = chatRoomService.validateNickname(chatRoomName, nickname);
        resultingEvent = new JoinValidatedEvent(isValidated);

        eventBus.emit(resultingEvent.toMessage());
    };

    var _onJoinChatRoom = function (command) {
        var chatRoomName = command.data.chatRoomName;
        var nickname = command.data.nickname;
        var resultingEvent;
        var chatRoom = chatRoomService.joinChatRoom(chatRoomName, nickname);
        resultingEvent = new EnterChatRoomEvent(chatRoom, nickname);

        eventBus.emit(resultingEvent.toMessage());
    };

    _onReadChatRoom();

    commandBus.subscribe(Commands.CREATE_CHAT_ROOM, _onCreateChatRoom);
    commandBus.subscribe(Commands.JOIN_VALIDATION, _onJoinValidation);
    commandBus.subscribe(Commands.JOIN_CHAT_ROOM, _onJoinChatRoom);

};