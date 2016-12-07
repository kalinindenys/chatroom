(function () {

    var chatroomStorage;
    var messageService;
    var existingChatroom;
    var joinedGuestNickname = "Joined guest nickname";

    beforeEach(function () {
        chatroomStorage = new ChatroomInMemoryStorage();
        messageService = new MessageService(chatroomStorage);

        existingChatroom = new Chatroom("Existing chatroom name", new Date());
        existingChatroom.guests.push(joinedGuestNickname);

        existingChatroom = chatroomStorage.save(existingChatroom);
    });

    describe("postMessage", function () {

        it("Should post message to specified chatroom", function () {
            var messageContent = "Hello!";
            var postTime = new Date();
            var messageDTO = new ChatroomMessageDTO(existingChatroom.id, joinedGuestNickname, messageContent, postTime);

            var updatedChatroom = messageService.postMessage(messageDTO);
            existingChatroom.messages.push(new ChatroomMessage(existingChatroom.id, joinedGuestNickname, messageContent, postTime));

            unitjs.assert.deepEqual(DTOConverter.toMessageEntities(updatedChatroom.getMessages()), existingChatroom.messages);
        });

    });

})();