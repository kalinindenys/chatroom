var ChatroomComponent = function (rootElementId, chatroomSession, commandBus, eventBus) {

    var guestsNumberId = rootElementId + "_guestsNumber";
    var messagesId = rootElementId + "_messages";
    var messageInputId = rootElementId + "message";
    var leaveBtnId = rootElementId + "_leaveBtn";
    var postMessageBtnId = rootElementId + "_postMessageBtn";

    var rootElement = $("#" + rootElementId);
    var chatroom = chatroomSession.getChatroom();

    rootElement.append(
        '<div class="panel panel-default">' +
        '<div class="panel-heading clearfix">' +
        '<h4 class="panel-title pull-left" style="padding-top: 7px;">' + chatroom.getName() + '</h4>' +
        '<div class="pull-right">' +
        '<span style="padding-right: 10px">guests: <span id="' + guestsNumberId + '" ></span></span>' +
        '<button class="btn btn-default btn-sm" id="' + leaveBtnId + '">Leave</button>' +
        '</div>' +
        '</div>' +
        '<ul class="panel-body list-group scrollable" style="height: 340px" id="' + messagesId + '"></ul>' +
        '<div class="panel-footer input-group">' +
        '<textarea class="form-control" placeholder="Your message..." style="resize: none" id="' + messageInputId + '"></textarea>' +
        '<span class="input-group-btn">' +
        '<button class="btn btn-default disabled" disabled type="button" id="' + postMessageBtnId + '">Post</button>' +
        '</span>' +
        '</div>' +
        '</div>'
    );

    var messageInput = $("#" + messageInputId);
    var postMessageBtn = $("#" + postMessageBtnId);
    var messagesList = $("#" + messagesId);

    updateView(chatroom);

    messageInput.keyup(function () {
        var messageIsEmpty = (messageInput.val().trim().length === 0);
        postMessageBtn.prop("disabled", messageIsEmpty);
        postMessageBtn.toggleClass("disabled", messageIsEmpty);
    });

    $("#" + leaveBtnId).click(function () {
        var joinChatroomInfo = new JoinChatroomInfo(chatroomSession.getNickname(), chatroomSession.getChatroom().getId());
        commandBus.emitMessage(new LeaveFromChatroom(joinChatroomInfo).toMessage());
    });

    postMessageBtn.click(function () {
        var message = new ChatroomMessageDTO(chatroom.getId(), chatroomSession.getNickname(), messageInput.val(), new Date());

        commandBus.emitMessage(new PostMessage(message).toMessage());

        messageInput.val('');
        postMessageBtn.addClass("disabled");
        postMessageBtn.prop("disabled", true);
    });

    function updateView(updatedChatroom) {
        if (chatroom.getId() === updatedChatroom.getId()) {
            $("#" + guestsNumberId).html(chatroom.getGuests().length);

            if (updatedChatroom.getMessages().length === 0) {
                messagesList.html('No messages yet');
            } else {
                var sortedMessages = sortMessages(updatedChatroom.getMessages());

                messagesList.html('');
                for (var i = 0; i < sortedMessages.length; i++) {
                    var messageItemId = rootElementId + "_" + i;

                    messagesList.append(
                        '<li class="list-group-item">' +
                        '<span>[' + sortedMessages[i].getPostTime().toString("dd-MM-yy HH:mm") + '] </span>' +
                        '<span><b>' + sortedMessages[i].getAuthorNickname() + '</b> said: </span>' +
                        '<span id="' + messageItemId + '"></span>' +
                        '</li>'
                    );

                    var messageItem = $("#" + messageItemId);
                    messageItem.text(sortedMessages[i].getMessage());
                    messageItem.html(messageItem.html().split("\n").join("<br>"));
                }
            }
        }
    }

    function sortMessages(messages) {
        return messages.sort(function (first, second) {
            return first.getPostTime() - second.getPostTime();
        });
    }

    var subscriptionId = eventBus.subscribe(Events.CHATROOM_UPDATED, updateView);

    eventBus.subscribe(Events.USER_LEFT_CHAT, function (joinChatroomInfo) {
        if (chatroomSession.getNickname() === joinChatroomInfo.getNickname()) {
            eventBus.unsubscribe(subscriptionId);
        }
    });

};

ChatroomComponent.createFor = function (rootElementId, chatroomSession, commandBus, eventBus) {
    return new ChatroomComponent(rootElementId, chatroomSession, commandBus, eventBus);
};