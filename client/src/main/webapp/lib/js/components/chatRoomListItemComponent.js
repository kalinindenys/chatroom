var ChatRoomListItemComponent = function (eventBus, commandBus, rootDivId, chatRoom) {
    var chatRoomListItemComponentId = rootDivId + "_chatRoomListItemContainer_" + chatRoom.id;
    var formatter = new DateFormatter();
    var date = formatter.formatDate(chatRoom.date);
    var chatRoomName = chatRoom.name;

    $("#" + rootDivId).append('<li id=' + chatRoomListItemComponentId + ' class="list-group-item" style="height: 70px">' +
        ' <div class="animated bounceIn">' +
        '<span style="font-style: oblique">' + chatRoomName + '<br/>' + '</span>' + '<span class="chat-date"> ' + date + '</span>' +
        '<button style="float: right" class="btn btn-info"><i class="glyphicon glyphicon-comment"></i> Join</button> ' +
        '</div></li>'
    );

    var chatRoomListItem = $("#" + chatRoomListItemComponentId);
    var joinButton = chatRoomListItem.find("button");
    joinButton.hide();

    $(joinButton).on("click", function () {
        var joinDialog = new JoinDialogComponent(commandBus, eventBus, rootDivId, chatRoom);
        joinDialog.init();
    });

    chatRoomListItem.mouseover(function () {
        joinButton.show();
    });

    chatRoomListItem.mouseout(function () {
        joinButton.hide();
    });

};
