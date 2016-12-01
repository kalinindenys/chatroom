var ChatroomsComponentDirector = function (rootElementId, chatroomService, commandBus, eventBus) {

    var rootElement = $("#" + rootElementId);

    var createChatroomComponent = function (enterChatroomInfo) {
        var chatroom = chatroomService.findById(enterChatroomInfo.getChatroomId());
        var nickname = enterChatroomInfo.getNickname();
        var newComponentId = generateComponentId(enterChatroomInfo);

        rootElement.append('<div id="' + newComponentId + '"></div>');

        ChatroomComponent.createFor(newComponentId, chatroom, nickname, commandBus, eventBus);
    };

    var destroyChatroomComponent = function (enterChatroomInfo) {
        $("#" + generateComponentId(enterChatroomInfo)).remove();
    };

    var generateComponentId = function (enterChatroomInfo) {
        return rootElementId + "_" + enterChatroomInfo.getChatroomId() + "_" + enterChatroomInfo.getNickname().split(' ').join('_');
    };

    eventBus.subscribe(Events.JOINED_TO_CHAT, createChatroomComponent);
    eventBus.subscribe(Events.USER_LEFT_CHAT, destroyChatroomComponent);

};

ChatroomsComponentDirector.createFor = function (chatroomComponentsId, chatroomService, commandBus, eventBus) {
    new ChatroomsComponentDirector(chatroomComponentsId, chatroomService, commandBus, eventBus);
};