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

    describe("findById", function () {

        it("Should return existing chatroom", function () {
            var actualChatroom = DTOConverter.toChatroomEntity(chatroomService.findById(existingChatroom.id));
            unitjs.assert.deepEqual(actualChatroom, existingChatroom);
        });

    });

    describe("findByName", function () {

        it("Should return existing chatroom", function () {
            var actualChatroom = DTOConverter.toChatroomEntity(chatroomService.findByName(existingChatroom.name));
            unitjs.assert.deepEqual(actualChatroom, existingChatroom);
        })

    });

    describe("findAll", function () {

        it("Should return all stored chatrooms", function () {
            unitjs.assert.deepEqual(DTOConverter.toChatroomEntities(chatroomService.findAll()), chatroomInMemoryStorage.findAll());
        });

    });

    describe("createChatroom", function () {

        it("Should create chatroom", function () {
            var chatroomName = " chatroomName ";
            chatroomService.createChatroom(chatroomName);

            var chatroom = chatroomService.findByName(chatroomName.trim());

            unitjs.value(chatroom.getId());
            unitjs.string(chatroom.getName()).is(chatroomName.trim());
            unitjs.date(chatroom.getCreationDate());
            unitjs.array(chatroom.getGuests()).is([]);
            unitjs.array(chatroom.getMessages()).is([]);
            //TODO also check createChatroom return value???
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

    });

    describe("isValidNickname", function () {

        it("Should return true", function () {
            var nicknameValidationInfo = new JoinChatroomInfo("Not occupied", existingChatroom.id);
            unitjs.bool(chatroomService.isValidNickname(nicknameValidationInfo)).isTrue();
        });

        it("Should return false. Nickname with zero length", function () {
            var nicknameValidationInfo = new JoinChatroomInfo(" ", existingChatroom.id);
            unitjs.bool(chatroomService.isValidNickname(nicknameValidationInfo)).isFalse();
        });

        it("Should return false. Nickname occupied", function () {
            var nicknameValidationInfo = new JoinChatroomInfo(joinedGuestNickname, existingChatroom.id);
            unitjs.bool(chatroomService.isValidNickname(nicknameValidationInfo)).isFalse();
        });

    });

    describe("join", function () {

        it("Should add guest to chatroom", function () {
            var nickname = "Not occupied";
            var joinChatroomInfo = new JoinChatroomInfo(nickname, existingChatroom.id);
            var chatroomSession = chatroomService.join(joinChatroomInfo);
            existingChatroom.guests.push(nickname);

            unitjs.string(chatroomSession.getNickname()).is(nickname);
            unitjs.assert.deepEqual(DTOConverter.toChatroomEntity(chatroomSession.getChatroom()), existingChatroom);
        });

    });

    describe("leave", function () {

        it("Should remove guest from chatroom", function () {
            var joinChatroomInfo = new JoinChatroomInfo(joinedGuestNickname, existingChatroom.id);
            var updatedChatroomEntity = DTOConverter.toChatroomEntity(chatroomService.leave(joinChatroomInfo));
            existingChatroom.guests.splice(existingChatroom.guests.indexOf(joinedGuestNickname), 1);

            unitjs.assert.deepEqual(updatedChatroomEntity, existingChatroom);
        });

    });

})();
