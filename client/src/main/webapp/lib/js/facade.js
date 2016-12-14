var ChatRoomsFacade = function (commandBus, eventBus) {
    var storage = new InMemoryStorage();
    var chatRoomService = new ChatRoomService(storage);

    var _onCreateChatRoom = function (command) {
        var chatRoomName = command.data;

        var resultingEvent;
        try {
            chatRoomService.createChatRoom(chatRoomName);
            var allChatRooms = chatRoomService.readAllChatRooms();
            resultingEvent = new ChatRoomListUpdatedEvent(allChatRooms);
        } catch (err) {
            resultingEvent = new ChatRoomCannotBeCreatedEvent(err);
        }

        eventBus.emit(resultingEvent.toMessage());
    };

    var _onReadChatRoom = function () {
        var allChatRooms = chatRoomService.readAllChatRooms();
        var resultingEvent = new ChatRoomListUpdatedEvent(allChatRooms);

        eventBus.emit(resultingEvent.toMessage());
    };

    var _onJoinValidation = function (command) {
        var chatRoomMember = command.data;
        var resultingEvent;
        try {
            var isValidated = chatRoomService.validateNickname(chatRoomMember);
            resultingEvent = new NicknameValidatedEvent(isValidated);
        } catch (err) {
            resultingEvent = new NicknameValidationFailedEvent(err);
        }


        eventBus.emit(resultingEvent.toMessage());
    };

    var _onJoinChatRoom = function (command) {
        var userDto = command.data;
        var resultingEvent;
        var data = chatRoomService.joinChatRoom(userDto);
        var chatRoomDto = data.chatRoomDto;
        userDto = data.userDto;
        resultingEvent = new UserNumberUpdatedEvent(chatRoomDto);
        eventBus.emit(resultingEvent.toMessage());
        var messages = [];
        for (var i = 0; i<chatRoomDto.messageIds.length; i++) {
            messages.push(storage.getItemById(Types.MESSAGE, chatRoomDto.messageIds[i]));
        }
        resultingEvent = new ChatRoomOpenedEvent(chatRoomDto, userDto, messages);
        eventBus.emit(resultingEvent.toMessage());
    };

    var _onLeaveChatRoom = function (command) {
        var userDto = command.data;
        var resultingEvent;
        var chatRoom = chatRoomService.leaveChatRoom(userDto);
        if (chatRoom) {
            resultingEvent = new ChatRoomLeftEvent(userDto);
            eventBus.emit(resultingEvent.toMessage());
            resultingEvent = new UserNumberUpdatedEvent(chatRoom);
            eventBus.emit(resultingEvent.toMessage());
        }
    };

    var _onPostMessage = function (command) {
        var messageDto = command.data;
        var resultingEvent;
        messageDto = chatRoomService.postMessage(messageDto);
        resultingEvent = new MessagePostedEvent(messageDto);
        eventBus.emit(resultingEvent.toMessage());
    };

    _onReadChatRoom();

    commandBus.subscribe(Commands.CREATE_CHAT_ROOM, _onCreateChatRoom);
    commandBus.subscribe(Commands.VALIDATE_NICKNAME, _onJoinValidation);
    commandBus.subscribe(Commands.JOIN_CHAT_ROOM, _onJoinChatRoom);
    commandBus.subscribe(Commands.LEAVE_CHAT_ROOM, _onLeaveChatRoom);
    commandBus.subscribe(Commands.POST_MESSAGE, _onPostMessage);

};