var ChatroomListComponent = function (rootElementId, commandBus, eventBus) {

    var containerId = rootElementId + "_container";
    var popupId = containerId + "_popup";
    var chatroomStorage = new ChatroomStorage();

    $("#" + rootElementId).html(
        '<h3>Chatrooms</h3>' +
        '<div id="' + containerId + '"></div>' +
        '<div id="' + popupId + '"></div>'
    );

    var container = $("#" + containerId);

    var renderChatroomList = function (chatrooms) {
        container.html("");

        if (chatrooms && chatrooms.length > 0) {
            chatrooms = sortByCreationDateDescending(chatrooms);

            container.attr("class", "pre-scrollable");
            container.append('<ul class="list-group">');

            for (i = 0; i < chatrooms.length; i++) {
                renderListItem(chatrooms[i]);
            }

            container.append("</ul>");
        } else {
            container.append("No chatrooms yet");
        }
    };

    var renderListItem = function (chatroom) {
        var liId = containerId + "_" + chatroom.name;

        container.append(
            '<li id="' + liId + '" class="list-group-item">' +
            chatroom.name +
            '<span class="badge">' + chatroom.creationDate + '</span>' +
            '</li>'
        );

        $("#" + liId).hover(
            function () {
                $(this).append('<button class="btn btn-default">Join</button>');
                $(this).find("button").click(function () {
                    new JoinChatComponent(chatroom, popupId, commandBus, eventBus);
                });
            },
            function () {
                $(this).find("button").remove();
            }
        );
    };

    var sortByCreationDateDescending = function (chatrooms) {
        return chatrooms.sort(function (first, second) {
            return second.creationDate - first.creationDate;
        });
    };

    var formatDate = function (date) {
        return date.getDay() + "-" + date.getMonth() + "-" + date.getYear() + " " + date.getHours() + ":" + date.getMinutes();
    };

    eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, renderChatroomList);

    eventBus.emitMessage(new ChatroomListUpdated(chatroomStorage.getChatrooms()).toMessage());

};