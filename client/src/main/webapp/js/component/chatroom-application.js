var ChatroomApplication = function (rootElementId, commandBus, eventBus) {

    var createChatroomComponentId = rootElementId + "_createChatroomComponent";
    var chatroomListComponentId = rootElementId + "_chatroomList";
    var popupId = rootElementId + "_popup";
    var chatroomWidgetId = rootElementId + "_chatroomWidget";

    var chatroomStorage = new ChatroomStorage();
    var chatroomService = new ChatroomService(chatroomStorage, commandBus, eventBus);
    var messageService = new MessageService(chatroomStorage, chatroomService, commandBus, eventBus);

    $("#" + rootElementId).append(
        '<div class="container"' +
        '<div class="row">' +
        '<div id="' + createChatroomComponentId + '" class="col-md-4">Create chatroom component placeholder</div>' +
        '</div>' +
        '<br>' +
        '<div class="row">' +
        '<div id="' + chatroomListComponentId + '" class="col-md-4">ChatroomListComponent placeholder</div>' +
        '<div id="' + chatroomWidgetId + '" class="col-md-8"></div>' +
        '</div>' +
        '<div class="row">' +
        '<div id="' + popupId + '" class="col-md-4"></div>' +
        '</div>' +
        '</div>'
    );

    var createChatroomComponent = new CreateChatroomComponent(createChatroomComponentId, commandBus, eventBus);
    var chatroomListComponent = new ChatroomListComponent(chatroomListComponentId, commandBus, eventBus);
    var joinChatComponent = new JoinChatComponent(popupId, commandBus, eventBus);
    var chatroomWidget = new ChatroomWidget(chatroomWidgetId, chatroomService, commandBus, eventBus);

    commandBus.emitMessage(new InitChatroomList(chatroomService.findAll()).toMessage());

};