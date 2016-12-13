var CreateChatroomComponent = function (rootElementId, commandBus, eventBus) {

    var template = document.querySelector('#createChatroomTemplate').import.querySelector("template").innerHTML;
    var view = {
        rootElementId: rootElementId,
        chatroomNameId: rootElementId + "_chatroomName",
        createChatroomBtnId: rootElementId + "_createChatroomBtn",
        chatroomName: "",
        validationMessage: ""
    };

    Mustache.parse(template);
    renderTemplate();

    var showError = function (errorMessage) {
        view.validationMessage = errorMessage;
        renderTemplate();
    };

    var clearComponent = function () {
        view.chatroomName = "";
        view.validationMessage = "";
        renderTemplate();
    };

    var onCreateChatroomBtnClick = function () {
        view.chatroomName = $("#" + view.chatroomNameId).val();
        var createChatroomCommand = new CreateChatroom(view.chatroomName);
        commandBus.emitMessage(createChatroomCommand.toMessage());
    };

    function renderTemplate() {
        html = Mustache.render(template, view);
        $("#" + rootElementId).html(html);

        $("#" + view.createChatroomBtnId).click(onCreateChatroomBtnClick);
    }

    eventBus.subscribe(Events.CHATROOM_CREATION_FAILED, showError);
    eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, clearComponent);
};

CreateChatroomComponent.createFor = function (createChatroomComponentId, commandBus, eventBus) {
    new CreateChatroomComponent(createChatroomComponentId, commandBus, eventBus);
};