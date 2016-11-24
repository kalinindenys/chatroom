var ChatroomService = function (commandBus, eventBus) {

    var chatroomStorage = new ChatroomStorage();

    var createChatroom = function (chatroomName) {
        var resultingEvent;
        chatroomName = chatroomName.trim();


        if (chatroomName.length < 3 || chatroomName.length > 50) {
            resultingEvent = new ChatroomCreationFailed("Length is less than 3 or more than 50 symbols");
            eventBus.emitMessage(resultingEvent.toMessage());
            throw new Error("Chatroom name length is less than 3 or more than 50 symbols");
        }

        if (findByName(chatroomName)) {
            resultingEvent = new ChatroomCreationFailed("Chatroom with specified name already exists");
            eventBus.emitMessage(resultingEvent.toMessage());
            throw new Error("Chatroom with specified name exists");
        }

        chatroomStorage.addItem(new Chatroom(chatroomName));
        resultingEvent = new ChatroomListUpdated(chatroomStorage.getChatrooms());
        eventBus.emitMessage(resultingEvent.toMessage());
    };

    var findByName = function (chatroomName) {
        var chatrooms = chatroomStorage.getChatrooms();

        var chatroom = chatrooms.find(function (chatroom) {
            return chatroom.name === chatroomName;
        });

        return chatroom;
    };

    var findAll = function () {
        return chatroomStorage.getChatrooms();
    };

    commandBus.subscribe(Commands.CREATE_CHATROOM, createChatroom);

};