var JoinDialogComponent = function (commandBus, eventBus, rootDivId, chatRoom) {
    var joinDialogId = rootDivId + "_joinDialogComponent";
    var joinInputId = joinDialogId + "_input";
    var enterButtonId = joinDialogId + "_enterButton";
    var cancelButtonId = joinDialogId + "_cancelButton";
    var validationAlertId = joinDialogId + "_validationResult";

    var chatRoomName = chatRoom.name;

    $('#popup').html('').append('<div id=' + joinDialogId + ' class="modal-dialog modal-sm" role="document"> ' +
        '<div class="join-popup">' +
        '<div class="panel panel-info">' +
        ' <div class="panel-heading"><h3 class="panel-title">\'' + chatRoomName + '\'</h3></div>' +
        '<div class="panel-body">' +
        'Enter your nickname for this chat:' +
        '<div class="input-group">' +
        '<input type="text" id=' + joinInputId + ' class="form-control"  placeholder="Enter your name">' +
        '<span class="input-group-btn">' +
        '<enterButton id = ' + enterButtonId + ' class="btn btn-info" type="enterButton">' +
        '<i class="glyphicon glyphicon-user"></i>Enter</enterButton>' +
        '<enterButton id=' + cancelButtonId + ' type="button" class="btn btn-default" style="float: right;margin: 5px">Cancel</enterButton> ' +
        '</span></div><div id=' + validationAlertId + '></div></div></div></div>' +
        '</div></div>'
    );

    var enterButton = $("#" + enterButtonId);
    var joinInput = $("#" + joinInputId);
    enterButton.hide();
    joinInput.on("input", function () {
        var nickname = joinInput.val();
        var chatRoomMember = new ChatRoomMember(chatRoomName, nickname);
        var command = new JoinValidationCommand(chatRoomMember);
        commandBus.emit(command.toMessage());
        //todo: CHECK NICKNAME
    });

    $("#" + cancelButtonId).on("click", function () {
        _closeJoinDialog();
    });

    enterButton.on("click", function () {
        var nickname = joinInput.val();
        var chatRoomMember = new ChatRoomMember(chatRoomName, nickname);
        var command = new JoinChatRoomCommand(chatRoomMember);
        commandBus.emit(command.toMessage());
    });

    var _checkValidation = function (evt) {
        var validationResult = evt.data;
        if (validationResult) {
            $('#' + validationAlertId).html('');
            enterButton.show();
        } else {
            /*            $('#' + validationAlertId).html('').append('<div class="alert alert-danger" role="alert">' +
             'This nickname already exists</div>');
             enterButton.hide();*/
        }
        //todo: FIX AND CLEAR
    };


    var _showError = function (evt) {
        var errorMessage = evt.data;
        $('#' + validationAlertId).html('').append('<div class="alert alert-danger" role="alert">'+errorMessage+'</div>');
        enterButton.hide();
    };



    var _closeJoinDialog = function () {
        $('#popup').modal('hide');
    };

    var _initialize = new function () {
        $('#popup').modal();
    };

    eventBus.subscribe(Events.NICKNAME_VALIDATED, _checkValidation);
    eventBus.subscribe(Events.CHAT_ROOM_OPENED, _closeJoinDialog);
    eventBus.subscribe(Events.NICKNAME_FAILED_VALIDATION, _showError);

};

JoinDialogComponent.init = function (commandBus, eventBus, rootDivId, chatRoom) {
    return new JoinDialogComponent(commandBus, eventBus, rootDivId, chatRoom);
};
