var Commands = function () {

};

Commands.CREATE_CHATROOM = "Create chatroom";

var CreateChatroom = function (chatroomName) {
    var toMessage = function () {
        return new Message(Commands.CREATE_CHATROOM, chatroomName);
    };

    return { toMessage: toMessage };
};




Commands.VALIDATE_SIGN_UP_FORM = "Validate sign up form";
Commands.SIGN_UP = "Sign up";