var ChatroomStorage = function () {

    var update = function (chatroom) {
        localStorage.setItem("chatroom" + chatroom.id, JSON.stringify(chatroom));
    };

    var read = function (chatroomId) {
        return JSON.parse(localStorage.getItem("chatroom" + chatroomId), dateReviver);
    };


    var chatroomsKey = "Chatrooms";
    var chatrooms = JSON.parse(localStorage.getItem(chatroomsKey), dateReviver);

    if (!chatrooms) {
        chatrooms = [];
    }

    var addItem = function (chatroom) {
        chatrooms.push(chatroom);
        localStorage.setItem(chatroomsKey, JSON.stringify(chatrooms));
    };

    var updateItem = function (chatroom) {
        for (i = 0; i < chatrooms.length; i++) {
            if (chatrooms[i].name === chatroom.name) {
                chatrooms[i] = chatroom;
                localStorage.setItem(chatroomsKey, JSON.stringify(chatrooms));
                return;
            }
        }

        throw new Error("Cannot update chatroom. Specified name not found");
    };

    var getChatrooms = function () {
        return chatrooms;
    };

    function dateReviver(key, value) {
        if (key === "creationDate" || key === "postTime") {
            return new Date(value);
        }

        return value;
    }

    return {
        update: update,
        read: read,
        addItem: addItem,
        updateItem: updateItem,
        getChatrooms: getChatrooms
    };

};

