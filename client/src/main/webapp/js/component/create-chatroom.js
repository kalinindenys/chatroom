var CreateChatroomComponent = function (rootElementId, commandBus, eventBus) {

    var chatroomNameId = rootElementId + "_chatroomName";
    var validationId = rootElementId + "_validation";
    var createChatroomBtnId = rootElementId + "_createChatroomBtn";

    $("#" + rootElementId).html(
        '<form>' +
        '<div class="form-group">' +
        '<label for' + chatroomNameId + '>Chatroom name:</label>' +
        '<input id="' + chatroomNameId + '" type="text" class="form-control" placeholder="Chatroom name">' +
        '<p id="' + validationId + '" class="text-danger"></p>' +
        '</div>' +
        '<button id="' + createChatroomBtnId + '" type="button" class="btn btn-primary">' +
        'Create' +
        '</button>' +
        '</form>'
    );

    var chatroomName = $("#" + chatroomNameId);
    var validation = $("#" + validationId);

    $("#" + createChatroomBtnId).click(function () {
        var createChatroomCommand = new CreateChatroom(chatroomName.val());
        commandBus.emitMessage(createChatroomCommand.toMessage());
    });

    var showError = function (errorMessage) {
        validation.html(errorMessage);
    };

    var clearComponent = function () {
        chatroomName.val("");
        validation.html("");
    };

    eventBus.subscribe(Events.CHATROOM_CREATION_FAILED, showError);
    eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, clearComponent);

};

CreateChatroomComponent.createFor = function (createChatroomComponentId, commandBus, eventBus) {
    new CreateChatroomComponent(createChatroomComponentId, commandBus, eventBus);
};