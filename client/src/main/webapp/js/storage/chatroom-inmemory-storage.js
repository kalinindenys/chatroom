var ChatroomInMemoryStorage = function () {

    var items = [];

    var chatroomIdCounter = 0;
    var messageIdCounter = 0;

    var save = function (chatroom) {
        chatroom = deepGenerateId(chatroom);

        for (var i = 0; i < items.length; i++) {
            if (items[i].id === chatroom.id) {
                items[i] = chatroom;
                return $.extend(true, {}, chatroom);
            }
        }

        //add item if not exists
        items.push(chatroom);
        return $.extend(true, {}, chatroom);
    };

    var findOne = function (itemId) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === itemId) {
                return $.extend(true, {}, items[i]);
            }
        }
    };

    var findAll = function () {
        return items.slice();
    };

    var deepGenerateId = function (chatroom) {
        if (chatroom.id === undefined) {
            chatroom.id = chatroomIdCounter++;
        }

        for (var i = 0; i < chatroom.messages.length; i++) {
            if (chatroom.messages[i].id === undefined) {
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