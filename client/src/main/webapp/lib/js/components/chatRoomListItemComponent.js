var ChatRoomListItemComponent = function (eventBus, commandBus, rootDivId, chatRoom) {
    var chatRoomListItemComponentId = rootDivId + "_chatRoomListItemContainer_" + chatRoom.id;

    var date = _formatDate();
    var chatRoomName = chatRoom.name;

    $("#" + rootDivId).append('<li id=' + chatRoomListItemComponentId + ' class="list-group-item" style="height: 70px">' +
        ' <div class="animated bounceIn">' +
        '<span style="font-style: oblique">' + chatRoomName + '<br/>' + '</span>' + '<span class="chat-date"> ' + date + '</span>' +
        '<button style="visibility: hidden; float: right" class="btn btn-info"><i class="glyphicon glyphicon-comment"></i> Join</button> ' +
        '</div></li>'
    );

    var chatRoomListItem = $("#" + chatRoomListItemComponentId);
    var joinButton = chatRoomListItem.find("button");

    $(joinButton).on("click", function () {
        command = new GetChatRoomCommand(chatRoomName);
        commandBus.emit(command.toMessage());
    });

    var _openJoinDialogComponent = function (evt) {
        var chatRoom = evt.data;
        new JoinDialogComponent(eventBus, rootDivId, chatRoom);
        $('#myModal').modal();

    };

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

    function _formatDate() {
        var chatRoomDate = new Date(chatRoom.date);
        var day = chatRoomDate.getDate();
        var month = chatRoomDate.getMonth() + 1;
        var year = chatRoomDate.getFullYear();
        var hours = chatRoomDate.getHours();
        var minutes = ("0" + chatRoomDate.getMinutes()).slice(-2);
        var formattedDate = day + "-" + month + "-" + year + " " + hours + ":" + minutes;
        return formattedDate;
    }

    eventBus.subscribe(Events.OPEN_JOIN_DIALOG, _openJoinDialogComponent);
};
