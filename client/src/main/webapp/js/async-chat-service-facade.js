var AsyncChatServiceFacade = function (chatroomService, commandBus, eventBus) {

    var onChatroomListInitialized = function () {
        var chatrooms = chatroomService.findAll();
        eventBus.emitMessage(new ChatroomListUpdated(chatrooms).toMessage());
    };

    commandBus.subscribe(Commands.CREATE_CHATROOM, chatroomService.createChatroom);
    commandBus.subscribe(Commands.VALIDATE_NICKNAME, chatroomService.validateNickname);
    commandBus.subscribe(Commands.ENTER_TO_CHATROOM, chatroomService.join);
    commandBus.subscribe(Commands.LEAVE_FROM_CHATROOM, chatroomService.leave);

    eventBus.subscribe(Events.CHATROOM_LIST_INITIALIZED, onChatroomListInitialized);

};