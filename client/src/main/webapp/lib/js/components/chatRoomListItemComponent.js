var ChatRoomListItemComponent = function (rootDivId, chatRoomDto) {
    var chatRoom = JSON.parse(chatRoomDto);
    var chatRoomListItemContainerId = rootDivId + "_chatRoomListItemContainer_" + chatRoom.id;
    //todo: change date format

    $("#" + rootDivId).append('<li id=' + chatRoomListItemContainerId + ' class="list-group-item" style="height: 50px">' +
        ' <div class="animated bounceIn">'
        + chatRoom.name + '<span class="chat-date-span"> ' + chatRoom.date + '</span>' +
        '<button style="visibility: hidden; float: right" class="btn btn-info">Join</button> ' +
        '</div></li>'
    );


    var chatRoomListItem = $("#" + chatRoomListItemContainerId);
    var joinButton = chatRoomListItem.find("button")

    joinButton.keydown(function (event) {
        //todo: JOIN
    });

    chatRoomListItem.mouseover(function (event) {
        _changeButtonVisibility(true);
    });

    chatRoomListItem.mouseout(function (event) {
        _changeButtonVisibility(false);
    });

    var _changeButtonVisibility = function (isMouseOver) {
        if (isMouseOver) {
            joinButton.css('visibility', 'visible');
        } else {
            joinButton.css('visibility', 'hidden');
        }
    }

};
