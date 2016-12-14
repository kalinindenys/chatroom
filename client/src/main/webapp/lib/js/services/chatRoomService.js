var ChatRoomService = function (storage) {

    var _readAllChatRooms = function () {
        var allChatRooms = storage.getAllByType(Types.CHATROOM);
        if (allChatRooms) {
            allChatRooms.sort(function (a, b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
        }
        return allChatRooms;
    };

    var _createChatRoom = function (chatRoomName) {
        chatRoomName = chatRoomName.trim();
        var type = Types.CHATROOM;
        if (chatRoomName.length > 2 && chatRoomName.length <= 50) {
            var items = storage.getAllByType(type);
            var isItemFound = false;
            if (items) {
                var ids = Object.keys(items);
                for (id in ids) {
                    if (items[id].name === chatRoomName) {
                        isItemFound = true;
                    }
                }
            }
            if (isItemFound) {
                throw new Error(Errors.CHAT_ROOM_ALREADY_EXISTS)
            } else {
                var id = storage.generateId(type);
                var users = [];
                var messages = [];
                var chatroomDto = new ChatroomDto(id, chatRoomName, new Date(), users, messages);
                storage.saveItem(type, chatroomDto);
                return chatroomDto;
            }
        } else {
            if(chatRoomName.length <=2) {
                throw new Error(Errors.SHORT_CHAT_ROOM_NAME);
            }else {
                throw new Error(Errors.LONG_CHAT_ROOM_NAME);
            }
        }
    };

    var _validateNickname = function (userDto) {
        var chatRoomId = userDto.chatRoomId;
        var nickname = userDto.name.trim();
        var chatRoom = storage.getItemById(Types.CHATROOM, chatRoomId);
        var users = chatRoom.userIds;

        var isValid;
        if (users) {
            if (nickname.length > 0) {
                users.forEach(function (userId) {
                    if (storage.getItemById(Types.USER, userId).name === nickname)
                        throw new Error(Errors.NICKNAME_ALREADY_EXISTS)
                });
                isValid = true;
            } else {
                throw new Error(Errors.EMPTY_NICKNAME)
            }
        } else {
            isValid = true
        }
        return isValid;
    };

    var _joinChatRoom = function (userDto) {
        var chatRoomId = userDto.chatRoomId;
        var nickname = userDto.name.trim();
        userDto = new UserDto(storage.generateId(Types.USER), nickname, chatRoomId);
        var chatRoomDto = storage.getItemById(Types.CHATROOM, chatRoomId);

        if (!(chatRoomDto.userIds === undefined)) {
            chatRoomDto.userIds.push(userDto.id);
        } else {
            chatRoomDto.userIds = userDto.id;
        }
        storage.saveItem(Types.CHATROOM, chatRoomDto);
        storage.saveItem(Types.USER, userDto);
        return {
            "chatRoomDto": chatRoomDto,
            "userDto": userDto
        };
    };

    var _leaveChatRoom = function (userDto) {
        var userId = userDto.id;
        var chatRoomId = userDto.chatRoomId;
        var joinedChatRoomId = storage.getItemById(Types.USER, userId).chatRoomId;
        if (joinedChatRoomId == chatRoomId) {
            var chatRoom = storage.getItemById(Types.CHATROOM, chatRoomId);
            var joinedUserIds = chatRoom.userIds;

            for (var i = 0; i < joinedUserIds.length; i++) {
                if (joinedUserIds[i] == userId) {
                    joinedUserIds.splice(i, 1);
                    storage.saveItem(Types.CHATROOM, chatRoom);
                    break;
                }
            }
            return chatRoom;
        }
    };

    var _postMessage = function (message) {
        if (message.content.trim().length > 0) {
            var chatRoomId = message.chatRoomId;
            message.content = message.content.replace('<', '&lt;').replace('>', '&gt;').replace(/\r?\n/g, '<br />');
            message = new MessageDto(storage.generateId(Types.MESSAGE), message.userId, message.username, message.chatRoomId, message.content, message.date);
            var chatRoomDto = storage.getItemById(Types.CHATROOM, chatRoomId);
            if (!(chatRoomDto.messageIds === undefined)) {
                chatRoomDto.messageIds.push(message.id);
            } else {
                chatRoomDto.messageIds = message.id;
            }
            storage.saveItem(Types.CHATROOM, chatRoomDto);
            storage.saveItem(Types.MESSAGE, message);
            var username = storage.getItemById(Types.USER, message.userId).name;
            return {
                "chatRoomDto": chatRoomDto,
                "messageDto": message,
                "username": username
            };
        }
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