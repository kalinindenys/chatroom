var ChatroomService = function (commandBus, eventBus) {

    var createChatroom = function (chatroomName) {
        chatroomName = chatroomName.trim();
        alert(chatroomName.length);
    };

    commandBus.subscribe(Commands.CREATE_CHATROOM, createChatroom);

};