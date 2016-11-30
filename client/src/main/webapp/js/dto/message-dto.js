var MessageDTO = function (chatroomId, message) {

    var getChatroomId = function () {
        return chatroomId;
    };

    var getMessage = function () {
        return message
    };

    return {
        getChatroomId: getChatroomId,
        getMessage: getMessage
    };

};