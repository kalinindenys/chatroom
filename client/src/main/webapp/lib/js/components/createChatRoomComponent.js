var CreateChatroomComponent = function (eventBus, commandBus, rootDivId) {

    var inputId = rootDivId + "_input";
    var createChatRoomBtnId = rootDivId + "_createChatRoomBtn";
    var validationId = rootDivId + "_validation";

    $("#" + rootDivId).html("").append('<div class="panel panel-info">' +
        '<div class="panel-heading"> <h3 class="panel-title">Add new chat room?</h3> </div>' +
        '<div class="input-group">' +
        '<input type="text" class="form-control" placeholder="Chat room name" id=' + inputId + '>' +
        '<span class="input-group-btn"> ' +
        '<button class="btn btn-info" type="button" id=' + createChatRoomBtnId + '>' +
        '<i class="glyphicon glyphicon-plus"></i> Add </button></span></div>' +
        '<div style="color: red" id=' + validationId + '></div></div></div>');


    var inputElement = $("#" + inputId);
    var _cleanComponent = function () {
        inputElement.val("");
    }

    var _onCreateChatRoom = function (evt) { // CLEAN CODE
        var chatRoomName = inputElement.val().trim();
        if (chatRoomName.length > 2 && chatRoomName.length <= 50) {
            var item = localStorage.getItem(chatRoomName);
            if (item) {
                //todo: CHECK AND THROW EXCEPTION
            } else {
                var length = localStorage.length;
                var chatroomDto = new ChatroomDto(length, chatRoomName, new Date());
                localStorage.setItem(chatRoomName, JSON.stringify(chatroomDto))

                command = new CreateChatRoomCommand(localStorage.getItem(chatRoomName));
                commandBus.emit(command.toMessage());

                inputElement.val('');
            }
        }
    };

    var _onError = function (evt) {
        var reason = evt.data.reason;
        var chatRoomList = evt.data.chatRoomList;

        $("#" + validationId).html(reason);
    }

    $("#" + createChatRoomBtnId).click(_onCreateChatRoom);

    eventBus.subscribe(Events.CHAT_ROOM_LIST_UPDATED, _cleanComponent);
    eventBus.subscribe(Events.CHAT_ROOM_CANNOT_BE_CREATED, _onError)
};
