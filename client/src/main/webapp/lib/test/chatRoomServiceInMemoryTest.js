describe('ChatRoomService', function () {
    var storage = new InMemoryStorage();
    var service = new ChatRoomService(storage);

    describe('#createChatRoom()', function () {
        it('should create five different chat rooms', function () {
            for (var i = 0; i < 5; i++) {
                var chatRoomName = "chatRoom" + i;
                var chatRoom = service.createChatRoom(chatRoomName);
                var answer = storage.getItemById(Types.CHATROOM, chatRoom.id);
                unitjs.object(answer);
                unitjs.value(answer.name).isEqualTo(chatRoomName);
            }
        });

        it('should throw an error when the chat room name already exist', function () {
            var chatRoomName = "chatRoom1";
            var existingChatRoomCreationDate = storage.getItemById(Types.CHATROOM, 1).date;
            try {
                service.createChatRoom(chatRoomName);
            } catch (err) {
                unitjs.string("Error: " + Errors.CHAT_ROOM_ALREADY_EXISTS).isEqualTo(err);
            }
            unitjs.date(existingChatRoomCreationDate).isEqualTo(storage.getItemById(Types.CHATROOM, 1).date);
        });

        it('should throw an error when the length of the chat room name is less then two symbols', function () {
            var chatRoomName = "wq";
            var chatRoom;
            try {
                chatRoom = service.createChatRoom(chatRoomName);
            } catch (err) {
                unitjs.string("Error: " + Errors.SHORT_CHAT_ROOM_NAME).isEqualTo(err);
            }
            unitjs.value(chatRoom).isUndefined();
        });

        it('should throw an error when the length of the chat room name is more then fifty symbols', function () {
            var chatRoomName = "fifty symbols chat room name that is invalid and must cause an error";
            var chatRoom;
            try {
                chatRoom = service.createChatRoom(chatRoomName);
            } catch (err) {
                unitjs.string("Error: " + Errors.LONG_CHAT_ROOM_NAME).isEqualTo(err);
            }
            unitjs.value(chatRoom).isUndefined();
        });
    });

    describe('#readAllChatRooms()', function () {
        before(function () {
            if (storage.getAllByType(Types.CHATROOM) === null) {
                for (var i = 0; i < 5; i++) {
                    service.createChatRoom("chatRoom" + i);
                }
            }
        });

        it('should return all created chat rooms', function () {
            var allChatRooms = service.readAllChatRooms();
            unitjs.array(allChatRooms).isNotEmpty();
            unitjs.array(allChatRooms).hasLength(5);

        });
    });

    describe('#joinChatRoom()', function () {
        before(function () {
            if (storage.getAllByType(Types.CHATROOM) === null) {
                for (var i = 0; i < 5; i++) {
                    service.createChatRoom("chatRoom" + i);
                }
            }
        });
        it('should create five different users and add their ids to five different chat rooms', function () {
            for (var i = 0; i < 5; i++) {
                var username = "user" + i;
                var chatRoomMember = new UserDto(null, username, i);
                var data = service.joinChatRoom(chatRoomMember);
                var chatRoom = data.chatRoomDto;
                unitjs.object(chatRoom);
                unitjs.array(chatRoom.userIds).hasLength(1);
                unitjs.value(storage.getItemById(Types.USER, chatRoom.userIds[0]).name).isEqualTo(username);

            }

        });
    });

    describe('#validateNickname()', function () {
        beforeEach(function () {
            if (storage.getAllByType(Types.CHATROOM) === null) {
                service.createChatRoom("chatRoom0");
                service.joinChatRoom(new UserDto(null, "user0", 0))
            }
        });
        it('should return "true" when nickname is valid', function () {
            var validNickname = "user0_valid";
            var chatRoomMember = new UserDto(null, validNickname, 0);
            var isValid = service.validateNickname(chatRoomMember);
            unitjs.bool(isValid).isTrue();

        });

        it("should throw an error when nickname is empty", function () {
            var invalidNickname = "";
            var chatRoomMember = new UserDto(null, invalidNickname, 0);
            try {
                var isValid = service.validateNickname(chatRoomMember);
            } catch (err) {
                unitjs.string("Error: " + Errors.EMPTY_NICKNAME).isEqualTo(err);
            }
            unitjs.value(isValid).undefined();
        });

        it("should throw an error when the nickname already exists", function () {
            var invalidNickname = "user0";
            var chatRoomMember = new UserDto(null, invalidNickname, 0);
            try {
                var isValid = service.validateNickname(chatRoomMember);
            } catch (err) {
                unitjs.string("Error: " + Errors.NICKNAME_ALREADY_EXISTS).isEqualTo(err);
            }
            unitjs.value(isValid).undefined();
        });

        it("should throw an error when nickname is invalid", function () {
            var invalidNickname = "            ";
            var chatRoomMember = new UserDto(null, invalidNickname, 0);
            try {
                var isValid = service.validateNickname(chatRoomMember);
            } catch (err) {
                unitjs.string("Error: " + Errors.EMPTY_NICKNAME).isEqualTo(err);
            }
            unitjs.value(isValid).undefined();
        });
    });

    describe('#leaveChatRoom()', function () {
        before(function () {
            if (storage.getAllByType(Types.CHATROOM) === null) {
                service.createChatRoom("chatRoom0");
                service.joinChatRoom(new UserDto(null, 0, 0))
            }
        });
        it("should remove user's id in the chat room", function () {
            service.leaveChatRoom(new UserDto(0, 0, 0));
            var chatRoom = storage.getItemById(Types.CHATROOM, 0);

            unitjs.object(chatRoom);
            unitjs.array(chatRoom.userIds).hasLength(0);
            unitjs.value(chatRoom.userIds[0]).isUndefined();
        });
    });

    describe('#postMessage()', function () {
        before(function () {
            if (storage.getAllByType(Types.CHATROOM) === null) {
                service.createChatRoom("chatRoom0");
                service.joinChatRoom(new UserDto(null, "user0", 0))
            }
        });

        it("should create the message and add it's id to the chat room", function () {
            var date = new Date();
            var userId = 0;
            var username = "user0";
            var chatRoomId = 0;
            var content = "message2";
            var message = new MessageDto(null, userId, username, chatRoomId, content, date);
            service.postMessage(message);
            var chatRoom = storage.getItemById(Types.CHATROOM, chatRoomId);

            unitjs.array(chatRoom.messageIds).hasLength(1);
            unitjs.value(chatRoom.messageIds[0]).isEqualTo(0);
            var messageInStorage = storage.getItemById(Types.MESSAGE, 0);
            unitjs.object(messageInStorage);
            unitjs.value(messageInStorage.userId).isEqualTo(userId);
            unitjs.value(messageInStorage.username).isEqualTo(username);
            unitjs.value(messageInStorage.chatRoomId).isEqualTo(chatRoomId);
            unitjs.value(messageInStorage.content).isEqualTo(content);
            unitjs.value(messageInStorage.date).isEqualTo(date);

        });
    });
});
