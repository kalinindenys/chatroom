var JoinChatComponent = function (rootElementId, commandBus, eventBus) {

    var panelId = rootElementId + "_joinchat";
    var chatroomNameId = panelId + "_chatroomName";
    var nicknameId = panelId + "_nickname";
    var cancelBtnId = panelId + "_cancelBtn";
    var enterBtnId = panelId + "_enterBtn";

    var chatroomId;

    $("#" + rootElementId).html(
        '<div class="panel panel-default" style="display: none" id="' + panelId + '">' +
        '<div class="panel-heading" id="' + chatroomNameId + '"></div>' +
        '<div class="panel-body">' +
        '<label for' + nicknameId + '>Join as:</label>' +
        '<input id="' + nicknameId + '" type="text" class="form-control" placeholder="Your nickname">' +
        '</div>' +
        '<div class="panel-footer clearfix">' +
        '<div class="btn-group pull-right">' +
        '<button id="' + enterBtnId + '" class="btn btn-default btn-sm" type="button" style="display: none">Enter</button>' +
        '<button id="' + cancelBtnId + '" class="btn btn-default btn-sm" type="button">Cancel</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    var panel = $("#" + panelId);
    var chatroomName = $("#" + chatroomNameId);
    var nickname = $("#" + nicknameId);
    var enterBtn = $("#" + enterBtnId);

    nickname.keyup(function () {
        var trimmedNickname = nickname.val().trim();
        var nicknameValidationInfo = new EnterChatroomInfo(trimmedNickname, chatroomId);

        commandBus.emitMessage(new ValidateNickname(nicknameValidationInfo).toMessage());
    });

    $("#" + cancelBtnId).click(function () {
        hidePopup();
    });

    enterBtn.click(function () {
        hidePopup();
        hideEnterBtn();

        var nick = nickname.val().trim();
        var enterChatroomInfo = new EnterChatroomInfo(nickname.val().trim(), chatroomId);

        commandBus.emitMessage(new EnterToChatroom(enterChatroomInfo).toMessage());
    });

    var showPopup = function (chatroom) {
        chatroomId = chatroom.id;
        chatroomName.html(chatroom.name);
        nickname.val('');
        panel.show();
    };

    var hidePopup = function () {
        panel.hide();
    };

    var showEnterBtn = function () {
        enterBtn.show();
    };

    var hideEnterBtn = function () {
        enterBtn.hide();
    };

    commandBus.subscribe(Commands.SHOW_JOIN_CHAT_POPUP, showPopup);

    eventBus.subscribe(Events.NICKNAME_VALIDATION_SUCCESS, showEnterBtn);
    eventBus.subscribe(Events.NICKNAME_VALIDATION_FAIL, hideEnterBtn);

};