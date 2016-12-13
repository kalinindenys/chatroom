describe('work of ChatRoomService', function () {
    var storage = new InMemoryStorage();
    var service = new ChatRoomService(storage);

    it('should create five different chat rooms', function () {
        for (var i = 0; i < 5; i++) {
            var chatRoomName = "chatRoom" + i;
            var chatRoom = service.createChatRoom(chatRoomName);
            var answer = storage.getItemById(Types.CHATROOM, chatRoom.id);
            unitjs.object(answer);
            unitjs.value(answer.name).isEqualTo(chatRoomName);
        }

    });

    it('should read all created chat rooms', function () {
        var allChatRooms = service.readAllChatRooms();
        unitjs.array(allChatRooms).isNotEmpty();
        unitjs.array(allChatRooms).hasLength(5);

    });

    it('should make five different users join five different chat rooms', function () {
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

    it('should validate a valid nickname', function () {
        var validNickname = "user1_valid";
        var chatRoomMember = new UserDto(null, validNickname, 1);
        isValid = service.validateNickname(chatRoomMember);
        unitjs.bool(isValid).isTrue();

    });

    it("shouldn't validate the empty nickname", function () {
        var invalidNickname = "";
        var chatRoomMember = new UserDto(null, invalidNickname, 1);
        try {
            var isValid = service.validateNickname(chatRoomMember);
        } catch (err) {
            unitjs.string("Error: Nickname cannot be empty!").isEqualTo(err);
        }
        unitjs.value(isValid).undefined();
    });

    it("shouldn't validate the existing nickname", function () {
        var invalidNickname = "user1";
        var chatRoomMember = new UserDto(null, invalidNickname, 1);
        try {
            var isValid = service.validateNickname(chatRoomMember);
        } catch (err) {
            unitjs.string("Error: Nickname already exists!").isEqualTo(err);
        }
        unitjs.value(isValid).undefined();
    });

    it("shouldn't validate the invalid nickname", function () {
        var invalidNickname = "            ";
        var chatRoomMember = new UserDto(null, invalidNickname, 1);
        try {
            var isValid = service.validateNickname(chatRoomMember);
        } catch (err) {
            unitjs.string("Error: Nickname cannot be empty!").isEqualTo(err);
        }
        unitjs.value(isValid).undefined();
    });

    it('should make user leave the chat room', function () {
        service.leaveChatRoom(new UserDto(0, 0, 0));
        var chatRoom = storage.getItemById(Types.CHATROOM, 0);

        unitjs.object(chatRoom);
        unitjs.array(chatRoom.userIds).hasLength(0);
        unitjs.value(chatRoom.userIds[0]).isUndefined();
    });

    it('should post the message to the chat room', function () {
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
})
;
