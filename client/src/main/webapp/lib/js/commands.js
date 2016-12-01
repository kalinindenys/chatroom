var Commands = {
    CREATE_CHATROOM: "Create chatroom",
    READ_CHATROOMS: "Read chatrooms"
};

var CreateChatRoomCommand = function (chatroomDto) {

    var _toMessage = function () {
        return new Message(Commands.CREATE_CHATROOM, chatroomDto);
    };

    return {"toMessage": _toMessage};
};

var ReadChatRoomsCommand = function () {

    var _toMessage = function () {
        return new Message(Commands.READ_CHATROOMS);
    };

    return {"toMessage": _toMessage};
};
