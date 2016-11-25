var ChatroomListItem = function (rootElementId, popupId, chatroom, commandBus, eventBus) {

    var itemId = rootElementId + "_" + $("#" + rootElementId + " li").length;
    var joinBtnId = itemId + "_joinBtnId";

    $("#" + rootElementId).append(
        '<li id="' + itemId + '" class="list-group-item clearfix">' +
        chatroom.name +
        '<button class="btn btn-default btn-sm" style="visibility: hidden" id="' + joinBtnId + '">Join</button>' +
        '<span class="badge">' + chatroom.creationDate.toString("dd-MM-yy HH:mm") + '</span>' +
        '</li>'
    );

    var item = $("#" + itemId);
    var joinBtn = $("#" + joinBtnId);

    joinBtn.click(function () {
        new JoinChatComponent(chatroom, popupId, commandBus, eventBus);
    });

    item.mouseover(function () {
        joinBtn.css("visibility", "visible");
    });

    item.mouseout(function () {
        joinBtn.css("visibility", "hidden");
    });

};