var Commands = {
    CREATE_CHAT_ROOM: "Create chat room",
    VALIDATE_NICKNAME: "Validate nickname",
    JOIN_CHAT_ROOM: "Join chat room",
    LEAVE_CHAT_ROOM: "Leave chat room",
    POST_MESSAGE: "Post message"
};

var CreateChatRoomCommand = function (chatRoomName) {
    var _toMessage = createMessage(Commands.CREATE_CHAT_ROOM, chatRoomName);
    return {"toMessage": _toMessage};
};

var JoinValidationCommand = function (userDto) {
    var _toMessage = createMessage(Commands.VALIDATE_NICKNAME, userDto);
    return {"toMessage": _toMessage};
};

var JoinChatRoomCommand = function (userDto) {
    var _toMessage = createMessage(Commands.JOIN_CHAT_ROOM, userDto);
    return {"toMessage": _toMessage};
};

var LeaveChatRoomCommand = function (userDto) {
    var _toMessage = createMessage(Commands.LEAVE_CHAT_ROOM, userDto);
    return {"toMessage": _toMessage};
};

var PostMessageCommand = function (messageDto) {
    var _toMessage = createMessage(Commands.POST_MESSAGE, messageDto);
    return {"toMessage": _toMessage};
};

function createMessage(type, data) {
    return function () {
        return new Message(type, data);
    };
}

