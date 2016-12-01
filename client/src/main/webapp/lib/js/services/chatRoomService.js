var ChatRoomService = function () {

    var allChatRooms = [];

    var _addChatRoom = function (chatRoomName) {
        var chatRoomName = chatRoomName.trim();
        if (chatRoomName.length > 2 && chatRoomName.length <= 50) {
            var item = localStorage.getItem(chatRoomName);
            if (item) {
                throw new Error("Chat room already exist")
            } else {
                var length = localStorage.length;
                var chatroomDto = new ChatroomDto(length, chatRoomName, new Date());
                localStorage.setItem(chatRoomName, JSON.stringify(chatroomDto))
            }
        } else {
            throw new Error("Empty chat room cannot be added")
        }
    }


    var _readAllChatRooms = function () {
        allChatRooms = [];
        for (key in localStorage) {
            allChatRooms.push(JSON.parse(localStorage.getItem(key)));
        }
        allChatRooms.sort(function (a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return allChatRooms;
    };

    var _createChatRoom = function (chatRoom) {

        _addChatRoom(chatRoom);

        return _readAllChatRooms();
    };

    return {
        "createChatRoom": _createChatRoom,
        "readAllChatRooms": _readAllChatRooms
    };
};