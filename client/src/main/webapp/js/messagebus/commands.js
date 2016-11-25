var Commands = function () {

};

Commands.CREATE_CHATROOM = "Create chatroom";
Commands.INIT_CHATROOM_LIST = "Init chatroom list";
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