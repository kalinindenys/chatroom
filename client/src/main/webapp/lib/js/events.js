var Events = {
    CHAT_ROOM_LIST_UPDATED: "Chat room List updated",
    CHAT_ROOM_CANNOT_BE_CREATED: "Chat room cannot be created",
    JOIN_VALIDATED: "Join validated",
    ENTER_CHAT_ROOM: "Enter chat room"
};

var ChatRoomListUpdatedEvent = function (chatRoomList) {

    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_LIST_UPDATED, chatRoomList);
    };

    return {"toMessage": _toMessage};
};

var JoinValidatedEvent = function (validationResult) {

    var _toMessage = function () {
        return new Message(Events.JOIN_VALIDATED, validationResult);
    };

    return {"toMessage": _toMessage};
};

var EnterChatRoomEvent = function (chatRoomDto, username) {

    var data = {
        "chatRoom": chatRoomDto,
        "username": username
    };
    var _toMessage = function () {
        return new Message(Events.ENTER_CHAT_ROOM, data);
    };

    return {"toMessage": _toMessage};
};


var ChatRoomCannotBeCreatedEvent = function (reason, chatRoomList) {

    var _toMessage = function () {

        var data = {
            "reason": reason,
            "chatRoomList": chatRoomList
        };

        return new Message(Events.CHAT_ROOM_CANNOT_BE_CREATED, data);
    };

    return {"toMessage": _toMessage};


}