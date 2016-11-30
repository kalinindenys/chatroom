var Events = {
    CHATROOM_CREATION_FAILED: "Chatroom creation failed",
    CHATROOM_LIST_INITIALIZED: "Chatroom list initialized",
    CHATROOM_LIST_UPDATED: "Chatroom list updated",
    CHATROOM_UPDATED: "Chatroom updated",
    ATTEMPTED_TO_ENTER_CHAT: "Attempted to enter chat",
    ENTERED_TO_CHAT: "Entered to chat",
    LEFT_CHAT: "Left the chat",
    NICKNAME_VALIDATION_SUCCESS: "Nickname validation success",
    NICKNAME_VALIDATION_FAIL: "Nickname validation fail"
};

var ChatroomCreationFailed = function (reason) {
    var toMessage = function () {
        return new Message(Events.CHATROOM_CREATION_FAILED, reason);
    };

    return { toMessage: toMessage };
};

var ChatroomListInitialized = function () {
    var toMessage = function () {
        return new Message(Events.CHATROOM_LIST_INITIALIZED, null);
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
        return new Message(Events.CHATROOM_UPDATED, chatroom);
    };

    return { toMessage: toMessage };
};

var AttemptedToEnterChat = function (chatroom) {
    var toMessage = function () {
        return new Message(Events.ATTEMPTED_TO_ENTER_CHAT, chatroom);
    };

    return { toMessage: toMessage };
};

var EnteredToChat = function (enterChatroomInfo) {
    var toMessage = function () {
        return new Message(Events.ENTERED_TO_CHAT, enterChatroomInfo);
    };

    return { toMessage: toMessage };
};

var LeftChat = function (enterChatroomInfo) {
    var toMessage = function () {
        return new Message(Events.LEFT_CHAT, enterChatroomInfo);
    };

    return { toMessage: toMessage };
};

var NicknameValidationSuccess = function () {
    var toMessage = function () {
        return new Message(Events.NICKNAME_VALIDATION_SUCCESS, null);
    };

    return { toMessage: toMessage };
};

var NicknameValidationFail = function () {
    var toMessage = function () {
        return new Message(Events.NICKNAME_VALIDATION_FAIL, null);
    };

    return { toMessage: toMessage };
};
