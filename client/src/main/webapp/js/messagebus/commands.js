var Commands = {
    INIT_CHATROOM_LIST: "Init chatroom list",
    CREATE_CHATROOM: "Create chatroom",
    SHOW_JOIN_CHAT_POPUP: "Show join chat popup",
    VALIDATE_NICKNAME: "Validate nickname",
    ENTER_TO_CHATROOM: "Enter to chatroom",
    LEAVE_FROM_CHATROOM: "Leave from chatroom",
    POST_MESSAGE: "Post message"
};

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

// var HideJoinChatPopup = function () {
//     var toMessage = function () {
//         return new Message(Commands.HIDE_JOIN_CHAT_POPUP);
//     };
//
//     return { toMessage: toMessage };
// };

var ValidateNickname = function (nicknameValidationInfo) {
    var toMessage = function () {
        return new Message(Commands.VALIDATE_NICKNAME, nicknameValidationInfo);
    };

    return { toMessage: toMessage };
};

var EnterToChatroom = function (enterChatroomInfo) {
    var toMessage = function () {
        return new Message(Commands.ENTER_TO_CHATROOM, enterChatroomInfo);
    };

    return { toMessage: toMessage };
};

var LeaveFromChatroom = function (enterChatroomInfo) {
    var toMessage = function () {
        return new Message(Commands.LEAVE_FROM_CHATROOM, enterChatroomInfo);
    };

    return { toMessage: toMessage };
};

var PostMessage = function (messageDTO) {
    var toMessage = function () {
        return new Message(Commands.POST_MESSAGE, messageDTO);
    };

    return { toMessage: toMessage };
};