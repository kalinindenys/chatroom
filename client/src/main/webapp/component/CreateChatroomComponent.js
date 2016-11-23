var CreateChatroomComponent = function (rootElementId, commandBus, eventBus) {

    var chatroomNameId = rootElementId + "_chatroomName";
    var createChatroomBtnId = rootElementId + "_createChatroomBtn";

    $("#" + rootElementId).append(
        '<form>' +
        '<div class="form-group">' +
        '<label for' + chatroomNameId + '>Chatroom name:</label>' +
        '<input id="' + chatroomNameId + '" type="text" class="form-control" placeholder="Chatroom name">' +
        '</div>' +
        '<button id="' + createChatroomBtnId + '" type="button" class="btn btn-primary">' +
        'Create' +
        '</button>' +
        '</form>'
    );

    $("#" + createChatroomBtnId).click(function () {
        commandBus.emitMessage(Commands.CREATE_CHATROOM, $("#" + chatroomNameId))
    });

};