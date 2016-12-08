var ChatRoomService = function (storage) {

    var _readAllChatRooms = function () {
        var allChatRooms = storage.getAllChatRooms();
        allChatRooms.sort(function (a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return allChatRooms;
    };

    var _createChatRoom = function (chatRoomName) {
        chatRoomName = chatRoomName.trim();
        if (chatRoomName.length > 2 && chatRoomName.length <= 50) {
            var item = storage.getChatRoom();
            if (item) {
                throw new Error("Chat room already exist")
            } else {
                var length = storage.getChatRoomNumber();
                var users = [];
                var messages = [];
                var chatroomDto = new ChatroomDto(length, chatRoomName, new Date(), users, messages);
                storage.saveChatRoom(chatroomDto);
            }
        } else {
            throw new Error("Empty chat room cannot be added")
        }
    };

    var _validateNickname = function (chatRoomMember) {
        var chatRoomName = chatRoomMember.chatRoomName;
        var nickname = chatRoomMember.user;
        var chatRoom = storage.getChatRoom(chatRoomName);
        var users = chatRoom.users;

        var isValid;
        if (users) {
            if (jQuery.inArray(nickname, users) != -1) {
                return false;
            }
            else isValid = nickname.length >= 1;
        } else {
            isValid = true;
        }
        return isValid;

        //todo: CLEAN
    };

    var _joinChatRoom = function (chatRoomMember) {
        var chatRoomName = chatRoomMember.chatRoomName;
        var nickname = chatRoomMember.user;
        var chatRoom = storage.getChatRoom(chatRoomName);
        var users = chatRoom.users;

        if (!(users === undefined)) {
            users.push(nickname);
        } else {
            users = nickname;
        }
        chatRoom.users = users;
        storage.saveChatRoom(chatRoom);
        return chatRoom;
        //todo: CHECK ERRORS

    };

    var _leaveChatRoom = function (chatRoomMember) {
        var chatRoomName = chatRoomMember.chatRoomName;
        var nickname = chatRoomMember.user;
        var chatRoom = storage.getChatRoom(chatRoomName);
        var users = chatRoom.users;

        var leavingUserIndex = jQuery.inArray(nickname, users);
        users.splice(leavingUserIndex, 1);

        chatRoom.users = users;
        storage.saveChatRoom(chatRoom);
        return chatRoom;

    };

    var _postMessage = function (chatRoomName, message) {
        message.content = message.content.replace('<', '&lt;').replace('>', '&gt;').replace(/\r?\n/g, '<br />');
        var chatRoom = storage.getChatRoom(chatRoomName);
        var messages = chatRoom.messages;

        if (!(messages === undefined)) {
            messages.push(message);
        } else {
            messages = message;
        }
        chatRoom.messages = messages;
        storage.saveChatRoom(chatRoom);
        return chatRoom;

    };

    return {
        "createChatRoom": _createChatRoom,
        "readAllChatRooms": _readAllChatRooms,
        "validateNickname": _validateNickname,
        "joinChatRoom": _joinChatRoom,
        "leaveChatRoom": _leaveChatRoom,
        "postMessage": _postMessage
    };
};