var ChatroomStorage = function () {

    var key = "Chatrooms";
    var items = JSON.parse(localStorage.getItem(key), dateReviver);

    if (!items) {
        items = [];
    }

    var update = function (chatroom) {
        for (i = 0; i < items.length; i++) {
            if (items[i].id === chatroom.id) {
                items[i] = chatroom;
                localStorage.setItem(key, JSON.stringify(items));
                return;
            }
        }

        //create if not exists
        items.push(chatroom);
        localStorage.setItem(key, JSON.stringify(items));
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
        findAll: findAll
    };

};

