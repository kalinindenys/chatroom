var JoinChatComponent = function (chatroom, rootElementId, commandBus, eventBus) {

    // var chatroomNameId = rootElementId + "_chatroomName";
    var nicknameId = rootElementId + "_nickname";
    var cancelBtnId = rootElementId + "_cancelBtn";
    var enterBtnId = rootElementId + "_enterBtn";

    $("#" + rootElementId).html(
        '<h3>' + chatroom.name + '</h3>' +
        '<form>' +
        '<div class="form-group">' +
        '<label for' + nicknameId + '>Nickname:</label>' +
        '<input id="' + nicknameId + '" type="text" class="form-control" placeholder="Your nickname">' +
        '</div>' +
        '<button id="' + enterBtnId + '" class="btn btn-default" type="button" style="visibility: hidden">Enter</button>' +
        '<button id="' + cancelBtnId + '" class="btn btn-default" type="button">Cancel</button>' +
        '</form>'
    );

    var nickname = $("#" + nicknameId);

    nickname.keydown(function (event) {
       var trimmedNickname = nickname.val().trim();

        if (trimmedNickname.length > 0 && !chatroom.guests[trimmedNickname]) {
            $("#" + enterBtnId).css("visibility", "visible");
        } else {
            $("#" + enterBtnId).css("visibility", "hidden");
        }
    });

    $("#" + cancelBtnId).click(function () {
        $("#" + rootElementId).html('');
    });

    $("#" + enterBtnId).click(function () {
        commandBus.emitMessage(new EnterToChatroom(nickname.val(), chatroom));
    });
    
    var validNickname = function () {
        
    }

};