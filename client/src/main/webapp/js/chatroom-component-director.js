var ChatroomsComponentDirector = function (rootElementId , commandBus, eventBus) {

    var rootElement = $("#" + rootElementId);

    var createChatroomComponent = function (chatroomSession) {
        var newComponentId = generateComponentId(chatroomSession);

        rootElement.append('<div id="' + newComponentId + '"></div>');

        ChatroomComponent.createFor(newComponentId, chatroomSession, commandBus, eventBus);
    };

    var destroyChatroomComponent = function (chatroomSession) {
        $("#" + generateComponentId(chatroomSession)).remove();
    };

    var generateComponentId = function (chatroomSession) {
        return rootElementId + "_" + chatroomSession.getChatroom().getId() + "_" +
            chatroomSession.getNickname().split(' ').join('_');
    };

    eventBus.subscribe(Events.JOINED_TO_CHAT, createChatroomComponent);
    eventBus.subscribe(Events.USER_LEFT_CHAT, destroyChatroomComponent);

};

ChatroomsComponentDirector.createFor = function (chatroomComponentsId, commandBus, eventBus) {
    new ChatroomsComponentDirector(chatroomComponentsId, commandBus, eventBus);
};