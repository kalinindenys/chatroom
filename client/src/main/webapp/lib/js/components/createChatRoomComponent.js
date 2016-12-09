var CreateChatroomComponent = function (eventBus, commandBus, rootDivId) {

    var inputId = rootDivId + "_input";
    var createChatRoomBtnId = rootDivId + "_createChatRoomBtn";
    var validationId = rootDivId + "_validation";

    $("#" + rootDivId).html("").append('<div class="panel panel-info">' +
        '<div class="panel-heading"> <h3 class="panel-title">Add new chat room?</h3> </div>' +
        '<div class="input-group">' +
        '<input type="text" class="form-control" maxlength="50" placeholder="Chat room name" id=' + inputId + '>' +
        '<span class="input-group-btn"> ' +
        '<button class="btn btn-info" type="button" id=' + createChatRoomBtnId + '>' +
        '<i class="glyphicon glyphicon-plus"></i> Add </button></span></div>' +
        '<div style="color: red" id=' + validationId + '></div></div></div>');


    var inputElement = $("#" + inputId);
    var _clearComponent = function () {
        inputElement.val("");
        $("#" + validationId).html('');
    };

    var _onCreateChatRoom = function () {
        var chatRoomName = inputElement.val();

        var command = new CreateChatRoomCommand(chatRoomName);
        commandBus.emit(command.toMessage());

    };

    var _onError = function (evt) {
        var reason = evt.data;
        $("#" + validationId).html(reason);
    };

    $("#" + createChatRoomBtnId).click(_onCreateChatRoom);

    eventBus.subscribe(Events.CHAT_ROOM_LIST_UPDATED, _clearComponent);
    eventBus.subscribe(Events.CHAT_ROOM_CANNOT_BE_CREATED, _onError)
};

CreateChatroomComponent.init = function (eventBus, commandBus, rootDivId) {
    return new CreateChatroomComponent(eventBus, commandBus, rootDivId);
};

