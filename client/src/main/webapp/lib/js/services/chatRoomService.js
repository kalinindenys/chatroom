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
    };

    var _readAllChatRooms = function () {
        allChatRooms = [];
        for (var key in localStorage) {
            allChatRooms.push(JSON.parse(localStorage.getItem(key)));
        }
        allChatRooms.sort(function (a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return allChatRooms;
    };

    var _createChatRoom = function (chatRoomName) {

        _addChatRoom(chatRoomName);

        return _readAllChatRooms();
    };

    var _validateNickname = function (chatRoomName, nickname) {
        var chatRoom = JSON.parse(localStorage.getItem(chatRoomName));
        var users = chatRoom.users;
        var foundUser;

        var isValid;
        if (users) {
            for (var i = 0; i < users.size; i++) {
                if (users[i] == nickname) {
                    foundUser = users[i];

                }
            }
            if (foundUser || nickname.length < 1) {
                isValid = false
            }
            else {
                isValid = true;
            }
            return isValid;
        } else {
            return isValid = true;
        }

        //todo: CLEAN
    };

    var _joinChatRoom = function (chatRoomName, nickname) {
        var chatRoom = JSON.parse(localStorage.getItem(chatRoomName));
        var users = chatRoom.users;

        if (!(users === undefined)) {
            users.push(nickname);
            //todo: FIX!
        } else {
            users = nickname;
        }
        chatRoom.users = users;
        localStorage.setItem(chatRoomName, JSON.stringify(chatRoom));

    };

    return {
        "createChatRoom": _createChatRoom,
        "readAllChatRooms": _readAllChatRooms,
        "validateNickname": _validateNickname,
        "joinChatRoom": _joinChatRoom
    };
};