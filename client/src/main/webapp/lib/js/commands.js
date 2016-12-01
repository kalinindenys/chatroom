var Commands = {
    CREATE_CHATROOM: "Create chat room",
    READ_CHATROOMS: "Read chat room",
    GET_CHATROOM: "Get chat room"
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
var GetChatRoomCommand = function (ChatRoomName) {

    var _toMessage = function () {
        return new Message(Commands.GET_CHATROOM, ChatRoomName);
    };

    return {"toMessage": _toMessage};
};
