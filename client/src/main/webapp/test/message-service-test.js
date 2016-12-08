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

    describe("Construction of message service", function () {

        it("Should throw exception if chatroom strorage is not specified", function () {
            MessageService.bind(null, null).should.throw("Chatroom storage must be specified");
        });

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

        it("Should not post message if it is not specify chatroom ID", function () {
            var message = new ChatroomMessageDTO(null, "guest nickname", "message content", new Date());
            messageService.postMessage.bind(null, message).should.throw("Message must specify chatroom ID");
        });

    });



})();