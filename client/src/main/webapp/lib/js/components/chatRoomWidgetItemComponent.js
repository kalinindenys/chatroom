var ChatRoomWidgetItemComponent = function (eventBus, commandBus, rootDivId, chatRoom, user,messages) {
    var chatRoomWidgetItemComponentId = rootDivId + "_chatRoomWidgetItem_" + chatRoom.id + "_" + user.id;
    var widgetItemMessageList = chatRoomWidgetItemComponentId + "_messageList";
    var widgetItemPostButtonId = chatRoomWidgetItemComponentId + "_postButton";
    var widgetItemLeaveButtonId = chatRoomWidgetItemComponentId + "_leaveButton";
    var widgetItemMessageTextAreaId = chatRoomWidgetItemComponentId + "_messageTextArea";
    var widgetItemUserNumberInfoId = chatRoomWidgetItemComponentId + "_userNumInfo";
    var chatRoomName = chatRoom.name;
    var userNumber = chatRoom.userIds.length;
    var formatter = new DateFormatter();

    $("#" + rootDivId).append('<div class="widget-chat-room" id=' + chatRoomWidgetItemComponentId + '><div class="panel panel-info">' +
        '<div class="panel-heading" style="height:  70px">' +
        '<h1 class="panel-title">' + chatRoomName + '</h1>' +
        '<button id=' + widgetItemLeaveButtonId + ' class="btn btn-info" type="button" style="float: right">Leave</button>' +
        '<label id=' + widgetItemUserNumberInfoId + '>Users: ' + userNumber + '</label></div > ' +
        '<div class="panel-body" style="overflow-y: scroll">' +
        '<ul id=' + widgetItemMessageList + ' class="list-group" style="height:300px"></ul>' +
        '</div><div class="panel-footer">' +
        '<div class="input-group">' +
        '<textarea id=' + widgetItemMessageTextAreaId + ' class="form-control" placeholder="Message" style="max-width: 310px"></textarea>' +
        '<span class="input-group-btn"> <button disabled id=' + widgetItemPostButtonId + ' class="btn btn-info" type="submit">Post</button>' +
        '</span></div></div></div></div>'
    );
    _populateMessages();

    function _renderMessage(messageDto) {
        var message = "[" + formatter.formatDate(messageDto.date) + "] " + "<strong>" + messageDto.username + "</strong>" + " said: " + messageDto.content;
        $('#' + widgetItemMessageList).append('<li class="list-group-item">' + message + '</li>');
    }

    function _postMessage(evt) {
        if (evt.data.chatRoomDto.id == chatRoom.id) {
            var messageDto = evt.data.messageDto;
            $('#' + widgetItemMessageTextAreaId).val('');
            $("#" + widgetItemPostButtonId).prop("disabled", true);
            _renderMessage(messageDto);
        }
    }

    $("#" + widgetItemPostButtonId).on('click', function () {
        var content = $("#" + widgetItemMessageTextAreaId).val();
        var messageDto = new MessageDto(null, user.id, user.name, chatRoom.id, content, new Date());
        var command = new PostMessageCommand(messageDto);
        commandBus.emit(command.toMessage());
        //todo: MODIFY
    });

    $("#" + widgetItemLeaveButtonId).on('click', function () {
        LeaveConfirmationDialogComponent.init(commandBus, rootDivId, user, chatRoomName);
    });

    $("#" + widgetItemMessageTextAreaId).on("input", function () {
        var message = $("#" + widgetItemMessageTextAreaId).val().trim();
        var isDisabled = message.length < 1;
        $("#" + widgetItemPostButtonId).prop("disabled", isDisabled);
    });

    function _populateMessages() {
        for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            _renderMessage(message);
        }
    }

    function _updateUserNumber(evt) {
        var updatedChatRoomDto = evt.data;
        var users = updatedChatRoomDto.userIds;
        if (updatedChatRoomDto.id === chatRoom.id) {
            $('#' + widgetItemUserNumberInfoId).html('').append('Users: ' + users.length);
        }
    }

    eventBus.subscribe(Events.USER_NUMBER_UPDATED, _updateUserNumber);
    eventBus.subscribe(Events.MESSAGE_POSTED, _postMessage);

    return {
        "getUserId": user.id,
        "getChatRoomId": chatRoom.id,
        "getItemId": chatRoomWidgetItemComponentId
    }

};
ChatRoomWidgetItemComponent.init = function (eventBus, commandBus, rootDivId, chatRoom, user,messages) {
    return new ChatRoomWidgetItemComponent(eventBus, commandBus, rootDivId, chatRoom, user,messages);
};

