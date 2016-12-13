var ChatroomListComponent = function (rootElementId, commandBus, eventBus) {

    var template = document.querySelector('#chatroomListTemplate').import.querySelector("template").innerHTML;
    var view = {
        containerId: rootElementId + "_container"
    };

    html = Mustache.render(template, view);
    $("#" + rootElementId).html(html);

    var container = $("#" + view.containerId);

    var renderChatroomList = function (chatrooms) {
        container.html("");

        if (chatrooms && chatrooms.length > 0) {
            chatrooms = sortByCreationDateDescending(chatrooms);

            for (var i = 0; i < chatrooms.length; i++) {
                ChatroomListItem.createFor(view.containerId, chatrooms[i], commandBus);
            }
        } else {
            container.append("No chatrooms yet");
        }
    };

    var sortByCreationDateDescending = function (chatrooms) {
        return chatrooms.sort(function (first, second) {
            return second.getCreationDate() - first.getCreationDate();
        });
    };

    eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, renderChatroomList);
    eventBus.emitMessage(new ChatroomListInitialized().toMessage());

};

ChatroomListComponent.createFor = function (chatroomListComponentId, commandBus, eventBus) {
    new ChatroomListComponent(chatroomListComponentId, commandBus, eventBus);
};