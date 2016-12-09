var ChatRoomsFacade = function (commandBus, eventBus) {
    var storage = new ChatRoomStorage();
    var chatRoomService = new ChatRoomService(storage);

    var _onCreateChatRoom = function (command) {
        var chatRoomName = command.data;

        var resultingEvent;
        try {
            chatRoomService.createChatRoom(chatRoomName);
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
        var chatRoomMember = command.data;
        var resultingEvent;
        try {
            var isValidated = chatRoomService.validateNickname(chatRoomMember);
            resultingEvent = new NicknameValidatedEvent(isValidated);
        }catch (err){
            resultingEvent = new NicknameFailedValidationEvent("Server error: " + err);
        }


        eventBus.emit(resultingEvent.toMessage());
    };

    var _onJoinChatRoom = function (command) {
        var chatRoomMember = command.data;
        var resultingEvent;
        var chatRoom = chatRoomService.joinChatRoom(chatRoomMember);
        resultingEvent = new UserNumberUpdatedEvent(chatRoom.name, chatRoom.users);
        eventBus.emit(resultingEvent.toMessage());
        var nickname = chatRoomMember.user;
        resultingEvent = new ChatRoomOpenedEvent(chatRoom, nickname);
        eventBus.emit(resultingEvent.toMessage());
    };

    var _onLeaveChatRoom = function (command) {
        var chatRoomMember = command.data;
        var resultingEvent;
        var chatRoom = chatRoomService.leaveChatRoom(chatRoomMember);
        var nickname = chatRoomMember.user;
        resultingEvent = new ChatRoomLeftEvent(new ChatRoomMember(chatRoom.name, nickname));
        eventBus.emit(resultingEvent.toMessage());
        resultingEvent = new UserNumberUpdatedEvent(chatRoom.name, chatRoom.users);
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