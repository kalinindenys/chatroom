var ChatRoomListComponent = function (eventBus, rootDivId) {

    var chatRoomListContainerId = rootDivId + "_chatRoomListContainer";

    $("#" + rootDivId).html("").append('<div class="panel panel-info">' +
        '<div class="panel-heading"> <h3 class="panel-title">Chat Rooms:</h3> </div>' +
        '<div id=" + chatRoomListContainerId + "></div></div>');


    var _onListUpdated = function (evt) {
        var tasks = evt.data;
        _renderChatRooms(tasks);
    }

    var _renderChatRooms = function (tasks) {

        var containerElement = $("#" + chatRoomListContainerId);

        containerElement.html("");

        if (tasks && tasks.length > 0) {

            containerElement.append("<ul>");

            for (var taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
                var aChatRoom = tasks[taskIndex];

                var modifiedDescription = aChatRoom.description.split("\n").join("</br>");
                containerElement.append("<li>" + aTask.description + "</li>");
                // UPDATE LI!!==================================================================================
            }

            containerElement.append("</ul>");
        } else {
            containerElement.append(" --- No Chat Rooms yet ---");
        }
    };

    var _onError = function (evt) {
        _renderChatRooms(evt.data.chatRoomList);
    };

    eventBus.subscribe(Events.CHAT_ROOM_LIST_UPDATED, _onListUpdated);
    eventBus.subscribe(Events.CHAT_ROOM_CANNOT_BE_CREATED, _onError)
};
