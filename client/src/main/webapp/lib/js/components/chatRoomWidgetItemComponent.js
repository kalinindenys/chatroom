var ChatRoomWidgetItemComponent = function (eventBus, commandBus, rootDivId, chatRoom) {
    var chatRoomListItemComponentId = rootDivId + "_chatRoomWidgetItem_" + chatRoom.id;


    $("#" + rootDivId).append('<li id=' + chatRoomListItemComponentId + ' class="list-group-item"><h1>Hello</h1>' + chatRoom.name + '</li>');

};
