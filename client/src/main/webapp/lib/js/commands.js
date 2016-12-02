var Commands = {
    CREATE_CHATROOM: "Create chat room",
    JOIN_VALIDATION: "Join validation"
};

var CreateChatRoomCommand = function (chatroomDto) {
    var _toMessage = createMessage(Commands.CREATE_CHATROOM, chatroomDto);
    return {"toMessage": _toMessage};
};

var JoinValidationCommand = function (commandData) {
    var _toMessage = createMessage(Commands.JOIN_VALIDATION, commandData);
    return {"toMessage": _toMessage};
};

function createMessage(type, data) {
    var _toMessage = function () {
        return new Message(type, data);
    };
    return _toMessage;
}

