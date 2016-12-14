var Events = {
    CHAT_ROOM_LIST_UPDATED: "Chat room List updated",
    CHAT_ROOM_CANNOT_BE_CREATED: "Chat room cannot be created",
    NICKNAME_VALIDATED: "Nickname validated",
    CHAT_ROOM_OPENED: "Chat room opened",
    USER_NUMBER_UPDATED: "UserDto number updated",
    CHAT_ROOM_LEFT: "Chat room left",
    MESSAGE_POSTED: "Message posted",
    NICKNAME_VALIDATION_FAILED: "Nickname validation failed"
};

var ChatRoomListUpdatedEvent = function (chatRoomList) {

    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_LIST_UPDATED, chatRoomList);
    };

    return {"toMessage": _toMessage};
};

var NicknameValidatedEvent = function (validationResult) {

    var _toMessage = function () {
        return new Message(Events.NICKNAME_VALIDATED, validationResult);
    };

    return {"toMessage": _toMessage};
};

var ChatRoomOpenedEvent = function (chatRoomDto, userDto, messages) {

    var data = {
        "chatRoomDto": chatRoomDto,
        "userDto": userDto,
        "messages": messages
    };
    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_OPENED, data);
    };

    return {"toMessage": _toMessage};
};

var UserNumberUpdatedEvent = function (chatRoomDto) {
    var _toMessage = function () {
        return new Message(Events.USER_NUMBER_UPDATED, chatRoomDto);
    };

    return {"toMessage": _toMessage};
};

var ChatRoomLeftEvent = function (userDto) {

    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_LEFT, userDto);
    };

    return {"toMessage": _toMessage};
};

var MessagePostedEvent = function (chatRoomDto, messageDto) {

    var data = {
        "chatRoomDto": chatRoomDto,
        "messageDto": messageDto,
        "username": username
    };

    var _toMessage = function () {
        return new Message(Events.MESSAGE_POSTED, data);
    };

    return {"toMessage": _toMessage};
};

var ChatRoomCannotBeCreatedEvent = function (reason) {

    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_CANNOT_BE_CREATED, reason);
    };

    return {"toMessage": _toMessage};


};

var NicknameValidationFailedEvent = function (reason) {

    var _toMessage = function () {
        return new Message(Events.NICKNAME_VALIDATION_FAILED, reason);
    };

    return {"toMessage": _toMessage};


};