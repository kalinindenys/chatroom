var EnterChatroomInfo = function (nickname, chatroomName) {

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