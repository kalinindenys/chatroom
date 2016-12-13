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
                    throw new Error("Chat room already exist")
                } else {
                    var id = storage.generateId(type);
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

        var _validateNickname = function (userDto) { // inputs: username, chatRoomId
            var chatRoomId = userDto.chatRoomId;
            var nickname = userDto.name.trim();
            var chatRoom = storage.getItemById(Types.CHATROOM, chatRoomId);
            var users = chatRoom.userIds;

            var isValid;
            if (users) {
                if (nickname.length > 0) {
                    users.forEach(function (userId) {
                        if (storage.getItemById(Types.USER, userId).name === nickname)
                            throw new Error("Nickname already exist!")
                    });
                    isValid = true;
                } else {
                    throw new Error("Nickname cannot be empty!")
                }
            } else {
                isValid = true
            }
            return isValid;
        };

        var _joinChatRoom = function (userDto) {
            var chatRoomId = userDto.chatRoomId;
            var nickname = userDto.name.trim();
            userDto = new UserDto(storage.generateId(Types.USER), nickname, chatRoomId);//think about simplify
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
            //todo: CHECK ERRORS
        };

        var _leaveChatRoom = function (userDto) {//chatRoomId, userId
            var userId = userDto.id;
            var chatRoomId = userDto.chatRoomId;
            var joinedChatRoomId = storage.getItemById(Types.USER, userId).chatRoomId;
            if (joinedChatRoomId == chatRoomId) {
                var chatRoom = storage.getItemById(Types.CHATROOM, chatRoomId);
                var joinedUserIds = chatRoom.userIds;

                for (joinedUserId in joinedUserIds) {
                    if (joinedUserId == userId) {
                        joinedUserIds.splice(joinedUserIds, 1);
                        storage.saveItem(Types.CHATROOM, chatRoom);
                    }
                }
                return chatRoom;
            }
        };

        var _postMessage = function (message) { //chatRoomId, message
            var chatRoomId = message.chatRoomId;
            message.content = message.content.replace('<', '&lt;').replace('>', '&gt;').replace(/\r?\n/g, '<br />');
            message = new MessageDto(storage.generateId(Types.MESSAGE), message.userId, message.username, message.chatRoomId, message.content, message.date);//dumb
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

        };

        return {
            "createChatRoom": _createChatRoom,
            "readAllChatRooms": _readAllChatRooms,
            "validateNickname": _validateNickname,
            "joinChatRoom": _joinChatRoom,
            "leaveChatRoom": _leaveChatRoom,
            "postMessage": _postMessage
        };
    }
    ;