var ChatRoomWidgetItemComponent = function (eventBus, commandBus, rootDivId, chatRoom, user) {
    var chatRoomWidgetItemComponentId = rootDivId + "_chatRoomWidgetItem_" + chatRoom.id + "_" + user;
    var widgetItemMessageList = chatRoomWidgetItemComponentId + "_messageList";
    var widgetItemPostButtonId = chatRoomWidgetItemComponentId + "_postButton";
    var widgetItemLeaveButtonId = chatRoomWidgetItemComponentId + "_leaveButton";
    var widgetItemMessageTextAreaId = chatRoomWidgetItemComponentId + "_messageTextArea";
    var widgetItemUserNumInfoId = chatRoomWidgetItemComponentId + "_userNumInfo";
    var chatRoomName = chatRoom.name;
    var userNumber = chatRoom.users.length;
    var formatter = new DateFormatter();

    $("#" + rootDivId).append('<div class="widget-chat-room" id=' + chatRoomWidgetItemComponentId + '><div class="panel panel-info">' +
        '<div class="panel-heading" style="height:  70px">' +
        '<h1 class="panel-title">' + chatRoomName + '</h1>' +
        '<button id=' + widgetItemLeaveButtonId + ' class="btn btn-info" type="button" style="float: right">Leave</button>' +
        '<label id=' + widgetItemUserNumInfoId + '>Users: ' + userNumber + '</label></div > ' +
        '<div class="panel-body" style="overflow-y: scroll">' +
        '<ul id=' + widgetItemMessageList + ' class="list-group" style="height:300px"></ul>' +
        '</div><div class="panel-footer">' +
        '<div class="input-group">' +
        '<textarea id=' + widgetItemMessageTextAreaId + ' class="form-control" placeholder="Message" style="max-width: 310px"></textarea>' +
        '<span class="input-group-btn"> <button disabled id=' + widgetItemPostButtonId + ' class="btn btn-info" type="submit">Post</button>' +
        '</span></div></div></div></div>'
    );
    _populateMessages();

    function _renderMessage(messageToPost, username, date) {
        var message = "[" + formatter.formatDate(date) + "] " + "<strong>" + username + "</strong>" + " said: " + messageToPost;
        $('#' + widgetItemMessageList).append('<li class="list-group-item">' + message + '</li>');
    }

    function _postMessage(evt) {
        var messages = evt.data.chatRoom.messages;
        var messageToPost = messages[messages.length - 1];
        var author = messageToPost.user;
        var messageDate = messageToPost.date;
        $('#' + widgetItemMessageTextAreaId).val('');
        $("#" + widgetItemPostButtonId).prop("disabled", true);
        _renderMessage(messageToPost.content, author, messageDate);
    }

    $("#" + widgetItemPostButtonId).on('click', function () {
        var content = $("#" + widgetItemMessageTextAreaId).val();
        var message = new MessageDto(user, content, new Date());
        var commandData = {"chatRoomName": chatRoomName, "message": message};
        var command = new PostMessageCommand(commandData);
        commandBus.emit(command.toMessage());
        //todo: MODIFY
    });

    $("#" + widgetItemLeaveButtonId).on('click', function () {
        var chatRoomMember = new ChatRoomMember(chatRoomName, user);
        var confirmDialog = new LeaveConfirmationDialogComponent(commandBus, rootDivId, chatRoomMember);
        confirmDialog.init();
    });

    $("#" + widgetItemMessageTextAreaId).on("input", function () {
        var message = $("#" + widgetItemMessageTextAreaId).val().trim();
        var isDisabled = message.length < 1;
        $("#" + widgetItemPostButtonId).prop("disabled", isDisabled);
    });

    function _populateMessages() {
        for (var i = 0; i < chatRoom.messages.length; i++) {
            var message = chatRoom.messages[i];
            _renderMessage(message.content, message.user, message.date);
        }
    }

    function _updateUserNumber(evt) {
        var updatedChatRoomName = evt.data.chatRoomName;
        var users = evt.data.users;
        if (updatedChatRoomName === chatRoomName) {
            $('#' + widgetItemUserNumInfoId).html('').append('Users: ' + users.length);
            if (jQuery.inArray(user, users) == -1) {
                $('#' + chatRoomWidgetItemComponentId).remove();
            }
        }
    }

    eventBus.subscribe(Events.USER_NUMBER_UPDATED, _updateUserNumber);
    eventBus.subscribe(Events.MESSAGE_POSTED, _postMessage);


};
