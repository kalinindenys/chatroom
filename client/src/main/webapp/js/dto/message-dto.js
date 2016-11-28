var MessageDTO = function (chatroomName, message) {

    var getChatroomName = function () {
        return chatroomName;
    };

    var getMessage = function () {
        return message
    };

    return {
        getChatroomName: getChatroomName,
        getMessage: getMessage
    };

};