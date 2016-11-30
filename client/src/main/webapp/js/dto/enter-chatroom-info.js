var EnterChatroomInfo = function (nickname, chatroomId) {

    var getNickname = function () {
        return nickname;
    };

    var getChatroomId = function () {
        return chatroomId;
    };

    return {
        getNickname: getNickname,
        getChatroomId: getChatroomId
    };

};