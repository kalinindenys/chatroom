var ChatroomService = function (chatroomStorage) {

    if (!chatroomStorage) {
        throw new Error("Chatroom storage must be specified");
    }

    var findByName = function (chatroomName) {
        var chatrooms = chatroomStorage.findAll();

        return chatrooms.find(function (chatroom) {
            return chatroom.name === chatroomName;
        });
    };

    var findAll = function () {
        return DTOConverter.toChatroomDTOs(chatroomStorage.findAll());
    };

    var createChatroom = function (chatroomName) {
        if (typeof chatroomName !== "string") {
            throw new Error("Chatroom name must be presented as string");
        }

        chatroomName = chatroomName.trim();

        if (chatroomName.length < 3 || chatroomName.length > 50) {
            throw new Error("Chatroom name length is less than 3 or more than 50 symbols");
        }

        if (findByName(chatroomName)) {
            throw new Error("Chatroom with specified name exists");
        }

        chatroomStorage.save(new Chatroom(chatroomName, new Date()));

        return DTOConverter.toChatroomDTOs(chatroomStorage.findAll());
    };

    var join = function (joinChatroomInfo) {
        if (!isValidNickname(joinChatroomInfo)) {
            throw new Error("Specified nickname is not valid");
        }

        var chatroomId = joinChatroomInfo.getChatroomId();
        var nickname = joinChatroomInfo.getNickname().trim();
        var chatroom = chatroomStorage.findOne(chatroomId);

        chatroom.guests.push(nickname);

        var chatroomEntity = chatroomStorage.save(chatroom);
        return new ChatroomSession(nickname, DTOConverter.toChatroomDTO(chatroomEntity));
    };

    var leave = function (joinChatroomInfo) {
        var chatroom = chatroomStorage.findOne(joinChatroomInfo.getChatroomId());
        var nickname = joinChatroomInfo.getNickname();

        var guestIndexForRemove = chatroom.guests.indexOf(nickname);

        if (guestIndexForRemove === -1) {
            throw new Error("Trying to remove not existing guest");
        }
        chatroom.guests.splice(guestIndexForRemove, 1);

        chatroomStorage.save(chatroom);
        return DTOConverter.toChatroomDTO(chatroom);
    };

    var isValidNickname = function (nicknameValidationInfo) {
        if (typeof nicknameValidationInfo.getNickname() !== "string") {
            throw new Error("Nickname must be presented as string");
        }

        var nickname = nicknameValidationInfo.getNickname().trim();
        var chatroomId = nicknameValidationInfo.getChatroomId();

        var chatroom = chatroomStorage.findOne(chatroomId);

        if (!chatroom) {
            throw new Error("Chatroom with specified ID not exist");
        }

        if (nickname.length === 0) {
            return false;
        }

        for (var i = 0; i < chatroom.guests.length; i++) {
            if (chatroom.guests[i] === nickname) {
                return false;
            }
        }

        return true;
    };

    return {
        findAll: findAll,
        createChatroom: createChatroom,
        join: join,
        leave: leave,
        isValidNickname: isValidNickname
    }

};