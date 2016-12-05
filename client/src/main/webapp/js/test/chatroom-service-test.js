// var ChatroomServiceTest = function () {
//
//     var test = function () {
//
//     };
//
// };
//

var chatroomInMemoryStorage = new ChatroomInMemoryStorage();
var chatroomService = new ChatroomService(chatroomInMemoryStorage);

describe("findAll", function() {

    it("should return 0 elements", function() {

        unitjs.value(chatroomService.findAll().length).isEqualTo(0);

    });

    it("should return one chatroom", function () {



    });

});

describe("createChatroom", function () {

    it("should create chatroom", function () {
        var chatroomName = "chatroomName";
        // var expectedChatroom = new ChatroomDTO(null, "chatroomName", );
        var updatedChatrooms = chatroomService.createChatroom(chatroomName);

        unitjs.string(actualChatroom.getName()).is(chatroomName);
    });


});