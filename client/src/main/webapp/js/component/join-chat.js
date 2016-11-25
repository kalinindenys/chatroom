var JoinChatComponent = function (chatroom, rootElementId, commandBus, eventBus) {

    var nicknameId = rootElementId + "_nickname";
    var cancelBtnId = rootElementId + "_cancelBtn";
    var enterBtnId = rootElementId + "_enterBtn";

    var rootElement = $("#" + rootElementId);

    rootElement.html(
        '<div class="panel panel-default">' +
        '<div class="panel-heading">' + chatroom.name + '</div>' +
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

    var nickname = $("#" + nicknameId);

    nickname.keyup(function () {
       var trimmedNickname = nickname.val().trim();

        if (validNickname(trimmedNickname, chatroom)) {
            $("#" + enterBtnId).css("visibility", "visible");
        } else {
            $("#" + enterBtnId).css("visibility", "hidden");
        }
    });

    $("#" + cancelBtnId).click(function () {
        destroy();
    });

    $("#" + enterBtnId).click(function () {
        destroy();
        new ChatroomComponent(commandBus, eventBus);
        // commandBus.emitMessage(new EnterToChatroom(nickname.val().trim(), chatroom).toMessage());
    });

    var destroy = function () {
        rootElement.html('');
    };
    
    var validNickname = function (nickname, chatroom) {
        if (nickname.length === 0) {
            return false;
        }

        for (i = 0; i < chatroom.guests.length; i++) {
            if (chatroom.guests[i] === nickname) {
                return false;
            }
        }

        return true;
    }

};