var ChatRoomListItemComponent = function (eventBus, commandBus, rootDivId, chatRoom) {
    var chatRoomListItemComponentId = rootDivId + "_chatRoomListItemContainer_" + chatRoom.id;

    var date = _formatDate();
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
        new JoinDialogComponent(commandBus,eventBus, rootDivId, chatRoom);
        $('#myModal').modal();
    });

    chatRoomListItem.mouseover(function (event) {
        _changeButtonVisibility(true);
    });

    chatRoomListItem.mouseout(function (event) {
        _changeButtonVisibility(false);
    });

    var _changeButtonVisibility = function (isMouseOver) {
        if (isMouseOver) {
            joinButton.show();
        } else {
            joinButton.hide();
        }
    };

    function _formatDate() {
        var chatRoomDate = new Date(chatRoom.date);
        var day = chatRoomDate.getDate();
        var month = chatRoomDate.getMonth() + 1;
        var year = chatRoomDate.getFullYear();
        var hours = chatRoomDate.getHours();
        var minutes = ("0" + chatRoomDate.getMinutes()).slice(-2);
        return day + "-" + month + "-" + year + " " + hours + ":" + minutes;
    }

};
