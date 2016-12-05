var ChatroomsComponentDirector = function (rootElementId , commandBus, eventBus) {

    var rootElement = $("#" + rootElementId);

    var createChatroomComponent = function (chatroomSession) {
        var newComponentId = generateComponentId(chatroomSession.getNickname(), chatroomSession.getChatroom().getId());

        rootElement.append('<div id="' + newComponentId + '"></div>');

        ChatroomComponent.createFor(newComponentId, chatroomSession, commandBus, eventBus);
    };

    var destroyChatroomComponent = function (joinChatroomInfo) {
        $("#" + generateComponentId(joinChatroomInfo.getNickname(), joinChatroomInfo.getChatroomId())).remove();
    };

    var generateComponentId = function (nickname, chatroomId) {
        return rootElementId + "_" + chatroomId + "_" + nickname.split(' ').join('_');
    };

    eventBus.subscribe(Events.JOINED_TO_CHAT, createChatroomComponent);
    eventBus.subscribe(Events.USER_LEFT_CHAT, destroyChatroomComponent);

};

ChatroomsComponentDirector.createFor = function (chatroomComponentsId, commandBus, eventBus) {
    new ChatroomsComponentDirector(chatroomComponentsId, commandBus, eventBus);
};