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
            resultingEvent = new ChatRoomCannotBeCreatedEvent("Server error: " + err);
        }

        eventBus.emit(resultingEvent.toMessage());
    };

    var _onReadChatRoom = function () {
        var allChatRooms = chatRoomService.readAllChatRooms();
        var resultingEvent = new ChatRoomListUpdatedEvent(allChatRooms);

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
        resultingEvent = new UpdateUserNumEvent(chatRoom.name, chatRoom.users);
        eventBus.emit(resultingEvent.toMessage());
        resultingEvent = new OpenChatRoomEvent(chatRoom, nickname);
        eventBus.emit(resultingEvent.toMessage());
    };

    var _onLeaveChatRoom = function (command) {
        var chatRoomName = command.data.chatRoomName;
        var nickname = command.data.nickname;
        var resultingEvent;
        var chatRoom = chatRoomService.leaveChatRoom(chatRoomName, nickname);
        resultingEvent = new LeaveChatRoomEvent(chatRoom, nickname);
        eventBus.emit(resultingEvent.toMessage());
        resultingEvent = new UpdateUserNumEvent(chatRoom.name, chatRoom.users);
        eventBus.emit(resultingEvent.toMessage());
    };

    var _onPostMessage = function (command) {
        var chatRoomName = command.data.chatRoomName;
        var message = command.data.message;
        var resultingEvent;
        var chatRoom = chatRoomService.postMessage(chatRoomName, message);
        resultingEvent = new MessagePostedEvent(chatRoom);
        eventBus.emit(resultingEvent.toMessage());
    };

    _onReadChatRoom();

    commandBus.subscribe(Commands.CREATE_CHAT_ROOM, _onCreateChatRoom);
    commandBus.subscribe(Commands.VALIDATE_NICKNAME, _onJoinValidation);
    commandBus.subscribe(Commands.JOIN_CHAT_ROOM, _onJoinChatRoom);
    commandBus.subscribe(Commands.LEAVE_CHAT_ROOM, _onLeaveChatRoom);
    commandBus.subscribe(Commands.POST_MESSAGE, _onPostMessage);

};