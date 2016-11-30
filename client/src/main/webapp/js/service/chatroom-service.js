var ChatroomService = function (chatroomStorage, eventBus) {

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

        chatroomStorage.add(new Chatroom(chatroomName, new Date()));
        resultingEvent = new ChatroomListUpdated(chatroomStorage.findAll());
        eventBus.emitMessage(resultingEvent.toMessage());
    };

    var findById = function (chatroomId) {
        var chatrooms = chatroomStorage.findAll();

        for (i = 0; i < chatrooms.length; i++) {
            if (chatrooms[i].id === chatroomId) {
                return chatrooms[i];
            }
        }
    };

    var findByName = function (chatroomName) {
        var chatrooms = chatroomStorage.findAll();

        return chatrooms.find(function (chatroom) {
            return chatroom.name === chatroomName;
        });
    };

    var findAll = function () {
        return chatroomStorage.findAll();
    };

    var join = function (enterChatroomInfo) {
        var chatroomId = enterChatroomInfo.getChatroomId();
        var nickname = enterChatroomInfo.getNickname();

        var chatroom = findById(chatroomId);

        chatroom.guests.push(nickname);
        chatroomStorage.update(chatroom);

        eventBus.emitMessage(new EnteredToChat(enterChatroomInfo).toMessage());
        eventBus.emitMessage(new ChatroomUpdated(chatroom).toMessage());
    };

    var leave = function (enterChatroomInfo) {
        var chatroomId = enterChatroomInfo.getChatroomId();
        var nickname = enterChatroomInfo.getNickname();

        var chatroom = findById(chatroomId);

        var guestIndexForRemove = chatroom.guests.indexOf(nickname);

        if (guestIndexForRemove === -1) {
            throw new Error("Illegal state. Trying to remove not existing nickname");
        }
        chatroom.guests.splice(guestIndexForRemove, 1);
        chatroomStorage.update(chatroom);

        eventBus.emitMessage(new LeftChat(enterChatroomInfo).toMessage());
        eventBus.emitMessage(new ChatroomUpdated(chatroom).toMessage());
    };

    var validateNickname = function (nicknameValidationInfo) {
        var nickname = nicknameValidationInfo.getNickname();
        var chatroomId = nicknameValidationInfo.getChatroomId();

        var resultingEvent;
        var chatroom = findById(chatroomId);

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

    return {
        findAll: findAll,
        findById: findById,
        findByName: findByName,
        createChatroom: createChatroom,
        join: join,
        leave: leave,
        validateNickname: validateNickname
    }

};