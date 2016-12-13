var JoinChatComponent = function (rootElementId, commandBus, eventBus) {

    var panelId = rootElementId + "_joinchat";
    var chatroomId;
    var template = document.querySelector('#joinChatTemplate').import.querySelector("template").innerHTML;
    var view = {
        panelId: panelId,
        chatroomNameId: panelId + "_chatroomName",
        nicknameId: panelId + "_nickname",
        cancelBtnId: panelId + "_cancelBtn",
        enterBtnId: panelId + "_enterBtn"
    };

    var html = Mustache.render(template, view);
    $("#" + rootElementId).html(html);

    var panel = $("#" + view.panelId);
    var chatroomName = $("#" + view.chatroomNameId);
    var nickname = $("#" + view.nicknameId);
    var enterBtn = $("#" + view.enterBtnId);

    nickname.keyup(function () {
        var nicknameValidationInfo = new JoinChatroomInfo(nickname.val(), chatroomId);

        commandBus.emitMessage(new ValidateNickname(nicknameValidationInfo).toMessage());
    });

    $("#" + view.cancelBtnId).click(function () {
        hidePopup();
    });

    enterBtn.click(function () {
        hidePopup();

        var joinChatroomInfo = new JoinChatroomInfo(nickname.val(), chatroomId);

        commandBus.emitMessage(new JoinToChatroom(joinChatroomInfo).toMessage());
    });

    var showPopup = function (chatroom) {
        nickname.val('');
        chatroomId = chatroom.getId();
        chatroomName.html(chatroom.getName());
        panel.show();
    };

    var hidePopup = function () {
        panel.hide();
        hideEnterBtn();
    };

    var showEnterBtn = function () {
        enterBtn.show();
    };

    var hideEnterBtn = function () {
        enterBtn.hide();
    };

    eventBus.subscribe(Events.JOIN_CHATROOM_ACCESS_GRANTED, showPopup);
    eventBus.subscribe(Events.NICKNAME_VALIDATION_SUCCESS, showEnterBtn);
    eventBus.subscribe(Events.NICKNAME_VALIDATION_FAIL, hideEnterBtn);

};

JoinChatComponent.createFor = function (popupId, commandBus, eventBus) {
    new JoinChatComponent(popupId, commandBus, eventBus);
};