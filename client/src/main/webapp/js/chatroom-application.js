var ChatroomApplication = function (rootElementId) {

    var commandBus = new MessageBus();
    var eventBus = new MessageBus();

    var createChatroomComponentId = rootElementId + "_createChatroomComponent";
    var chatroomListComponentId = rootElementId + "_chatroomList";
    var popupId = rootElementId + "_popup";
    var chatroomWidgetId = rootElementId + "_chatroomWidget";

    var chatroomStorage = new ChatroomStorage();
    var chatroomService = new ChatroomService(chatroomStorage, eventBus);
    var messageService = new MessageService(chatroomStorage, chatroomService, commandBus, eventBus);
    var asyncChatServiceFacade = new AsyncChatServiceFacade(chatroomService, commandBus);

    $("#" + rootElementId).append(
        '<div class="container"' +
        '<div class="row">' +
        '<div id="' + createChatroomComponentId + '" class="col-md-4">Create chatroom component placeholder</div>' +
        '</div>' +
        '<br>' +
        '<div class="row">' +
        '<div id="' + chatroomListComponentId + '" class="col-md-4">ChatroomListComponent placeholder</div>' +
        '<div id="' + popupId + '" class="col-md-4"></div>' +
        '<div id="' + chatroomWidgetId + '" class="col-md-8"></div>' +
        '</div>'
    );

    var createChatroomComponent = new CreateChatroomComponent(createChatroomComponentId, commandBus, eventBus);
    var chatroomListComponent = new ChatroomListComponent(chatroomListComponentId, commandBus, eventBus);
    var joinChatComponent = new JoinChatComponent(popupId, commandBus, eventBus);
    var chatroomsController = new ChatroomsController(chatroomWidgetId, chatroomService, commandBus, eventBus);

    commandBus.emitMessage(new InitChatroomList(chatroomService.findAll()).toMessage());

};