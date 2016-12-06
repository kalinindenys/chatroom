var ChatRoomWidgetItemComponent = function (eventBus, commandBus, rootDivId, chatRoom, user) {
    var chatRoomWidgetItemComponentId = rootDivId + "_chatRoomWidgetItem_" + chatRoom.id;
    var widgetItemMessageList = chatRoomWidgetItemComponentId + "_messageList";
    var widgetItemSendButtonId = chatRoomWidgetItemComponentId + "_sendButton";
    var widgetItemLeaveButtonId = chatRoomWidgetItemComponentId + "_leaveButton";
    var widgetItemMessageTextAreaId = chatRoomWidgetItemComponentId + "_messageTextArea";
    var chatRoomName = chatRoom.name;
    var userNum = chatRoom.users.length;

    $("#" + rootDivId).append('<div class="widget-chat-room"><div class="panel panel-info">' +
        '<div class="panel-heading" style="height:  70px">' +
        '<h1 class="panel-title">' + chatRoomName + '</h1>' +
        '<button id="+widgetItemLeaveButtonId+" class="btn btn-info" type="button" style="float: right">Leave</button>' +
        'Users: ' + userNum + '</div > ' +
        '<div class="panel-body" style="overflow-y: scroll">' +
        '<ul id=' + widgetItemMessageList + ' class="list-group" style="height:300px"></ul>' +
        '</div><div class="panel-footer">' +
        '<div class="input-group">' +
        '<textarea id=' + widgetItemMessageTextAreaId + ' class="form-control" placeholder="Message" style="max-width: 310"></textarea>' +
        '<span class="input-group-btn"> <button id=' + widgetItemSendButtonId + ' class="btn btn-info" type="submit">Post</button>' +
        '</span></div></div></div></div>'
    )
    ;

    $("#" + widgetItemSendButtonId).on('click', function () {
        var formattedMessage = $("#" + widgetItemMessageTextAreaId).val().replace('<','&lt;').replace('>','&gt;').replace(/\r?\n/g, '<br />');
        var message = "[" + _formatDate() + "] " + "<strong>" + user + "</strong>" + " said: " + formattedMessage;
        $('#' + widgetItemMessageList).append('<li class="list-group-item">' + message + '</li>');

        //todo: FINISH
    });

    function _formatDate() {
        var chatRoomDate = new Date();
        var day = chatRoomDate.getDate();
        var month = chatRoomDate.getMonth() + 1;
        var year = chatRoomDate.getFullYear();
        var hours = chatRoomDate.getHours();
        var minutes = ("0" + chatRoomDate.getMinutes()).slice(-2);
        return day + "-" + month + "-" + year + " " + hours + ":" + minutes;
    }


};
