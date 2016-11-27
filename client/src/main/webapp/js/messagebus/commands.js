var Commands = function () {

};

Commands.INIT_CHATROOM_LIST = "Init chatroom list";
Commands.CREATE_CHATROOM = "Create chatroom";
Commands.SHOW_JOIN_CHAT_POPUP = "Show join chat popup";
Commands.HIDE_JOIN_CHAT_POPUP = "Hide join chat popup";
Commands.ENTER_TO_CHATROOM = "Enter to chatroom";

var CreateChatroom = function (chatroomName) {
    var toMessage = function () {
        return new Message(Commands.CREATE_CHATROOM, chatroomName);
    };

    return { toMessage: toMessage };
};

var InitChatroomList = function (chatrooms) {
    var toMessage = function () {
        return new Message(Commands.INIT_CHATROOM_LIST, chatrooms);
    };

    return { toMessage: toMessage };
};

var ShowJoinChatPopup = function (chatroom) {
    var toMessage = function () {
        return new Message(Commands.SHOW_JOIN_CHAT_POPUP, chatroom);
    };

    return { toMessage: toMessage };
};

var HideJoinChatPopup = function () {
    var toMessage = function () {
        return new Message(Commands.HIDE_JOIN_CHAT_POPUP);
    };

    return { toMessage: toMessage };
};

var EnterToChatroom = function (nickname, chatroom) {
    var toMessage = function () {
        return new Message(
            Commands.ENTER_TO_CHATROOM,
            {
                nickname: nickname,
                chatroom: chatroom
            }
        )
    };

    return { toMessage: toMessage };
};