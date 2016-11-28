var ChatroomListItem = function (rootElementId, chatroom, commandBus) {

    var itemId = rootElementId + "_" + $("#" + rootElementId + " li").length;
    var joinBtnId = itemId + "_joinBtnId";

    $("#" + rootElementId).append(
        '<li id="' + itemId + '" class="list-group-item">' +
        chatroom.name +
        '<div class="pull-right">' +
        '<button class="btn btn-default btn-sm" style="visibility: hidden; margin-right: 10px;" id="' + joinBtnId + '">Join</button>' +
        '<span class="badge">' + chatroom.creationDate.toString("dd-MM-yy HH:mm") + '</span>' +
        '</div>' +
        '</li>'
    );

    var item = $("#" + itemId);
    var joinBtn = $("#" + joinBtnId);

    joinBtn.click(function () {
        commandBus.emitMessage(new ShowJoinChatPopup(chatroom).toMessage());
    });

    item.mouseover(function () {
        joinBtn.css("visibility", "visible");
    });

    item.mouseout(function () {
        joinBtn.css("visibility", "hidden");
    });

};