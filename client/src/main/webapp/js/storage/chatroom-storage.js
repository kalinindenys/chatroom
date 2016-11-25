var ChatroomStorage = function () {

    var chatroomsKey = "Chatrooms";
    var chatrooms = JSON.parse(localStorage.getItem(chatroomsKey), dateTimeReviver);

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
                chatroom[i] = chatroom;
                localStorage.setItem(chatroomsKey, JSON.stringify(chatrooms));
                return;
            }
        }

        throw new Error("Cannot update chatroom. Specified name not found");
    };

    var getChatrooms = function () {
        return chatrooms;
    };

    function dateTimeReviver(key, value) {
        if (key === "creationDate") {
            return new Date(value);
        }

        return value;
    }

    return {
        addItem: addItem,
        updateItem: updateItem,
        getChatrooms: getChatrooms
    };

};

