var ChatRoomEventHandler = function() {

    var allChatRooms = [];

    var _addChatRoom = function(chatRoom) {

/*        if(chatRoom.name.length > 0) {*/
            allChatRooms.push(chatRoom);
/*        } else {
            throw new Error("Empty chatRoom cannot be added!");
        }*/
    }


    var _readAllChatRooms = function() {
        return allChatRooms;		//todo: RETURN A COPY!
    }

    var _createChatRoom = function(chatRoom) {

        _addChatRoom(chatRoom);

        return _readAllChatRooms();
    }

    return {
        "createChatRoom": _createChatRoom,
        "readAllChatRooms": _readAllChatRooms
    };
}