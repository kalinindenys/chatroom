var ChatRoomWidgetDirector = function (eventBus, commandBus, rootDivId) {
    var items = [];
    var chatRoomWidgetListId = rootDivId + "_ChatRoomWidgetList";
    $("#" + rootDivId).html('').append('<ul id=' + chatRoomWidgetListId + '></ul> ');

    var _showChatRoom = function (evt) {
        var chatRoom = evt.data.chatRoom;
        var user = evt.data.username;
        var item = ChatRoomWidgetItemComponent.init(eventBus, commandBus, chatRoomWidgetListId, chatRoom, user);
        items.push(item);

    };

    function _updateUserNumber(evt) {
        for (var i = 0; i < items.length; i++) {
            if ((items[i].getChatRoomName == evt.data.chatRoomName) && (items[i].getUsername == evt.data.user)) {
                $("#" + items[i].getItemId).remove();
            }
        }
    }

    eventBus.subscribe(Events.CHAT_ROOM_OPENED, _showChatRoom);
    eventBus.subscribe(Events.CHAT_ROOM_LEFT, _updateUserNumber);

};
ChatRoomWidgetDirector.init = function (eventBus, commandBus, rootDivId) {
    return new ChatRoomWidgetDirector(eventBus, commandBus, rootDivId);
};
