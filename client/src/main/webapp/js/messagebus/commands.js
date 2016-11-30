var Commands = {
    CREATE_CHATROOM: "Create chatroom",
    VALIDATE_NICKNAME: "Validate nickname",
    ENTER_TO_CHATROOM: "Enter to chatroom",
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

var EnterToChatroom = function (enterChatroomInfo) {
    var toMessage = function () {
        return new Message(Commands.ENTER_TO_CHATROOM, enterChatroomInfo);
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