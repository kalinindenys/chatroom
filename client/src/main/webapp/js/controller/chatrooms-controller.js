var ChatroomsController = function (rootElementId, chatroomService, commandBus, eventBus) {

    var rootElement = $("#" + rootElementId);

    var createChatroomComponent = function (enterChatroomInfo) {
        var chatroom = chatroomService.findById(enterChatroomInfo.getChatroomId());
        var nickname = enterChatroomInfo.getNickname();
        var newComponentId = generateComponentId(nickname);

        rootElement.append('<div id="' + newComponentId + '"></div>');

        new ChatroomComponent(newComponentId, chatroom, nickname, commandBus, eventBus);
    };

    var destroyChatroomComponent = function (enterChatroomInfo) {
        $("#" + generateComponentId(enterChatroomInfo.getNickname())).remove();
    };

    var generateComponentId = function (nickname) {
        return rootElementId + "_" + nickname.split(' ').join('_');
    };

    eventBus.subscribe(Events.ENTERED_TO_CHAT, createChatroomComponent);
    eventBus.subscribe(Events.LEFT_CHAT, destroyChatroomComponent);

};