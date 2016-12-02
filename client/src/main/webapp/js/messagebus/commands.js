var Commands = {
    CREATE_CHATROOM: "Create chatroom",
    VALIDATE_NICKNAME: "Validate nickname",
    TRY_JOIN_TO_CHATROOM: "Try join to chatroom",
    JOIN_TO_CHATROOM: "Join to chatroom",
    LEAVE_FROM_CHATROOM: "Leave from chatroom",
    POST_MESSAGE: "Post message"
};

var CreateChatroom = function (chatroomName) {
    var toMessage = function () {
        return new Message(Commands.CREATE_CHATROOM, chatroomName);
    };

    return { toMessage: toMessage };
};

var ValidateNickname = function (nicknameValidationInfo) {
    var toMessage = function () {
        return new Message(Commands.VALIDATE_NICKNAME, nicknameValidationInfo);
    };

    return { toMessage: toMessage };
};

var TryJoinToChatroom = function (chatroom) {
    var toMessage = function () {
        return new Message(Commands.TRY_JOIN_TO_CHATROOM, chatroom);
    };

    return { toMessage: toMessage };
};

var JoinToChatroom = function (joinChatroomInfo) {
    var toMessage = function () {
        return new Message(Commands.JOIN_TO_CHATROOM, joinChatroomInfo);
    };

    return { toMessage: toMessage };
};

var LeaveFromChatroom = function (enterChatroomInfo) {
    var toMessage = function () {
        return new Message(Commands.LEAVE_FROM_CHATROOM, enterChatroomInfo);
    };

    return { toMessage: toMessage };
};

var PostMessage = function (messageDTO) {
    var toMessage = function () {
        return new Message(Commands.POST_MESSAGE, messageDTO);
    };

    return { toMessage: toMessage };
};