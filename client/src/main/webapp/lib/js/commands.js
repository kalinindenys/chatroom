var Commands = {
    CREATE_CHAT_ROOM: "Create chat room",
    JOIN_VALIDATION: "Join validation",
    JOIN_CHAT_ROOM: "Join chat room",
    LEAVE_CHAT_ROOM: "Leave chat room"
};

var CreateChatRoomCommand = function (chatroomDto) {
    var _toMessage = createMessage(Commands.CREATE_CHAT_ROOM, chatroomDto);
    return {"toMessage": _toMessage};
};

var JoinValidationCommand = function (commandData) {
    var _toMessage = createMessage(Commands.JOIN_VALIDATION, commandData);
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

function createMessage(type, data) {
    var _toMessage = function () {
        return new Message(type, data);
    };
    return _toMessage;
}

