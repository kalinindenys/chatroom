var ChatRoomListWidget = function(rootElementId, externalEventBus) {

    var eventBus;
    if(externalEventBus) {
        eventBus = externalEventBus;
    } else {
        eventBus = new MessageBus("Event bus");
    }

    var commandBus = new MessageBus("Command bus");

    var createChatRoomDivId = rootElementId + "_createChatRoom";
    var chatRoomListDivId = rootElementId + "_chatRoomList";

    $("#" + rootElementId)	.append("<div class='input-group' id=" + createChatRoomDivId + "> Create chat room component placeholder </div>")
        .append("<div id=" + chatRoomListDivId + "> Chat room List component placeholder </div>");

    var createChatRoomComponent = new CreateChatroomComponent(eventBus, commandBus, createChatRoomDivId);
    var chatRoomListComponent = new ChatRoomListComponent(eventBus, chatRoomListDivId);
    var taskModel = new TasksDomain(commandBus, eventBus, new MockServer());

};