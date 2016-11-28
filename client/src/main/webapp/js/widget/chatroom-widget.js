var ChatroomWidget = function (rootElementId, chatroomService, commandBus, eventBus) {

    var rootElement = $("#" + rootElementId);

    var createChatroomComponent = function (enterChatroomInfo) {
        var chatroom = chatroomService.findByName(enterChatroomInfo.getChatroomName());
        var nickname = enterChatroomInfo.getNickname();
        var newComponentId = generateComponentId(nickname);

        rootElement.append('<div id="' + newComponentId + '"></div>');

        new ChatroomComponent(newComponentId, chatroom, nickname, commandBus, eventBus);
    };

    var destroyChatroomComponent = function (enterChatroomInfo) {
        $("#" + generateComponentId(enterChatroomInfo.getNickname())).remove();
    };

    var generateComponentId = function (nickname) {
        return rootElementId + "_" + nickname;
    };

    commandBus.subscribe(Commands.ENTER_TO_CHATROOM, createChatroomComponent);
    commandBus.subscribe(Commands.LEAVE_FROM_CHATROOM, destroyChatroomComponent);

};