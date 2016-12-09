var ChatRoomService = function (storage) {

    var _readAllChatRooms = function () {
        var allChatRooms = storage.getAllByType(Types.CHATROOM);

        allChatRooms.sort(function (a, b) {
            return new Date(b.entity.date).getTime() - new Date(a.entity.date).getTime();
        });
        return allChatRooms;
    };

    var _createChatRoom = function (chatRoomName) {
        chatRoomName = chatRoomName.trim();
        var type = Types.CHATROOM;
        if (chatRoomName.length > 2 && chatRoomName.length <= 50) {
            var item = storage.getAllByName(type, chatRoomName);
            if (item.length() > 0) {
                throw new Error("Chat room already exist")
            } else {
                var id = storage.generateId();
                var users = [];
                var messages = [];
                var chatroomDto = new ChatroomDto(id, chatRoomName, new Date(), users, messages);
                storage.saveItem(type, chatroomDto);
                //storage.save(Types.CHATROOM, chatroomDto);
            }
        } else {
            throw new Error("Too short name for the chat room")
        }
    };

    var _validateNickname = function (chatRoomMember) { // inputs: username, chatRoomId
        var chatRoomName = chatRoomMember.chatRoomName; //chatId
        var nickname = chatRoomMember.user.trim();
        var chatRoom = storage.getItemById(Types.CHATROOM, chatRoomId);
        var users = chatRoom.userIds;

        var isValid;
        if (users) {
            if (nickname.length > 0) {
                users.forEach(function (userId) {
                    if (storage.getItemById(Types.USER, userId).name === nickname)
                        throw new Error("Nickname already exist!")
                });
            } else {
                throw new Error("Nickname cannot be empty!")
            }
        } else {
            isValid = true
        }
        return isValid;
    };

    var _joinChatRoom = function (chatRoomMember) {
        var chatRoomId;
        var nickname = chatRoomMember.user.trim();
        var user = new UserDto(storage.generateId, nickname, chatRoomId);
        var chatRoom = storage.getItemById(Types.CHATROOM, chatRoomId);

        if (!(chatRoom.userIds === undefined)) {
            chatRoom.userIds.push(user.id);
        } else {
            chatRoom.userIds = user.id;
        }
        storage.saveItem(Types.CHATROOM, chatRoom);
        storage.saveItem(Types.USER, user);
        return chatRoom;

        //todo: continue
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