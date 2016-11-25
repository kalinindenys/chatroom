var ChatRoomListItemComponent = function (eventBus, rootDivId, chatRoomDto) {

    var chatRoomListItemContainerId = rootDivId + "_chatRoomListItemContainer" + "_" + chatRoomDto.id;
    var joinId = rootDivId + "_joinId";

    $("#" + rootDivId).html("").append('<div id=' + chatRoomListItemContainerId + ' class="animated jello" ' +
        '<li class="list-group-item">' + chatRoomDto.name +
        '<button id="' + joinId + '" style="visibility: hidden" class="btn btn-info">Join</button> ' +
        '</li></div>');


    var joinButton = $('#' + joinId);
    var chatRoomListItem = $("#" + chatRoomListItemContainerId);

    joinButton.keydown(function (event) {
        //JOIN
    });

    chatRoomListItem.mouseover(function (event) {
        joinButton.css('visibility', 'visible');
    });

    chatRoomListItem.mouseout(function (event) {
        joinButton.css('visibility', 'hidden');
    });

    eventBus.subscribe(Events.CHAT_ROOM_LIST_UPDATED, _cleanComponent);
};
