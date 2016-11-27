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

    // nickname.keyup(function () {
    //    var trimmedNickname = nickname.val().trim();
    //
    //     if (validNickname(trimmedNickname, chatroom)) {
    //         $("#" + enterBtnId).css("visibility", "visible");
    //     } else {
    //         $("#" + enterBtnId).css("visibility", "hidden");
    //     }
    // });

    $("#" + cancelBtnId).click(function () {
        hide();
    });

    $("#" + enterBtnId).click(function () {
        hide();
        new ChatroomComponent(commandBus, eventBus);
        // commandBus.emitMessage(new EnterToChatroom(nickname.val().trim(), chatroom).toMessage());
    });
    
    // var validNickname = function (nickname, chatroom) {
    //     if (nickname.length === 0) {
    //         return false;
    //     }
    //
    //     for (i = 0; i < chatroom.guests.length; i++) {
    //         if (chatroom.guests[i] === nickname) {
    //             return false;
    //         }
    //     }
    //
    //     return true;
    // };

    var show = function (chatroom) {
        nickname.val('');
        chatroomName.html(chatroom.name);
        panel.toggle();
    };

    var hide = function () {
        panel.toggle();
    };

    commandBus.subscribe(Commands.SHOW_JOIN_CHAT_POPUP, show);

};