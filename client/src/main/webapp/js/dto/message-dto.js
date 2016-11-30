var ChatroomMessageDTO = function (chatroomId, authorNickname, message, postTime) {

    var getChatroomId = function () {
        return chatroomId;
    };

    var getAuthorNickname = function () {
        return authorNickname;
    };

    var getMessage = function () {
        return message
    };

    var getPostTime = function () {
        return postTime;
    };

    return {
        getChatroomId: getChatroomId,
        getAuthorNickname: getAuthorNickname,
        getMessage: getMessage,
        getPostTime: getPostTime
    };

};