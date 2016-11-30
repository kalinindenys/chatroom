var ChatroomListComponent = function (rootElementId, commandBus, eventBus) {

    var containerId = rootElementId + "_container";

    $("#" + rootElementId).html(
        '<div class="panel panel-default">' +
        '<div class="panel-heading">Chatrooms</div>' +
        '<ul class="panel-body list-group scrollable" id="' + containerId + '">No chatrooms yet</ul>' +
        '</div>'
    );

    var container = $("#" + containerId);

    var renderChatroomList = function (chatrooms) {
        container.html("");

        if (chatrooms && chatrooms.length > 0) {
            chatrooms = sortByCreationDateDescending(chatrooms);

            for (i = 0; i < chatrooms.length; i++) {
                new ChatroomListItem(containerId, chatrooms[i], eventBus);
            }
        } else {
            container.append("No chatrooms yet");
        }
    };

    var sortByCreationDateDescending = function (chatrooms) {
        return chatrooms.sort(function (first, second) {
            return second.creationDate - first.creationDate;
        });
    };

    eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, renderChatroomList);

    eventBus.emitMessage(new ChatroomListInitialized().toMessage());

};