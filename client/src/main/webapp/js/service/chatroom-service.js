var ChatroomService = function (chatroomStorage, commandBus, eventBus) {

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

        return chatrooms.find(function (chatroom) {
            return chatroom.name === chatroomName;
        });
    };

    var findAll = function () {
        return chatroomStorage.getChatrooms();
    };

    var join = function (enterChatroomInfo) {
        var chatroomName = enterChatroomInfo.getChatroomName();
        var nickname = enterChatroomInfo.getNickname();

        var chatroom = findByName(chatroomName);

        chatroom.guests.push(nickname);
        chatroomStorage.updateItem(chatroom);

        eventBus.emitMessage(new ChatroomUpdated(chatroom).toMessage());
    };

    var leave = function (enterChatroomInfo) {
        var chatroomName = enterChatroomInfo.getChatroomName();
        var nickname = enterChatroomInfo.getNickname();

        var chatroom = findByName(chatroomName);

        var guestIndexForRemove = chatroom.guests.indexOf(nickname);

        if (guestIndexForRemove === -1) {
            throw new Error("Illegal state. Trying to remove not existing nickname");
        }
        chatroom.guests.splice(guestIndexForRemove, 1);
        chatroomStorage.updateItem(chatroom);

        eventBus.emitMessage(new ChatroomUpdated(chatroom).toMessage());
    };

    var validateNickname = function (nicknameValidationInfo) {
        var nickname = nicknameValidationInfo.getNickname();
        var chatroomName = nicknameValidationInfo.getChatroomName();

        var resultingEvent;
        var chatroom = findByName(chatroomName);

        if (!chatroom) {
            throw new Error("Illegal state");
        }

        if (nickname.length === 0) {
            resultingEvent = new NicknameValidationFail(nicknameValidationInfo);
        }

        for (i = 0; i < chatroom.guests.length; i++) {
            if (chatroom.guests[i] === nickname) {
                resultingEvent = new NicknameValidationFail(nicknameValidationInfo);
                break;
            }
        }

        if (!resultingEvent) {
            resultingEvent = new NicknameValidationSuccess(nicknameValidationInfo);
        }

        eventBus.emitMessage(resultingEvent.toMessage());
    };

    commandBus.subscribe(Commands.CREATE_CHATROOM, createChatroom);
    commandBus.subscribe(Commands.VALIDATE_NICKNAME, validateNickname);
    commandBus.subscribe(Commands.ENTER_TO_CHATROOM, join);
    commandBus.subscribe(Commands.LEAVE_FROM_CHATROOM, leave);

    return {
        findAll: findAll,
        findByName: findByName
    }

};