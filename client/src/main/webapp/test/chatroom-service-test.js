(function() {

    var chatroomInMemoryStorage;
    var chatroomService;

    var existingChatroom;
    var joinedGuestNickname = "I am in chatroom";

    beforeEach(function () {
        chatroomInMemoryStorage = new ChatroomInMemoryStorage();
        chatroomService = new ChatroomService(chatroomInMemoryStorage);

        existingChatroom = new Chatroom("Existing name", new Date());
        existingChatroom.guests.push(joinedGuestNickname);

        existingChatroom = chatroomInMemoryStorage.save(existingChatroom);
    });

    describe("Construction of chatroom service", function () {

        it("Should throw exception if chatroom strorage is not specified", function () {
            ChatroomService.bind(null, null).should.throw("Chatroom storage must be specified");
        });

    });

    describe("findAll", function () {

        it("Should return all stored chatrooms", function () {
            var actualChatrooms = DTOConverter.toChatroomEntities(chatroomService.findAll());
            var expectedChatrooms = chatroomInMemoryStorage.findAll();
            unitjs.assert.deepEqual(actualChatrooms, expectedChatrooms);
        });

        it("Should return empty array of chatrooms", function () {
            var emptyStorage = new ChatroomInMemoryStorage();
            chatroomService = new ChatroomService(emptyStorage);

            var chatrooms = DTOConverter.toChatroomEntities(chatroomService.findAll());
            unitjs.value(chatrooms.length).is(0);
        });

    });

    describe("createChatroom", function () {

        it("Should create chatroom", function () {
            var chatroomName = " chatroomName ";
            var updatedChatroomList = chatroomService.createChatroom(chatroomName);

            var chatroom = updatedChatroomList.find(function (chatroom) {
                return chatroom.getName() === chatroomName.trim();
            });

            unitjs.value(chatroom.getId());
            unitjs.string(chatroom.getName()).is(chatroomName.trim());
            unitjs.date(chatroom.getCreationDate());
            unitjs.array(chatroom.getGuests()).is([]);
            unitjs.array(chatroom.getMessages()).is([]);
        });

        it("Should not create chat with existing name", function () {
            chatroomService.createChatroom.bind(null, " " + existingChatroom.name + " ").should
                .throw("Chatroom with specified name exists");
        });

        it("Should not create chat with name length is less than 3 symbols", function () {
            chatroomService.createChatroom.bind(null, "").should
                .throw("Chatroom name length is less than 3 or more than 50 symbols");
        });

        it("Should not create chat with name length is more than 50 symbols", function () {
            var longName = new Array(52).join("a");

            chatroomService.createChatroom.bind(null, longName).should
                .throw("Chatroom name length is less than 3 or more than 50 symbols");
        });

        it("Should throw exception if chatroom name is not initialized", function () {
            chatroomService.createChatroom.bind(null, null).should.throw("Chatroom name must be presented as string");
        });

    });

    describe("isValidNickname", function () {

        it("Should return true if nickname with non zero length and not occupied", function () {
            var nicknameValidationInfo = new JoinChatroomInfo("Not occupied", existingChatroom.id);
            unitjs.bool(chatroomService.isValidNickname(nicknameValidationInfo)).isTrue();
        });

        it("Should return false if nickname with zero length", function () {
            var nicknameValidationInfo = new JoinChatroomInfo(" ", existingChatroom.id);
            unitjs.bool(chatroomService.isValidNickname(nicknameValidationInfo)).isFalse();
        });

        it("Should return false if nickname occupied", function () {
            var nicknameValidationInfo = new JoinChatroomInfo(joinedGuestNickname, existingChatroom.id);
            unitjs.bool(chatroomService.isValidNickname(nicknameValidationInfo)).isFalse();
        });

        it("Should throw exception if chatroom with specified ID not exist", function () {
            var nicknameValidationInfo = new JoinChatroomInfo("who is who", null);
            chatroomService.isValidNickname.bind(null, nicknameValidationInfo).should
                .throw("Chatroom with specified ID not exist");
        });

        it("Should throw exception if nickname is not initialized", function () {
            var nicknameValidationInfo = new JoinChatroomInfo(null, existingChatroom.id);
            chatroomService.isValidNickname.bind(null, nicknameValidationInfo).should
                .throw("Nickname must be presented as string");
        });

    });

    describe("join", function () {

        it("Should add guest to chatroom if nickname is valid", function () {
            var nickname = "Not occupied";
            var joinChatroomInfo = new JoinChatroomInfo(nickname, existingChatroom.id);
            var chatroomSession = chatroomService.join(joinChatroomInfo);
            var chatroomEntity = DTOConverter.toChatroomEntity(chatroomSession.getChatroom());
            existingChatroom.guests.push(nickname);

            unitjs.string(chatroomSession.getNickname()).is(nickname);
            unitjs.assert.deepEqual(chatroomEntity, existingChatroom);
        });

        it("Should throw exception if nickname is invalid", function () {
            var invalidNickname = "";
            var joinChatroomInfo = new JoinChatroomInfo(invalidNickname, existingChatroom.id);
            chatroomService.join.bind(null, joinChatroomInfo).should.throw("Specified nickname is not valid");
        });

    });

    describe("leave", function () {

        it("Should remove existing guest from chatroom", function () {
            var joinChatroomInfo = new JoinChatroomInfo(joinedGuestNickname, existingChatroom.id);
            var updatedChatroomEntity = DTOConverter.toChatroomEntity(chatroomService.leave(joinChatroomInfo));
            existingChatroom.guests.splice(existingChatroom.guests.indexOf(joinedGuestNickname), 1);

            unitjs.assert.deepEqual(updatedChatroomEntity, existingChatroom);
        });


        it("Should throw exception if specified guest is not a member of chatroom", function () {
            var joinChatroomInfo = new JoinChatroomInfo("I am not in chatroom", existingChatroom.id);
            chatroomService.leave.bind(null, joinChatroomInfo).should.throw("Trying to remove not existing guest");
        });

    });

})();
