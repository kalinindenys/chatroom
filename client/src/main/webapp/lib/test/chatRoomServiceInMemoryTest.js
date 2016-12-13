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
    });
    describe('#readAllChatRooms()', function () {
        it('should return all created chat rooms', function () {
            var allChatRooms = service.readAllChatRooms();
            unitjs.array(allChatRooms).isNotEmpty();
            unitjs.array(allChatRooms).hasLength(5);

        });
    });
    describe('#joinChatRoom()', function () {
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
        it('should return "true" when nickname is valid', function () {
            var validNickname = "user1_valid";
            var chatRoomMember = new UserDto(null, validNickname, 1);
            isValid = service.validateNickname(chatRoomMember);
            unitjs.bool(isValid).isTrue();

        });

        it("should throw an error when nickname is empty", function () {
            var invalidNickname = "";
            var chatRoomMember = new UserDto(null, invalidNickname, 1);
            try {
                var isValid = service.validateNickname(chatRoomMember);
            } catch (err) {
                unitjs.string("Error: Nickname cannot be empty!").isEqualTo(err);
            }
            unitjs.value(isValid).undefined();
        });

        it("should throw an error when the nickname already exists", function () {
            var invalidNickname = "user1";
            var chatRoomMember = new UserDto(null, invalidNickname, 1);
            try {
                var isValid = service.validateNickname(chatRoomMember);
            } catch (err) {
                unitjs.string("Error: Nickname already exists!").isEqualTo(err);
            }
            unitjs.value(isValid).undefined();
        });

        it("should throw an error when nickname is invalid", function () {
            var invalidNickname = "            ";
            var chatRoomMember = new UserDto(null, invalidNickname, 1);
            try {
                var isValid = service.validateNickname(chatRoomMember);
            } catch (err) {
                unitjs.string("Error: Nickname cannot be empty!").isEqualTo(err);
            }
            unitjs.value(isValid).undefined();
        });
    });

    describe('#leaveChatRoom()', function () {
        it("should remove user's id in the chat room", function () {
            service.leaveChatRoom(new UserDto(0, 0, 0));
            var chatRoom = storage.getItemById(Types.CHATROOM, 0);

            unitjs.object(chatRoom);
            unitjs.array(chatRoom.userIds).hasLength(0);
            unitjs.value(chatRoom.userIds[0]).isUndefined();
        });
    });

    describe('#postMessage()', function () {
        it("should create the message and add it's id to the chat room", function () {
            var date = new Date();
            var message = new MessageDto(null, 2, "user2", 2, "message2", date);
            var data = service.postMessage(message);
            var chatRoom = data.chatRoomDto;

            unitjs.object(chatRoom);
            unitjs.array(chatRoom.messageIds).hasLength(1);
            var messageInStorage = storage.getItemById(Types.MESSAGE, 0);
            unitjs.value(messageInStorage.userId).isEqualTo(2);
            unitjs.value(messageInStorage.chatRoomId).isEqualTo(2);
            unitjs.value(messageInStorage.content).isEqualTo("message2");
            unitjs.value(messageInStorage.date).isEqualTo(date);

        });
    });
});
