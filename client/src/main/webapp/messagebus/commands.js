var Commands = function () {

};

Commands.CREATE_CHATROOM = "Create chatroom";
Commands.ENTER_TO_CHATROOM = "Enter to chatroom";

var CreateChatroom = function (chatroomName) {
    var toMessage = function () {
        return new Message(Commands.CREATE_CHATROOM, chatroomName);
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




Commands.VALIDATE_SIGN_UP_FORM = "Validate sign up form";
Commands.SIGN_UP = "Sign up";