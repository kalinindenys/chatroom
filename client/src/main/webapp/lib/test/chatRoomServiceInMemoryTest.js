describe('chatRoomService tests with inMemoryStorage', function () {
    var storage = new InMemoryStorage();
    var service = new ChatRoomService(storage);

    it('Testing createChatRoom() method: ', function () {
        for (var i = 0; i < 5; i++) {
            var chatRoomName = "chatRoom" + i;
            var chatRoom = service.createChatRoom(chatRoomName);
            var answer = storage.getItemById(Types.CHATROOM, chatRoom.id);
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
            var username = "user" + i;
            var chatRoomMember = new UserDto(null, username, i);
            var chatRoom = service.joinChatRoom(chatRoomMember);
            unitjs.object(chatRoom);
            unitjs.array(chatRoom.userIds).hasLength(1);
            /*unitjs.value(chatRoom.userIds[0]).isEqualTo(username);*/

        }

    });

    it('Testing validateNickname() method: ', function () {
        var chatRoomId = 1;
        var validNickname = "user1_valid";
        var chatRoomMember = new UserDto(null, validNickname, chatRoomId);
        isValid = service.validateNickname(chatRoomMember);
        unitjs.bool(isValid).isTrue();

        /*   var invalidNickname = "";
         chatRoomMember.name = invalidNickname;
         var isValid = service.validateNickname(chatRoomMember);
         unitjs.bool(isValid).isFalse();*/

        /*        invalidNickname = "            ";
         chatRoomMember.name = invalidNickname;
         isValid = service.validateNickname(chatRoomMember);
         unitjs.bool(isValid).isFalse();*/
        /*
         invalidNickname = "user1";
         chatRoomMember.name = invalidNickname;
         isValid = service.validateNickname(chatRoomMember);
         unitjs.bool(isValid).isFalse();*/
    });

    it('Testing leaveChatRoom() method: ', function () {
        var chatRoomId = 0;
        var userId = 0;
        service.leaveChatRoom(chatRoomId, userId);
        var chatRoom = storage.getItemById(Types.CHATROOM, 0);

        unitjs.object(chatRoom);
        unitjs.array(chatRoom.userIds).hasLength(0);
        unitjs.value(chatRoom.userIds[0]).isUndefined();
    });

    it('Testing postMessage() method: ', function () {
        var date = new Date();
        var message = new MessageDto(null, 2, 2,"message2", date);
        var chatRoom = service.postMessage(message);

        unitjs.object(chatRoom);
        unitjs.array(chatRoom.messages).hasLength(1);
        var messageInStorage = storage.getItemById(Types.MESSAGE,0);
        unitjs.value(messageInStorage.userId).isEqualTo(2);
        unitjs.value(messageInStorage.chatRoomId).isEqualTo(2);
        unitjs.value(messageInStorage.content).isEqualTo("message2");
        unitjs.value(messageInStorage.date).isEqualTo(date);

    });
})
;
