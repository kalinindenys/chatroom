var ChatroomSession = function (nickname, chatroom) {

    var getNickname = function () {
        return nickname;
    };

    var getChatroom = function () {
        return chatroom;
    };

    return {
        getNickname: getNickname,
        getChatroom: getChatroom
    };

};