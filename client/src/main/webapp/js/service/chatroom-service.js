var ChatroomService = function (chatroomStorage) {

    var findById = function (chatroomId) {
        var chatrooms = chatroomStorage.findAll();

        for (var i = 0; i < chatrooms.length; i++) {
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
        chatroomStorage.save(createdChatroom);

        return DTOConverter.toChatroomDTOs(chatroomStorage.findAll());
    };

    var join = function (joinChatroomInfo) {
        var chatroomId = joinChatroomInfo.getChatroomId();
        var nickname = joinChatroomInfo.getNickname().trim();

        var chatroom = findById(chatroomId);

        chatroom.getGuests().push(nickname);

        var chatroomEntity = chatroomStorage.findOne(chatroom.getId());
        chatroomEntity.guests = chatroom.getGuests();
        chatroomEntity.messages = chatroom.getMessages();
        chatroomStorage.save(chatroomEntity);

        return new ChatroomSession(nickname, chatroom);
    };

    var leave = function (chatroomSession) {
        var chatroom = chatroomSession.getChatroom();
        var nickname = chatroomSession.getNickname();

        var guestIndexForRemove = chatroom.getGuests().indexOf(nickname);

        if (guestIndexForRemove === -1) {
            throw new Error("Illegal state. Trying to remove not existing nickname");
        }
        chatroom.getGuests().splice(guestIndexForRemove, 1);

        var chatroomEntity = chatroomStorage.findOne(chatroom.getId());
        chatroomEntity.guests = chatroom.getGuests();
        chatroomEntity.messages = chatroom.getMessages();
        chatroomStorage.save(chatroomEntity);

        return chatroom;
    };

    var isValidNickname = function (nicknameValidationInfo) {
        var nickname = nicknameValidationInfo.getNickname().trim();
        var chatroomId = nicknameValidationInfo.getChatroomId();

        var resultingEvent;
        var chatroom = findById(chatroomId);

        if (!chatroom) {
            throw new Error("Illegal state");
        }

        if (nickname.length === 0) {
            return false;
        }

        for (var i = 0; i < chatroom.getGuests().length; i++) {
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