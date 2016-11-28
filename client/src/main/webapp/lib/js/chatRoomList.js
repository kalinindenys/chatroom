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

    $("#" + rootElementId)	.append("<div class='add-chat-room' id=" + createChatRoomDivId + "> Create chat room component placeholder </div>")
        .append("<div class='chat-room-list' id=" + chatRoomListDivId + "> Chat room list component placeholder </div>");

    var createChatRoomComponent = new CreateChatroomComponent(eventBus, commandBus, createChatRoomDivId);
    var chatRoomListComponent = new ChatRoomListComponent(eventBus, chatRoomListDivId);
    var chatRoomModel = new ChatRoomsDomain(commandBus, eventBus, new ChatRoomEventHandler());

};