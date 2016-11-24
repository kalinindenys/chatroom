var ChatroomApplication = function (rootElementId, commandBus, eventBus) {

    var createChatroomComponentId = rootElementId + "_createChatroomComponent";
    var chatroomListComponentId = rootElementId + "_chatroomList";
    var chatroomService = new ChatroomService(commandBus, eventBus);

    $("#" + rootElementId).append(
        '<div class="container"' +
        '<div class="row">' +
        '<div id="' + createChatroomComponentId + '" class="col-md-4">Create chatroom component placeholder</div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="' + chatroomListComponentId + '" class="col-md-6">ChatroomListComponent placeholder</div>' +
        '</div>' +
        '</div>'
    );

    var createChatroomComponent = new CreateChatroomComponent(createChatroomComponentId, commandBus, eventBus);
    var chatroomListComponent = new ChatroomListComponent(chatroomListComponentId, commandBus, eventBus);

};