var ChatroomStorage = function () {

    var chatroomsKey = "Chatrooms";
    var chatrooms = JSON.parse(localStorage.getItem(chatroomsKey));

    if (!chatrooms) {
        chatrooms = [];
    }

    var addItem = function (chatroom) {
        chatrooms.push(chatroom);
        localStorage.setItem(chatroomsKey, JSON.stringify(chatrooms));
    };

    var getChatrooms = function () {
        return chatrooms;
    };

    return {
        addItem: addItem,
        getChatrooms: getChatrooms
    }

};

