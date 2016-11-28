var EnterChatroomInfo = function (nickname, chatroomName) {

    if (nickname === undefined) {
        throw new Error("Nickname must be specified");
    }

    if (!chatroomName) {
        throw new Error("Chatroom name must be specified");
    }

    var getNickname = function () {
        return nickname;
    };

    var getChatroomName = function () {
        return chatroomName;
    };

    return {
        getNickname: getNickname,
        getChatroomName: getChatroomName
    };

};