var JoinChatComponent = function (rootElementId, commandBus, eventBus) {

    var panelId = rootElementId + "_joinchat";
    var chatroomNameId = panelId + "_chatroomName";
    var nicknameId = panelId + "_nickname";
    var cancelBtnId = panelId + "_cancelBtn";
    var enterBtnId = panelId + "_enterBtn";

    $("#" + rootElementId).html(
        '<div class="panel panel-default" style="display: none" id="' + panelId + '">' +
        '<div class="panel-heading" id="' + chatroomNameId + '"></div>' +
        '<div class="panel-body">' +
        '<label for' + nicknameId + '>Join as:</label>' +
        '<input id="' + nicknameId + '" type="text" class="form-control" placeholder="Your nickname">' +
        '</div>' +
        '<div class="panel-footer clearfix">' +
        '<div class="btn-group pull-right">' +
        '<button id="' + enterBtnId + '" class="btn btn-default btn-sm" type="button" style="visibility: hidden">Enter</button>' +
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
        var nicknameValidationInfo = new NicknameValidationInfo(trimmedNickname, chatroomName.html());

        commandBus.emitMessage(new ValidateNickname(nicknameValidationInfo).toMessage());
    });

    $("#" + cancelBtnId).click(function () {
        hidePopup();
    });

    enterBtn.click(function () {
        hidePopup();
        hideEnterBtn();

        var enterChatroomInfo = new EnterChatroomInfo(nickname.val().trim(), chatroomName.html());

        commandBus.emitMessage(new EnterToChatroom(enterChatroomInfo).toMessage());
    });

    var showPopup = function (chatroom) {
        nickname.val('');
        chatroomName.html(chatroom.name);
        panel.show();
    };

    var hidePopup = function () {
        panel.hide();
    };

    var showEnterBtn = function () {
        enterBtn.css("visibility", "visible");
    };

    var hideEnterBtn = function () {
        enterBtn.css("visibility", "hidden");
    };

    commandBus.subscribe(Commands.SHOW_JOIN_CHAT_POPUP, showPopup);

    eventBus.subscribe(Events.NICKNAME_VALIDATION_SUCCESS, showEnterBtn);
    eventBus.subscribe(Events.NICKNAME_VALIDATION_FAIL, hideEnterBtn);

};