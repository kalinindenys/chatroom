var ChatroomApplication = function (rootElementId, commandBus, eventBus) {

    var createChatroomComponentId = rootElementId + "_createChatroomComponent";
    var chatroomService = new ChatroomService(commandBus, eventBus);

    $("#" + rootElementId).append(
        '<div id="' + createChatroomComponentId + '" class="container">' +
        '</div>'
    );

    var createChatroomComponent = new CreateChatroomComponent(createChatroomComponentId, commandBus, eventBus);

};