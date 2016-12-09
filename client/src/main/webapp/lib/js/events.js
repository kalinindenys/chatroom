var Events = {
    CHAT_ROOM_LIST_UPDATED: "Chat room List updated",
    CHAT_ROOM_CANNOT_BE_CREATED: "Chat room cannot be created",
    NICKNAME_VALIDATED: "Nickname validated",
    CHAT_ROOM_OPENED: "Chat room opened",
    USER_NUMBER_UPDATED: "User number updated",
    CHAT_ROOM_LEFT: "Chat room left",
    MESSAGE_POSTED: "Message posted",
    NICKNAME_FAILED_VALIDATION: "Nickname failed validation"
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

var ChatRoomOpenedEvent = function (chatRoomDto, username) {

    var data = {
        "chatRoom": chatRoomDto,
        "username": username
    };
    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_OPENED, data);
    };

    return {"toMessage": _toMessage};
};

var UserNumberUpdatedEvent = function (chatRoomName, users) {

    var data = {
        "chatRoomName": chatRoomName,
        "users": users
    };

    var _toMessage = function () {
        return new Message(Events.USER_NUMBER_UPDATED, data);
    };

    return {"toMessage": _toMessage};
};

var ChatRoomLeftEvent = function (chatRoomMember) {

    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_LEFT, chatRoomMember);
    };

    return {"toMessage": _toMessage};
};

var MessagePostedEvent = function (chatRoomDto) {

    var _toMessage = function () {
        return new Message(Events.MESSAGE_POSTED, chatRoomDto);
    };

    return {"toMessage": _toMessage};
};

var ChatRoomCannotBeCreatedEvent = function (reason) {

    var _toMessage = function () {
        return new Message(Events.CHAT_ROOM_CANNOT_BE_CREATED, reason);
    };

    return {"toMessage": _toMessage};


};

var NicknameFailedValidationEvent = function (reason) {

    var _toMessage = function () {
        return new Message(Events.NICKNAME_FAILED_VALIDATION, reason);
    };

    return {"toMessage": _toMessage};


};