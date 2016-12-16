
describe('ChatRoomService', function () {
    var storage = new InMemoryStorage();
    var CHAT_ROOM_NUMBER = 5;
    var CHAT_ROOM_TO_TEST_ID;

    var service = new ChatRoomService(storage);

    describe('#createChatRoom()', function () {
        it('should create five different chat rooms', function () {
            for (var i = 0; i < CHAT_ROOM_NUMBER; i++) {
                var chatRoomName = "chatRoom" + i;
                var chatRoom = service.createChatRoom(chatRoomName);
                var answer = storage.getItemById(Types.CHATROOM, chatRoom.id);
                unitjs.object(answer);
                unitjs.value(answer.name).isEqualTo(chatRoomName);
            }
        });

        it('should throw an error when the chat room name already exist', function () {
            var chatRoomName = "chatRoom1";
            var inValidChatRoom;
            try {
                inValidChatRoom = service.createChatRoom(chatRoomName);
            } catch (err) {
                unitjs.string("Error: " + Errors.CHAT_ROOM_ALREADY_EXISTS).isEqualTo(err);
            }
            unitjs.value(inValidChatRoom).isUndefined();
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
                for (var i = 0; i < CHAT_ROOM_NUMBER; i++) {
                    service.createChatRoom("chatRoom" + i);
                }
            }
        });

        it('should return all created chat rooms', function () {
            var allChatRooms = service.readAllChatRooms();
            unitjs.array(allChatRooms).isNotEmpty();
            unitjs.array(allChatRooms).hasLength(CHAT_ROOM_NUMBER);

        });
    });
    describe('#joinChatRoom()', function () {
        before(function () {
            if (storage.getAllByType(Types.CHATROOM) === null) {
                for (var i = 0; i < CHAT_ROOM_NUMBER; i++) {
                    service.createChatRoom("chatRoom" + i);
                }
            }
        });
        it('should create five different users and add their ids to five different chat rooms', function () {
            var allChatRooms = service.readAllChatRooms();
            for (var i = 0; i < 5; i++) {
                var username = "user" + i;
                var chatRoomMember = new UserDto(null, username, allChatRooms[i].id);
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
            var allChatRooms = service.readAllChatRooms();
            CHAT_ROOM_TO_TEST_ID = allChatRooms[0].id;
        });

        it('should return "true" when nickname is valid', function () {
            var validNickname = "user0_valid";
            var chatRoomMember = new UserDto(null, validNickname, CHAT_ROOM_TO_TEST_ID);
            var isValid = service.validateNickname(chatRoomMember);
            unitjs.bool(isValid).isTrue();

        });

        it("should throw an error when nickname is empty", function () {
            var invalidNickname = "";
            var chatRoomMember = new UserDto(null, invalidNickname, CHAT_ROOM_TO_TEST_ID);
            try {
                var isValid = service.validateNickname(chatRoomMember);
            } catch (err) {
                unitjs.string("Error: " + Errors.EMPTY_NICKNAME).isEqualTo(err);
            }
            unitjs.value(isValid).undefined();
        });

        it("should throw an error when the nickname already exists", function () {
            var invalidNickname = "user0";
            var chatRoomMember = new UserDto(null, invalidNickname, CHAT_ROOM_TO_TEST_ID);
            try {
                var isValid = service.validateNickname(chatRoomMember);
            } catch (err) {
                unitjs.string("Error: " + Errors.NICKNAME_ALREADY_EXISTS).isEqualTo(err);
            }
            unitjs.value(isValid).undefined();
        });

        it("should throw an error when nickname is invalid", function () {
            var invalidNickname = "            ";
            var chatRoomMember = new UserDto(null, invalidNickname, CHAT_ROOM_TO_TEST_ID);
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
                var createdChatRooms = service.readAllChatRooms();
                service.joinChatRoom(new UserDto(null, 0, createdChatRooms[0].id))
            }

            var allChatRooms = service.readAllChatRooms();
            CHAT_ROOM_TO_TEST_ID = allChatRooms[0].id;
        });
        it("should remove user's id in the chat room", function () {
            var userId = storage.getItemById(Types.CHATROOM, CHAT_ROOM_TO_TEST_ID).userIds[0];
            service.leaveChatRoom(new UserDto(userId, 0, CHAT_ROOM_TO_TEST_ID));
            var chatRoom = storage.getItemById(Types.CHATROOM, CHAT_ROOM_TO_TEST_ID);

            unitjs.object(chatRoom);
            unitjs.array(chatRoom.userIds).hasLength(0);
            unitjs.value(chatRoom.userIds[0]).isUndefined();
        });
    });

    describe('#postMessage()', function () {
        before(function () {
            if (storage.getAllByType(Types.CHATROOM) === null) {
                service.createChatRoom("chatRoom0");
                service.createChatRoom("chatRoom0");
                var createdChatRooms = service.readAllChatRooms();
                service.joinChatRoom(new UserDto(null, "user0", createdChatRooms[0].id));
            }

            var allChatRooms = service.readAllChatRooms();
            CHAT_ROOM_TO_TEST_ID = allChatRooms[0].id;
        });

        it("should create the message and add it's id to the chat room", function () {
            var chatRoom = storage.getItemById(Types.CHATROOM, CHAT_ROOM_TO_TEST_ID);
            var date = new Date();
            var userId = chatRoom.userIds[0];
            var username = "user0";
            var content = "message0";
            var message = new MessageDto(null, userId, username, CHAT_ROOM_TO_TEST_ID, content, date);
            service.postMessage(message);
            chatRoom = storage.getItemById(Types.CHATROOM, CHAT_ROOM_TO_TEST_ID);

            unitjs.array(chatRoom.messageIds).hasLength(1);
            var messageInStorage = storage.getItemById(Types.MESSAGE, chatRoom.messageIds[0]);
            unitjs.object(messageInStorage);
            unitjs.value(messageInStorage.userId).isEqualTo(userId);
            unitjs.value(messageInStorage.username).isEqualTo(username);
            unitjs.value(messageInStorage.chatRoomId).isEqualTo(CHAT_ROOM_TO_TEST_ID);
            unitjs.value(messageInStorage.content).isEqualTo(content);
            unitjs.value(messageInStorage.date).isEqualTo(date);

        });
    });
});
