var Commands = {
    CREATE_CHATROOM: "Create chat room",
    GET_CHATROOM: "Get chat room"
};

var CreateChatRoomCommand = function (chatroomDto) {
    var _toMessage = createMessage(Commands.CREATE_CHATROOM, chatroomDto);
    return {"toMessage": _toMessage};
};

var GetChatRoomCommand = function (chatRoomName) {
    var _toMessage = createMessage(Commands.GET_CHATROOM, chatRoomName);
    return {"toMessage": _toMessage};
};

function createMessage(type, data) {
    var _toMessage = function () {
        return new Message(type, data);
    };
    return _toMessage;
}

