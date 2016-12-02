var ChatroomInmemoryStorage = function () {

    var items = [];

    var chatroomIdCounter = 0;
    var messageIdCounter = 0;

    var save = function (chatroom) {
        chatroom = generateIdsIfNecessary(chatroom);

        for (var i = 0; i < items.length; i++) {
            if (items[i].id === chatroom.id) {
                items[i] = chatroom;
                return chatroom;
            }
        }

        //add item if not exists
        items.push(chatroom);

        return chatroom;
    };

    var findOne = function (itemId) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === itemId) {
                return items[i];
            }
        }
    };

    var findAll = function () {
        return items;
    };

    var generateIdsIfNecessary = function (chatroom) {
        if (!chatroom.id) {
            chatroom.id = chatroomIdCounter++;
        }

        for (var i = 0; i < chatroom.messages.length; i++) {
            if (!chatroom.messages[i].id) {
                chatroom.messages[i].id = messageIdCounter++;
            }
        }

        return chatroom;
    };

    return {
        save: save,
        findOne: findOne,
        findAll: findAll
    };

};