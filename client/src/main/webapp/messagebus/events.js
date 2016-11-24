var Events = function () {

};

Events.CHATROOM_CREATION_FAILED = "Chatroom creation failed";
Events.CHATROOM_LIST_UPDATED = "Chatroom list updated";

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


Events.PAGE_LOADED = "Page loaded";
Events.SIGNED_UP = "Signed up";
Events.SIGN_UP_FAILED = "Sign up failed";
Events.LOGGED_IN = "Logged in";
Events.ENTER_CHAT_ROOM = "entered chat room";