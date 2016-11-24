var CreateChatroomComponent = function (eventBus, commandBus, rootDivId) {

    var inputId = rootDivId + "_input";
    var createChatRoomBtnId = rootDivId + "_createChatRoomBtn";
    var validationId = rootDivId + "_validation";

    $("#" + rootDivId).html("").append('<div class="panel panel-info">' +
        '<div class="panel-heading"> <h3 class="panel-title">Add new chat room?</h3> </div>' +
        ' <div class="input-group">' +
        ' <input type="text" class="form-control" placeholder="Create" id=' + inputId + '>' +
        ' <span class="input-group-btn"> ' +
        '<button class="btn btn-info" type="button" id=' + createChatRoomBtnId + '>Create</button> </span> </div>' +
        '<div style="color: red" id=' + validationId + '></div></div>');


    var inputElement = $("#" + inputId);
    var _cleanComponent = function () {
        inputElement.val("");
    }

    var _onCreateChatRoom = function (evt) {
        $('#createChatRoomBtnId').animateCss('jello');
      /*  var chatRoomDescription = inputElement.val();
        var command = new CreateChatRoomCommand(chatRoomDescription);

        commandBus.emit(command.toMessage());*/
    };

    var _onError = function (evt) {
        var reason = evt.data.reason;
        var chatRoomList = evt.data.chatRoomList;

        $("#" + validationId).html(reason);
    }

    inputElement.keydown(function (evt) {
        if (evt.ctrlKey && evt.keyCode == "13") {
            _onCreateChatRoom();
        }
    });

    $("#" + createChatRoomBtnId).click(_onCreateChatRoom);

    eventBus.subscribe(Events.CHAT_ROOM_LIST_UPDATED, _cleanComponent);
    eventBus.subscribe(Events.CHAT_ROOM_CANNOT_BE_CREATED, _onError)
};
