var ChatroomComponent = function (rootElementId, chatroom, nickname, commandBus, eventBus) {

    var guestsNumberId = rootElementId + "_guestsNumber";
    var messagesId = rootElementId + "_messages";
    var messageInputId = rootElementId + "message";
    var leaveBtnId = rootElementId + "_leaveBtn";
    var postMessageBtnId = rootElementId + "_postMessageBtn";

    var rootElement = $("#" + rootElementId);

    rootElement.append(
        '<div class="panel panel-default">' +
        '<div class="panel-heading clearfix">' +
        '<h4 class="panel-title pull-left" style="padding-top: 7px;">' + chatroom.name + '</h4>' +
        '<div class="pull-right">' +
        '<span style="padding-right: 10px">guests: <span id="' + guestsNumberId + '" ></span></span>' +
        '<button class="btn btn-default btn-sm" id="' + leaveBtnId + '">Leave</button>' +
        '</div>' +
        '</div>' +
        '<ul class="panel-body list-group scrollable" style="height: 340px" id="' + messagesId + '"></ul>' +
        '<div class="panel-footer input-group">' +
        '<textarea class="form-control" placeholder="Your message..." style="resize: none" id="' + messageInputId + '"></textarea>' +
        '<span class="input-group-btn">' +
        '<button class="btn btn-default disabled" type="button" id="' + postMessageBtnId + '">Post</button>' +
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
        postMessageBtn.toggleClass("disabled", messageIsEmpty);
    });

    $("#" + leaveBtnId).click(function () {
        var enterChatroomInfo = new EnterChatroomInfo(nickname, chatroom.name);
        commandBus.emitMessage(new LeaveFromChatroom(enterChatroomInfo).toMessage());
    });

    postMessageBtn.click(function () {
        var formattedMessage = messageInput.val();
        var message = new ChatroomMessage(nickname, formattedMessage);

        commandBus.emitMessage(new PostMessage(new MessageDTO(chatroom.name, message)).toMessage());

        messageInput.val('');
        postMessageBtn.addClass("disabled");
    });

    function updateView(updatedChatroom) {
        if (chatroom.name === updatedChatroom.name) {
            $("#" + guestsNumberId).html(chatroom.guests.length);

            if (updatedChatroom.messages.length === 0) {
                messagesList.html('No messages yet');
            } else {
                var sortedMessages = sortMessages(updatedChatroom.messages);

                messagesList.html('');
                for (i = 0; i < sortedMessages.length; i++) {
                    var formattedMessage = sortedMessages[i].message.split("\n").join("<br>");

                    messagesList.append(
                        '<li class="list-group-item">' +
                        '<span>[' + sortedMessages[i].postTime.toString("dd-MM-yy HH:mm") + '] </span>' +
                        '<span><b>' + sortedMessages[i].authorNickname + '</b> said: </span>' +
                        '<span>' + formattedMessage + '</span>' +
                        '</li>'
                    );
                }
            }
        }
    }

    function sortMessages(messages) {
        return messages.sort(function (first, second) {
            return first.postTime - second.postTime;
        });
    }

    eventBus.subscribe(Events.CHATROOM_UPDATED, updateView);

};