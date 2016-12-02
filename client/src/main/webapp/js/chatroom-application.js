var ChatroomApplication = function (rootElementId) {

    var commandBus = new MessageBus();
    var eventBus = new MessageBus();

    var createChatroomComponentId = rootElementId + "_createChatroomComponent";
    var chatroomListComponentId = rootElementId + "_chatroomList";
    var popupId = rootElementId + "_popup";
    var chatroomComponentsId = rootElementId + "_chatroomComponents";

    var chatroomStorage = new ChatroomLocalStorage();
    var chatroomService = new ChatroomService(chatroomStorage);
    var messageService = new MessageService(chatroomStorage, chatroomService);
    AsyncChatServiceFacade.createFor(chatroomService, commandBus, eventBus);
    AsyncMessageServiceFacade.createFor(messageService, commandBus, eventBus);

    $("#" + rootElementId).append(
        '<div class="container"' +
        '<div class="row">' +
        '<div id="' + createChatroomComponentId + '" class="col-md-4">Create chatroom component placeholder</div>' +
        '</div>' +
        '<br>' +
        '<div class="row">' +
        '<div id="' + chatroomListComponentId + '" class="col-md-4">ChatroomListComponent placeholder</div>' +
        '<div id="' + popupId + '" class="col-md-4"></div>' +
        '<div id="' + chatroomComponentsId + '" class="col-md-8"></div>' +
        '</div>'
    );

    CreateChatroomComponent.createFor(createChatroomComponentId, commandBus, eventBus);
    ChatroomListComponent.createFor(chatroomListComponentId, commandBus, eventBus);
    JoinChatComponent.createFor(popupId, commandBus, eventBus);
    ChatroomsComponentDirector.createFor(chatroomComponentsId, commandBus, eventBus);

};