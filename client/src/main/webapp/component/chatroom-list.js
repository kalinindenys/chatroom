var ChatroomListComponent = function (rootElementId, commandBus, eventBus) {

    var containerId = rootElementId + "_container";
    var chatroomStorage = new ChatroomStorage();

    $("#" + rootElementId).html(
        '<h3>Chatrooms</h3>' +
        '<div id="' + containerId + '">Yo</div>'
    );

    var container = $("#" + containerId);

    var renderChatroomList = function (chatrooms) {
        container.html("");

        if (chatrooms && chatrooms.length > 0) {
            chatrooms = sortByCreationDateDescending(chatrooms);

            container.attr("class", "pre-scrollable");
            container.append('<ul class="list-group">');

            for (i = 0; i < chatrooms.length; i++) {
                container.append(
                    '<li class="list-group-item">' +
                    chatrooms[i].name +
                    '<span class="badge">' + chatrooms[i].creationDate + '</span>' +
                    '</li>'
                );
            }

            container.append("</ul>");
            $("#" + containerId + " li").hover(liEnter, liLeave);
        } else {
            container.append("No chatrooms yet");
        }
    };

    var sortByCreationDateDescending = function (chatrooms) {
        return chatrooms.sort(function (first, second) {
            return second.creationDate - first.creationDate;
        });
    };

    var formatDate = function (date) {
        return date.getDay() + "-" + date.getMonth() + "-" + date.getYear() + " " + date.getHours() + ":" + date.getMinutes();
    };

    var liEnter = function () {
        $(this).append('<button class="btn btn-default">Join</button>');
        $(this).last().click(function () {
            alert("!");
        })
    };

    var liLeave = function () {
        $(this).find("button").remove();
    };


    eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, renderChatroomList);

    eventBus.emitMessage(new ChatroomListUpdated(chatroomStorage.getChatrooms()).toMessage());

};