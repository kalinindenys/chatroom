var ChatroomListComponent = function (rootElementId, commandBus, eventBus) {

    var containerId = rootElementId + "_container";
    var ulId = containerId + "_ul";
    var popupId = containerId + "_popup";

    $("#" + rootElementId).html(
        '<div class="panel panel-default">' +
        '<div class="panel-heading">Chatrooms</div>' +
        '<ul class="panel-body" id="' + containerId + '"></ul>' +
        '</div>' +
        '<div id="' + popupId + '"></div>'
    );

    var container = $("#" + containerId);
    var joinChatComponent = new JoinChatComponent(popupId, commandBus, eventBus);

    var renderChatroomList = function (chatrooms) {
        container.html("");

        if (chatrooms && chatrooms.length > 0) {
            chatrooms = sortByCreationDateDescending(chatrooms);

            // container.attr("class", "pre-scrollable");
            container.append('<ul class="pre-scrollable" id="' + ulId + '">');

            for (i = 0; i < chatrooms.length; i++) {
                new ChatroomListItem(ulId, chatrooms[i], commandBus, eventBus);
            }

            container.append("</ul>");
        } else {
            container.append("No chatrooms yet");
        }
    };

    var sortByCreationDateDescending = function (chatrooms) {
        return chatrooms.sort(function (first, second) {
            return second.creationDate - first.creationDate;
        });
    };

    commandBus.subscribe(Commands.INIT_CHATROOM_LIST, renderChatroomList);
    eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, renderChatroomList);

};