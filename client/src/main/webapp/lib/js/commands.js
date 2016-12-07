var Commands = {
    CREATE_CHAT_ROOM: "Create chat room",
    VALIDATE_NICKNAME: "Validate nickname",
    JOIN_CHAT_ROOM: "Join chat room",
    LEAVE_CHAT_ROOM: "Leave chat room",
    POST_MESSAGE: "Post message"
};

var CreateChatRoomCommand = function (chatroomDto) {
    var _toMessage = createMessage(Commands.CREATE_CHAT_ROOM, chatroomDto);
    return {"toMessage": _toMessage};
};

var JoinValidationCommand = function (commandData) {
    var _toMessage = createMessage(Commands.VALIDATE_NICKNAME, commandData);
    return {"toMessage": _toMessage};
};

var JoinChatRoomCommand = function (commandData) {
    var _toMessage = createMessage(Commands.JOIN_CHAT_ROOM, commandData);
    return {"toMessage": _toMessage};
};

var LeaveChatRoomCommand = function (commandData) {
    var _toMessage = createMessage(Commands.LEAVE_CHAT_ROOM, commandData);
    return {"toMessage": _toMessage};
};

var PostMessageCommand = function (commandData) {
    var _toMessage = createMessage(Commands.POST_MESSAGE, commandData);
    return {"toMessage": _toMessage};
};

function createMessage(type, data) {
    return function () {
        return new Message(type, data);
    };
}

