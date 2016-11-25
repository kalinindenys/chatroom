var ChatroomListComponent = function (rootElementId, commandBus, eventBus) {

    var containerId = rootElementId + "_container";
    var popupId = containerId + "_popup";

    $("#" + rootElementId).html(
        '<div class="panel panel-default">' +
        '<div class="panel-heading">Chatrooms</div>' +
        '<div class="panel-body" id="' + containerId + '"></div>' +
        '</div>' +
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
        var liId = containerId + "_" + chatroom.name.split(" ").join("_");

        container.append(
            '<li id="' + liId + '" class="list-group-item">' +
            chatroom.name +
            '<span class="badge">' + formatDate(chatroom.creationDate) + '</span>' +
            '</li>'
        );

        $("#" + liId).hover(
            function () {
                $(this).append('<button class="btn btn-default btn-sm">Join</button>');
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
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        // return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };

    commandBus.subscribe(Commands.INIT_CHATROOM_LIST, renderChatroomList);
    eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, renderChatroomList);

};