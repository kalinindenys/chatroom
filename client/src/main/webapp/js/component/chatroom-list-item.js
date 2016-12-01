var ChatroomListItem = function (rootElementId, chatroom, eventBus) {

    var itemId = rootElementId + "_" + $("#" + rootElementId + " li").length;
    var joinBtnId = itemId + "_joinBtnId";

    $("#" + rootElementId).append(
        '<li id="' + itemId + '" class="list-group-item">' +
        chatroom.getName() +
        '<div class="pull-right">' +
        '<button class="btn btn-default btn-sm" style="display: none; margin-right: 10px;" id="' + joinBtnId + '">Join</button>' +
        '<span class="badge">' + chatroom.getCreationDate().toString("dd-MM-yy HH:mm") + '</span>' +
        '</div>' +
        '</li>'
    );

    var item = $("#" + itemId);
    var joinBtn = $("#" + joinBtnId);

    joinBtn.click(function () {
        eventBus.emitMessage(new AttemptedToEnterChat(chatroom).toMessage());
    });

    item.mouseover(function () {
        joinBtn.show()
    });

    item.mouseout(function () {
        joinBtn.hide();
    });

};