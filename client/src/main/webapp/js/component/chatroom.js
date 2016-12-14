var ChatroomComponent = function (rootElementId, chatroomSession, commandBus, eventBus) {

    var template = document.querySelector('#chatroomTemplate').import.querySelector("template").innerHTML;
    var view = {
        messagesId: rootElementId + "_messages",
        messageInputId: rootElementId + "_message",
        leaveBtnId: rootElementId + "_leaveBtn",
        postMessageBtnId: rootElementId + "_postMessageBtn",
        chatroomName: chatroomSession.getChatroom().getName(),
        guestsNumber: chatroomSession.getChatroom().getGuests().length,
        messages: sortMessages(chatroomSession.getChatroom().getMessages()),
        formattedMessage: {
            postTime: function () {
                return this.getPostTime().toString("dd-MM-yy HH:mm");
            },
            authorNickname: function () {
                return this.getAuthorNickname();
            },
            message: function () {
                return this.getMessage();
            }
        }
    };

    var messageInput;
    var postMessageBtn;

    Mustache.parse(template);

    var updateView = function (updatedChatroom) {
        if (chatroomSession.getChatroom().getId() === updatedChatroom.getId()) {
            view.chatroomName = updatedChatroom.getName();
            view.guestsNumber = updatedChatroom.getGuests().length;
            view.messages = sortMessages(updatedChatroom.getMessages());

            renderTemplate();
            scrollMessages();
        }
    };

    var onMessageInputChanged = function () {
        var messageIsEmpty = (messageInput.val().trim().length === 0);
        postMessageBtn.prop("disabled", messageIsEmpty);
        postMessageBtn.toggleClass("disabled", messageIsEmpty);
    };

    var onPostMessageBtnClick = function () {
        var message = new ChatroomMessageDTO(
            chatroomSession.getChatroom().getId(), chatroomSession.getNickname(), messageInput.val(), new Date());

        commandBus.emitMessage(new PostMessage(message).toMessage());

        messageInput.val('');
        postMessageBtn.addClass("disabled");
        postMessageBtn.prop("disabled", true);
    };

    var onLeaveBtnClick = function () {
        var joinChatroomInfo = new JoinChatroomInfo(chatroomSession.getNickname(), chatroomSession.getChatroom().getId());
        commandBus.emitMessage(new LeaveFromChatroom(joinChatroomInfo).toMessage());
    };

    var renderTemplate = function() {
        var html = Mustache.render(template, view);
        $("#" + rootElementId).html(html);

        messageInput = $("#" + view.messageInputId);
        postMessageBtn = $("#" + view.postMessageBtnId);

        messageInput.keyup(onMessageInputChanged);
        postMessageBtn.click(onPostMessageBtnClick);
        $("#" + view.leaveBtnId).click(onLeaveBtnClick);
    };

    var scrollMessages = function () {
        var messages = document.getElementById(view.messagesId);
        messages.scrollTop = messages.scrollHeight;
    };

    function sortMessages(messages) {
        return messages.sort(function (first, second) {
            return first.getPostTime() - second.getPostTime();
        });
    }

    updateView(chatroomSession.getChatroom());

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