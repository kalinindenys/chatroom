var ChatRoomEventHandler = function () {

    var allChatRooms = [];

    var _addChatRoom = function (chatRoom) {

        allChatRooms = [];
        for (key in localStorage)
            allChatRooms.push(localStorage.getItem(key));
        /*        } else {
         throw new Error("Empty chatRoom cannot be added!");
         }*/
    }


    var _readAllChatRooms = function () {
        return allChatRooms;
    }

    var _createChatRoom = function (chatRoom) {

        _addChatRoom(chatRoom);

        return _readAllChatRooms();
    }

    return {
        "createChatRoom": _createChatRoom,
        "readAllChatRooms": _readAllChatRooms
    };
}