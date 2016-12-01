var ChatRoomListComponent = function (eventBus, commandBus, rootDivId) {

    var chatRoomListContainerId = rootDivId + "_chatRoomListContainer";

    $("#" + rootDivId).html('').append('<div class="panel panel-info">' +
        '<div class="panel-heading"> <h3 class="panel-title">Chat Rooms:</h3> </div>' +
        '<div  id=' + chatRoomListContainerId + '></div></div>');


    var _onListUpdated = function (evt) {
        var chatRooms = evt.data;
        _renderChatRooms(chatRooms);
    };

    var _renderChatRooms = function (chatRooms) {

        var containerElement = $("#" + chatRoomListContainerId);

        containerElement.html("");

        if (chatRooms && chatRooms.length > 0) {

            containerElement.append('<ul class="list-group">');

            for (var chatRoomIndex = 0; chatRoomIndex < chatRooms.length; chatRoomIndex++) {
                var aChatRoom = chatRooms[chatRoomIndex];

                var name = aChatRoom.name;
                new ChatRoomListItemComponent(eventBus, commandBus, chatRoomListContainerId, aChatRoom);
            }

            containerElement.append('</ul>');
        } else {
            containerElement.append(' --- No Chat Rooms yet ---');
        }

        //todo: CLEAN

    };

    var _onError = function (evt) {
        _renderChatRooms(evt.data.chatRoomList);
    };

    eventBus.subscribe(Events.CHAT_ROOM_LIST_UPDATED, _onListUpdated);
    eventBus.subscribe(Events.CHAT_ROOM_CANNOT_BE_CREATED, _onError)
};
