var ChatRoomWidgetItemComponent = function (eventBus, commandBus, rootDivId, chatRoom, user) {
    var chatRoomWidgetItemComponentId = rootDivId + "_chatRoomWidgetItem_" + chatRoom.id + "_" + user;
    var widgetItemMessageList = chatRoomWidgetItemComponentId + "_messageList";
    var widgetItemSendButtonId = chatRoomWidgetItemComponentId + "_postButton";
    var widgetItemLeaveButtonId = chatRoomWidgetItemComponentId + "_leaveButton";
    var widgetItemMessageTextAreaId = chatRoomWidgetItemComponentId + "_messageTextArea";
    var widgetItemUserNumInfoId = chatRoomWidgetItemComponentId + "_userNumInfo";
    var chatRoomName = chatRoom.name;
    var userNum = chatRoom.users.length;

    $("#" + rootDivId).append('<div class="widget-chat-room" id=' + chatRoomWidgetItemComponentId + '><div class="panel panel-info">' +
        '<div class="panel-heading" style="height:  70px">' +
        '<h1 class="panel-title">' + chatRoomName + '</h1>' +
        '<button id=' + widgetItemLeaveButtonId + ' class="btn btn-info" type="button" style="float: right">Leave</button>' +
        '<label id=' + widgetItemUserNumInfoId + '>Users: ' + userNum + '</label></div > ' +
        '<div class="panel-body" style="overflow-y: scroll">' +
        '<ul id=' + widgetItemMessageList + ' class="list-group" style="height:300px"></ul>' +
        '</div><div class="panel-footer">' +
        '<div class="input-group">' +
        '<textarea id=' + widgetItemMessageTextAreaId + ' class="form-control" placeholder="Message" style="max-width: 310"></textarea>' +
        '<span class="input-group-btn"> <button disabled id=' + widgetItemSendButtonId + ' class="btn btn-info" type="submit">Post</button>' +
        '</span></div></div></div></div>'
    );

    function _putMessage(messageToPut, username) {
        var message = "[" + _formatDate() + "] " + "<strong>" + username + "</strong>" + " said: " + messageToPut;
        $('#' + widgetItemMessageList).append('<li class="list-group-item">' + message + '</li>');

        //todo: FINISH
    }

    $("#" + widgetItemSendButtonId).on('click', function () {
        var message = $("#" + widgetItemMessageTextAreaId).val().replace('<', '&lt;').replace('>', '&gt;').replace(/\r?\n/g, '<br />');
        _putMessage(message, user);
        //todo: MODIFY
    });

    $("#" + widgetItemLeaveButtonId).on('click', function () {
        var commandData = {"chatRoomName": chatRoomName, "nickname": user};
        command = new LeaveChatRoomCommand(commandData);
        commandBus.emit(command.toMessage());
    });

    $("#" + widgetItemMessageTextAreaId).on("input", function () {
        var message = $("#" + widgetItemMessageTextAreaId).val().trim();
        var isDisabled = message.length < 1;
        $("#" + widgetItemSendButtonId).prop("disabled", isDisabled);
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

    function _updateUserNum(evt) {
        var updatedChatRoomName = evt.data.chatRoomName;
        var users = evt.data.users;
        if (updatedChatRoomName === chatRoomName) {
            $('#' + widgetItemUserNumInfoId).html('').append('Users: ' + users.length);
            if (jQuery.inArray(user, users) == -1) {
                $('#' + chatRoomWidgetItemComponentId).html('');
            }
        }
    }

    eventBus.subscribe(Events.UPDATE_USER_NUMBER, _updateUserNum);


};
