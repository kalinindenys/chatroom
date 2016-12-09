var ChatRoomApp = function (rootElementId, externalEventBus) {

    var eventBus;
    if (externalEventBus) {
        eventBus = externalEventBus;
    } else {
        eventBus = new MessageBus("Event bus");
    }

    var commandBus = new MessageBus("Command bus");

    var createChatRoomDivId = rootElementId + "_createChatRoom";
    var chatRoomListDivId = rootElementId + "_chatRoomList";
    var chatRoomWidgetDirectorId = rootElementId + "_chatRoomWidgetDirector";

    $("#" + rootElementId).append("<div class='add-chat-room' id=" + createChatRoomDivId + "> Create chat room component placeholder </div>")
        .append("<div><div class='chat-room-list' id=" + chatRoomListDivId + "> Chat room list component placeholder </div>" +
            "<div id=" + chatRoomWidgetDirectorId + " class='widget-director'</div></div>");

    CreateChatroomComponent.init(eventBus, commandBus, createChatRoomDivId);
    ChatRoomListComponent.init(eventBus, commandBus, chatRoomListDivId);
    ChatRoomWidgetDirector.init(eventBus, commandBus, chatRoomWidgetDirectorId);
    new ChatRoomsFacade(commandBus, eventBus);

};