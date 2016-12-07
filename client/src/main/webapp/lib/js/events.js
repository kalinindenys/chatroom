var Events = {
    CHAT_ROOM_LIST_UPDATED: "Chat room List updated",
    CHAT_ROOM_CANNOT_BE_CREATED: "Chat room cannot be created",
    NICKNAME_VALIDATED: "Nickname validated",
    CHAT_ROOM_OPENED: "Chat room opened",
    USER_NUMBER_UPDATED: "User number updated",
    CHAT_ROOM_LEFT: "Chat room left",
    MESSAGE_POSTED: "Message posted"
};

var ChatRoomListUpdatedEvent = function (chatRoomList) {

    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_LIST_UPDATED, chatRoomList);
    };

    return {"toMessage": _toMessage};
};

var JoinValidatedEvent = function (validationResult) {

    var _toMessage = function () {
        return new Message(Events.NICKNAME_VALIDATED, validationResult);
    };

    return {"toMessage": _toMessage};
};

var OpenChatRoomEvent = function (chatRoomDto, username) {

    var data = {
        "chatRoom": chatRoomDto,
        "username": username
    };
    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_OPENED, data);
    };

    return {"toMessage": _toMessage};
};

var UpdateUserNumEvent = function (chatRoomName, users) {

    var data = {
        "chatRoomName": chatRoomName,
        "users": users
    };

    var _toMessage = function () {
        return new Message(Events.USER_NUMBER_UPDATED, data);
    };

    return {"toMessage": _toMessage};
};

var LeaveChatRoomEvent = function (chatRoomDto, username) {

    var data = {
        "chatRoom": chatRoomDto,
        "username": username
    };
    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_LEFT, data);
    };

    return {"toMessage": _toMessage};
};

var MessagePostedEvent = function (chatRoomDto) {

    var data = {
        "chatRoom": chatRoomDto
    };
    var _toMessage = function () {
        return new Message(Events.MESSAGE_POSTED, data);
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