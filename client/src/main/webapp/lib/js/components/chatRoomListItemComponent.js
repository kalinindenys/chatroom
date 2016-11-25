var ChatRoomListItemComponent = function (eventBus, rootDivId, chatRoomDto) {

    var chatRoomListItemContainerId = rootDivId + "_chatRoomListItemContainer" + "_" + chatRoomDto.id;

    $("#" + rootDivId).html("").append('<li class="list-group-item">' + chatRoomDto.name +
        '<button class="btn btn-info">Join</button> ' +
        '</li>');

};
