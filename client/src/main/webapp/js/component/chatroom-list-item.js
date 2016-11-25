var ChatroomListItem = function (rootElementId, popupId, chatroom, commandBus, eventBus) {

    var itemId = rootElementId + "_" + $("#" + rootElementId + " li").length;
    var joinBtnId = itemId + "_joinBtnId";

    $("#" + rootElementId).append(
        '<li id="' + itemId + '" class="list-group-item clearfix">' +
        chatroom.name +
        '<button class="btn btn-default btn-sm" style="visibility: hidden" id="' + joinBtnId + '">Join</button>' +
        '<span class="badge">' + formatDate(chatroom.creationDate) + '</span>' +
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

    function formatDate(date) {
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        // return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }

};