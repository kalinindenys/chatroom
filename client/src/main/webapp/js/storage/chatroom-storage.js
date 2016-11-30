var ChatroomStorage = function () {

    var storageKey = "Chatrooms";
    var chatrooms = JSON.parse(localStorage.getItem(storageKey), dateReviver);

    if (!chatrooms) {
        chatrooms = [];
    }

    var add = function (chatroom) {
        chatrooms.push(chatroom);
        localStorage.setItem(storageKey, JSON.stringify(chatrooms));
    };

    var update = function (chatroom) {
        for (i = 0; i < chatrooms.length; i++) {
            if (chatrooms[i].name === chatroom.name) {
                chatrooms[i] = chatroom;
                localStorage.setItem(storageKey, JSON.stringify(chatrooms));
                return;
            }
        }

        throw new Error("Cannot update chatroom. Specified name not found");
    };

    var findAll = function () {
        return chatrooms;
    };

    function dateReviver(key, value) {
        if (key === "creationDate" || key === "postTime") {
            return new Date(value);
        }

        return value;
    }

    return {
        add: add,
        update: update,
        findAll: findAll
    };

};

