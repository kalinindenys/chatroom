var ChatroomService = function (chatroomStorage) {

    var findById = function (chatroomId) {
        var chatrooms = chatroomStorage.findAll();

        for (i = 0; i < chatrooms.length; i++) {
            if (chatrooms[i].id === chatroomId) {
                return DTOConverter.toChatroomDTO(chatrooms[i]);
            }
        }
    };

    var findByName = function (chatroomName) {
        var chatrooms = DTOConverter.toChatroomDTOs(chatroomStorage.findAll());

        return chatrooms.find(function (chatroom) {
            return chatroom.getName() === chatroomName;
        });
    };

    var findAll = function () {
        return DTOConverter.toChatroomDTOs(chatroomStorage.findAll());
    };

    var createChatroom = function (chatroomName) {
        chatroomName = chatroomName.trim();

        if (chatroomName.length < 3 || chatroomName.length > 50) {
            throw new Error("Chatroom name length is less than 3 or more than 50 symbols");
        }

        if (findByName(chatroomName)) {
            throw new Error("Chatroom with specified name exists");
        }

        var createdChatroom = new Chatroom(chatroomName, new Date());
        chatroomStorage.update(createdChatroom);

        return DTOConverter.toChatroomDTOs(chatroomStorage.findAll());
    };

    var join = function (enterChatroomInfo) {
        var chatroomId = enterChatroomInfo.getChatroomId();
        var nickname = enterChatroomInfo.getNickname();

        var chatroom = findById(chatroomId);

        chatroom.getGuests().push(nickname);
        chatroomStorage.update(DTOConverter.toChatroomEntity(chatroom));

        return chatroom;
    };

    var leave = function (enterChatroomInfo) {
        var chatroomId = enterChatroomInfo.getChatroomId();
        var nickname = enterChatroomInfo.getNickname();

        var chatroom = findById(chatroomId);

        var guestIndexForRemove = chatroom.getGuests().indexOf(nickname);

        if (guestIndexForRemove === -1) {
            throw new Error("Illegal state. Trying to remove not existing nickname");
        }
        chatroom.getGuests().splice(guestIndexForRemove, 1);
        chatroomStorage.update(DTOConverter.toChatroomEntity(chatroom));

        return chatroom;
    };

    var isValidNickname = function (nicknameValidationInfo) {
        var nickname = nicknameValidationInfo.getNickname();
        var chatroomId = nicknameValidationInfo.getChatroomId();

        var resultingEvent;
        var chatroom = findById(chatroomId);

        if (!chatroom) {
            throw new Error("Illegal state");
        }

        if (nickname.length === 0) {
            return false;
        }

        for (i = 0; i < chatroom.getGuests().length; i++) {
            if (chatroom.getGuests()[i] === nickname) {
                return false;
            }
        }

        return true;
    };

    return {
        findAll: findAll,
        findById: findById,
        findByName: findByName,
        createChatroom: createChatroom,
        join: join,
        leave: leave,
        isValidNickname: isValidNickname
    }

};