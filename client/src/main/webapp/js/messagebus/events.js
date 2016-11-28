var Events = function () {

};

Events.CHATROOM_CREATION_FAILED = "Chatroom creation failed";
Events.CHATROOM_LIST_UPDATED = "Chatroom list updated";
Events.CHATROOM_UPDATED = "Chatroom updated";
Events.NICKNAME_VALIDATION_SUCCESS = "Nickname validation success";
Events.NICKNAME_VALIDATION_FAIL = "Nickname validation fail";

var ChatroomCreationFailed = function (reason) {
    var toMessage = function () {
        return new Message(Events.CHATROOM_CREATION_FAILED, reason);
    };

    return { toMessage: toMessage };
};

var ChatroomListUpdated = function (chatrooms) {
    var toMessage = function () {
        return new Message(Events.CHATROOM_LIST_UPDATED, chatrooms);
    };

    return { toMessage: toMessage };
};

var ChatroomUpdated = function (chatroom) {
    var toMessage = function () {
        return new Message(Events.CHATROOM_LIST_UPDATED, chatroom);
    };

    return { toMessage: toMessage };
};

var NicknameValidationSuccess = function (validationInfo) {
    var toMessage = function () {
        return new Message(Events.NICKNAME_VALIDATION_SUCCESS, validationInfo);
    };

    return { toMessage: toMessage };
};

var NicknameValidationFail = function (validationInfo) {
    var toMessage = function () {
        return new Message(Events.NICKNAME_VALIDATION_FAIL, validationInfo);
    };

    return { toMessage: toMessage };
};
