var ChatroomLocalStorage = function () {

    var key = "Chatrooms";
    var items = JSON.parse(localStorage.getItem(key), dateReviver);

    if (!items) {
        items = [];
    }

    var save = function (chatroom) {
        // chatroom = deepGenerateId(chatroom);

        for (i = 0; i < items.length; i++) {
            if (items[i].id === chatroom.id) {
                items[i] = chatroom;
                localStorage.setItem(key, JSON.stringify(items));
                return;
            }
        }

        //add item if not exists
        items.push(chatroom);
        localStorage.setItem(key, JSON.stringify(items));

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

    function dateReviver(key, value) {
        if (key === "creationDate" || key === "postTime") {
            return new Date(value);
        }

        return value;
    }

    var generateId = function (prefix) {
        var id;
        var idCounterKey = prefix + "_id_counter";

        if ((id = JSON.parse(localStorage.getItem(idCounterKey))) == null) {
            id = { value: 0 };
        }

        id.value++;
        localStorage.setItem(idCounterKey, JSON.stringify(id));
        return id.value;
    };

    var deepGenerateId = function (chatroom) {
        if (!chatroom.id) {
            chatroom.id = generateId("chatroom");
        }

        for (var i = 0; i < chatroom.messages.length; i++) {
            if (!chatroom.messages[i].id) {
                chatroom.messages[i].id = generateId("message");
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

