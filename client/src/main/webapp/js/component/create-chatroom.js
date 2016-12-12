var CreateChatroomComponent = function (rootElementId, commandBus, eventBus) {

    var template;
    var view = {
        rootElementId: rootElementId,
        chatroomNameId: rootElementId + "_chatroomName",
        createChatroomBtnId: rootElementId + "_createChatroomBtn",
        chatroomName: "",
        validationMessage: ""
    };

    $.get("templates/create-chatroom.html", function (htmlTemplate) {
        template = htmlTemplate;
        Mustache.parse(template);
        renderTemplate();

        eventBus.subscribe(Events.CHATROOM_CREATION_FAILED, showError);
        eventBus.subscribe(Events.CHATROOM_LIST_UPDATED, clearComponent);
    });

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

    var renderTemplate = function () {
        html = Mustache.render(template, view);
        $("#" + rootElementId).html(html);

        $("#" + view.createChatroomBtnId).click(onCreateChatroomBtnClick);
    };

};

CreateChatroomComponent.createFor = function (createChatroomComponentId, commandBus, eventBus) {
    new CreateChatroomComponent(createChatroomComponentId, commandBus, eventBus);
};