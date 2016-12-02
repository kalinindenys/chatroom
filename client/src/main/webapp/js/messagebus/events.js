var Events = {
    CHATROOM_CREATION_FAILED: "Chatroom creation failed",
    CHATROOM_LIST_INITIALIZED: "Chatroom list initialized",
    CHATROOM_LIST_UPDATED: "Chatroom list updated",
    CHATROOM_UPDATED: "Chatroom updated",
    JOIN_CHATROOM_ACCESS_GRANTED: "Join chatroom access granted",
    JOIN_CHATROOM_ACCESS_DENIED: "Join chatroom acess denied",
    ATTEMPTED_TO_ENTER_CHAT: "Attempted to enter chat",
    JOINED_TO_CHAT: "Joined to chat",
    USER_LEFT_CHAT: "User left the chat",
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

var JoinChatroomAccessGranted = function (chatroom) {
    var toMessage = function () {
        return new Message(Events.JOIN_CHATROOM_ACCESS_GRANTED, chatroom);
    };

    return { toMessage: toMessage };
};

var JoinChatroomAccessDenied = function (reason) {
    var toMessage = function () {
        return new Message(Events.JOIN_CHATROOM_ACCESS_DENIED, reason);
    };

    return { toMessage: toMessage };
};

var AttemptedToEnterChat = function (chatroom) {

};

var JoinedToChat = function (joinChatroomInfo) {
    var toMessage = function () {
        return new Message(Events.JOINED_TO_CHAT, joinChatroomInfo);
    };

    return { toMessage: toMessage };
};

var UserLeftChat = function (joinChatroomInfo) {
    var toMessage = function () {
        return new Message(Events.USER_LEFT_CHAT, joinChatroomInfo);
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
