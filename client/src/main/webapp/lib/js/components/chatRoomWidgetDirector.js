var ChatRoomWidgetDirector = function (eventBus, commandBus, rootDivId) {

    var chatRoomWidgetListId = rootDivId + "_ChatRoomWidgetList";
    $("#" + rootDivId).html('').append('<ul id=' + chatRoomWidgetListId + '></ul> ');

    var _showChatRoom = function (chatRoom) {
        new ChatRoomWidgetItemComponent(eventBus, commandBus, chatRoomWidgetListId, chatRoom);

    };

    eventBus.subscribe(Events.ENTER_CHAT_ROOM, _showChatRoom);
};
