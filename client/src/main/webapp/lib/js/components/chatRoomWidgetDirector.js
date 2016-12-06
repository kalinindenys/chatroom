var ChatRoomWidgetDirector = function (eventBus, commandBus, rootDivId) {

    var chatRoomWidgetListId = rootDivId + "_ChatRoomWidgetList";
    $("#" + rootDivId).html('').append('<ul id=' + chatRoomWidgetListId + '></ul> ');

    var _showChatRoom = function (evt) {
        var chatRoom = evt.data.chatRoom;
        var user = evt.data.username;
        new ChatRoomWidgetItemComponent(eventBus, commandBus, chatRoomWidgetListId, chatRoom,user);

    };

    eventBus.subscribe(Events.OPEN_CHAT_ROOM, _showChatRoom);

};
