describe('chatRoomService tests with inMemoryStorage', function () {
    var storage = new ChatRoomInMemoryStorage();
    var service = new ChatRoomService(storage);

    it('Testing createChatRoom() method: ', function () {
        for (var i = 0; i < 5; i++) {
            var chatRoomName = "chatRoom" + i;
            service.createChatRoom(chatRoomName);
            var answer = storage.getChatRoom(chatRoomName);
            unitjs.object(answer);
            unitjs.value(answer.name).isEqualTo(chatRoomName);
        }

    });

    it('Testing readAllChatRooms() method: ', function () {
        var allChatRooms = service.readAllChatRooms();
        unitjs.array(allChatRooms).isNotEmpty();
        unitjs.array(allChatRooms).hasLength(5);

    });

    it('Testing joinChatRoom() method: ', function () {
        for (var i = 0; i < 5; i++) {
            var username = "UserDto" + i;
            var chatRoomName = "chatRoom" + i;
            var chatRoomMember = new UserDto(chatRoomName, username);
            var chatRoom = service.joinChatRoom(chatRoomMember);
            unitjs.object(chatRoom);
            unitjs.array(chatRoom.users).hasLength(1);
            unitjs.value(chatRoom.users[0]).isEqualTo(username);

        }

    });

    it('Testing validateNickname() method: ', function () {
        var chatRoomName = "chatRoom1";
        var validNickname = "user1_valid";
        var chatRoomMember = new UserDto(chatRoomName, validNickname);
        isValid = service.validateNickname(chatRoomMember);
        unitjs.bool(isValid).isTrue();

        var invalidNickname = "";
        chatRoomMember.user=invalidNickname;
        var isValid = service.validateNickname(chatRoomMember);
        unitjs.bool(isValid).isFalse();

        invalidNickname = "            ";
        chatRoomMember.user=invalidNickname;
        isValid = service.validateNickname(chatRoomMember);
        unitjs.bool(isValid).isFalse();

        invalidNickname = "user1";
        chatRoomMember.user=invalidNickname;
        isValid = service.validateNickname(chatRoomMember);
        unitjs.bool(isValid).isFalse();
    });

    it('Testing leaveChatRoom() method: ', function () {
        var chatRoomName = "chatRoom0";
        var nickname = "user0";
        var chatRoomMember = new UserDto(chatRoomName, nickname);
        var chatRoom = service.leaveChatRoom(chatRoomMember);

        unitjs.object(chatRoom);
        unitjs.array(chatRoom.users).hasLength(0);
        unitjs.value(chatRoom.users[0]).isUndefined();
    });

    it('Testing postMessage() method: ', function () {
        var chatRoomName = "chatRoom2";
        var date = new Date();
        var message = new MessageDto("user2", "message2", date);
        var chatRoom = service.postMessage(chatRoomName, message);

        unitjs.object(chatRoom);
        unitjs.array(chatRoom.messages).hasLength(1);
        unitjs.value(chatRoom.messages[0].user).isEqualTo("user2");
        unitjs.value(chatRoom.messages[0].content).isEqualTo("message2");
        unitjs.value(chatRoom.messages[0].date).isEqualTo(date);
        unitjs.value(chatRoom.messages[0]).isEqualTo(message);

    });
})
;
