describe('chatRoomService tests with localStorage', function () {
    var service = new ChatRoomService(new ChatRoomStorage());

    it('Testing createChatRoom() method: ', function () {
        for (var i = 0; i < 5; i++) {
            var chatRoomName = "chatRoom" + i;
            service.createChatRoom(chatRoomName);
            var answer = JSON.parse(localStorage.getItem("chatRoom" + i));
            unitjs.object(answer);
            unitjs.value(answer.name).isEqualTo("chatRoom" + i);
        }

    });

    it('Testing readAllChatRooms() method: ', function () {
        var allChatRooms = service.readAllChatRooms();
        unitjs.array(allChatRooms).isNotEmpty();
        unitjs.array(allChatRooms).hasLength(5);

    });

    it('Testing joinChatRoom() method: ', function () {
        var allChatRooms = service.readAllChatRooms();

        for (var i = 0; i < 5; i++) {
            var username = "user" + i;
            var chatRoomName = "chatRoom" + i;
            var chatRoom = service.joinChatRoom(chatRoomName, username);
            unitjs.object(chatRoom);
            unitjs.array(chatRoom.users).hasLength(1);
            unitjs.value(chatRoom.users[0]).isEqualTo("user" + i);

        }

    });

    it('Testing validateNickname() method: ', function () {
        var validNickname = "user1_valid";
        isValid = service.validateNickname("chatRoom1", validNickname);
        unitjs.bool(isValid).isTrue();

        var notValidNickname = "";
        var isValid = service.validateNickname("chatRoom1", notValidNickname);
        unitjs.bool(isValid).isFalse();

        notValidNickname = "";
        isValid = service.validateNickname("chatRoom1", notValidNickname);
        unitjs.bool(isValid).isFalse();

        notValidNickname = "user1";
        isValid = service.validateNickname("chatRoom1", notValidNickname);
        unitjs.bool(isValid).isFalse();
    });

    it('Testing leaveChatRoom() method: ', function () {
        var chatRoomName = "chatRoom0";
        var nickname = "user0";
        var chatRoom = service.leaveChatRoom(chatRoomName, nickname);

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