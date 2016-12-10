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
            if (item.length > 0) {
                throw new Error("Chat room already exist")
            } else {
                var id = storage.generateId();
                var users = [];
                var messages = [];
                var chatroomDto = new ChatroomDto(id, chatRoomName, new Date(), users, messages);
                storage.saveItem(type, chatroomDto);
                //storage.save(Types.CHATROOM, chatroomDto);
                return chatroomDto;
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

        //todo: CHECK ERRORS
    };

    var _leaveChatRoom = function (chatRoomMember) {//chatRoomId, userId
        var joinedChatRoomId = storage.getItemById(Types.USER, userId).chatRoomId;
        if (joinedChatRoomId === chatRoomId) {
            var chatRoom = storage.getItemById(Types.CHATROOM, chatRoomId);
            var joinedUserIds = chatRoom.userIds;
            for (var i = 0; i < joinedUserIds.length; i++) {
                if (joinedUserIds[i] === userId) {
                    joinedUserIds[i].remove();
                    storage.removeItemById(Types.USER, userId);
                    storage.saveItem(Types.CHATROOM, chatRoom);
                }
            }
        }

    };

    var _postMessage = function (chatRoomName, message) { //chatRoomId, message
        message.content = message.content.replace('<', '&lt;').replace('>', '&gt;').replace(/\r?\n/g, '<br />');
        var messageEntity = new MessageDto(storage.generateId, message.userId, message.chatRoomId, message.content, new Date());//dumb
        var chatRoom = storage.getItemById(Types.CHATROOM, chatRoomId);
        var messages = chatRoom.messageIds;

        if (!(messages === undefined)) {
            messages.push(messageEntity.id);
        } else {
            messages = messageEntity.id;
        }
        chatRoom.messages = messages;
        storage.saveChatRoom(Types.CHATROOM, chatRoom);
        storage.saveChatRoom(Types.MESSAGE, messageEntity);
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