var ChatroomStorage = function () {

    var key = "Chatrooms";
    var items = JSON.parse(localStorage.getItem(key), dateReviver);

    if (!items) {
        items = [];
    }

    var update = function (chatroom) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === chatroom.id) {
                items[i] = chatroom;
                localStorage.setItem(key, JSON.stringify(items));
                return;
            }
        }

        //create item if not exists
        items.push(chatroom);
        localStorage.setItem(key, JSON.stringify(items));
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

    return {
        update: update,
        findOne: findOne,
        findAll: findAll
    };

};

