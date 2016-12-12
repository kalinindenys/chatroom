var ChatroomListComponent = function (rootElementId, commandBus, eventBus) {

    var container;
    var view = {
        containerId: rootElementId + "_container"
    };

    $.get("templates/chatroom-list.html", function (htmlTemplate) {
        html = Mustache.render(htmlTemplate, view);
        $("#" + rootElementId).html(html);

        container = $("#" + view.containerId);

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

        eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, renderChatroomList);
        eventBus.emitMessage(new ChatroomListInitialized().toMessage());
    });



    var sortByCreationDateDescending = function (chatrooms) {
        return chatrooms.sort(function (first, second) {
            return second.getCreationDate() - first.getCreationDate();
        });
    };

};

ChatroomListComponent.createFor = function (chatroomListComponentId, commandBus, eventBus) {
    new ChatroomListComponent(chatroomListComponentId, commandBus, eventBus);
};