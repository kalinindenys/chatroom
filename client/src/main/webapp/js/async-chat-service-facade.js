var AsyncChatServiceFacade = function (chatroomService, commandBus, eventBus) {

    var onChatroomListInitialized = function () {
        var chatrooms = chatroomService.findAll();

        eventBus.emitMessage(new ChatroomListUpdated(chatrooms).toMessage());
    };

    var onCreateChatroom = function (chatroomName) {
        var resultingEvent;

        try {
            var chatrooms = chatroomService.createChatroom(chatroomName);
            resultingEvent = new ChatroomListUpdated(chatrooms);
        } catch (err) {
            resultingEvent = new ChatroomCreationFailed(err.message);
        }

        eventBus.emitMessage(resultingEvent.toMessage());
    };

    var onValidateNickname = function (nicknameValidationInfo) {
        var resultingEvent;

        if (chatroomService.isValidNickname(nicknameValidationInfo)) {
            resultingEvent = new NicknameValidationSuccess();
        } else {
            resultingEvent = new NicknameValidationFail();
        }

        eventBus.emitMessage(resultingEvent.toMessage());
    };

    var onJoin = function (joinChatroomInfo) {
        var updatedChatroom = chatroomService.join(joinChatroomInfo);

        eventBus.emitMessage(new JoinedToChat(joinChatroomInfo).toMessage());
        eventBus.emitMessage(new ChatroomUpdated(updatedChatroom).toMessage());
    };

    var onLeave = function (joinChatroomInfo) {
        var updatedChatroom = chatroomService.leave(joinChatroomInfo);

        eventBus.emitMessage(new UserLeftChat(joinChatroomInfo).toMessage());
        eventBus.emitMessage(new ChatroomUpdated(updatedChatroom).toMessage());
    };

    commandBus.subscribe(Commands.CREATE_CHATROOM, onCreateChatroom);
    commandBus.subscribe(Commands.VALIDATE_NICKNAME, onValidateNickname);
    commandBus.subscribe(Commands.ENTER_TO_CHATROOM, onJoin);
    commandBus.subscribe(Commands.LEAVE_FROM_CHATROOM, onLeave);

    eventBus.subscribe(Events.CHATROOM_LIST_INITIALIZED, onChatroomListInitialized);

};