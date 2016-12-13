var ChatroomListItem = function (rootElementId, chatroom, commandBus) {

    var itemId = rootElementId + "_" + $("#" + rootElementId + " li").length;
    var template = document.querySelector('#chatroomListItemTemplate').import.querySelector("template").innerHTML;
    var view = {
        itemId: itemId,
        joinBtnId: itemId + "_joinBtnId",
        chatroomName: chatroom.getName(),
        creationDate: chatroom.getCreationDate().toString("dd-MM-yy HH:mm")
    };

    var html = Mustache.render(template, view);
    $("#" + rootElementId).append(html);

    var item = $("#" + view.itemId);
    var joinBtn = $("#" + view.joinBtnId);

    joinBtn.click(function () {
        commandBus.emitMessage(new TryJoinToChatroom(chatroom).toMessage());
    });

    item.mouseover(function () {
        joinBtn.show();
    });

    item.mouseout(function () {
        joinBtn.hide();
    });

};

ChatroomListItem.createFor = function (rootElementId, chatroom, commandBus) {
    new ChatroomListItem(rootElementId, chatroom, commandBus);
};