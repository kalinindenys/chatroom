var Events = function () {

};

Events.CHATROOM_CREATION_FAILED = "Chatroom creation failed";
Events.CHATROOM_LIST_UPDATED = "Chatroom list updated";
Events.CHATROOM_UPDATED = "Chatroom updated";

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
