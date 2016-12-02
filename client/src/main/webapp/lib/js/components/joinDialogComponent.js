var JoinDialogComponent = function (commandBus, eventBus, rootDivId, chatRoom) {
    var joinDialogId = rootDivId + "_joinDialogComponent";
    var joinInputId = joinDialogId + "_input";
    var enterButtonId = joinDialogId + "_enterButton";
    var cancelButtonId = joinDialogId + "_cancelButton";
    var validationAlertId = joinDialogId + "_validationResult";
    var chatRoomName = chatRoom.name;

    $('#myModal').html('').append('<div id=' + joinDialogId + ' class="modal-dialog modal-sm" role="document"> ' +
        '<div class="join-popup">' +
        '<div class="panel panel-info">' +
        ' <div class="panel-heading"><h3 class="panel-title">\'' + chatRoomName + '\'</h3></div>' +
        '<div class="panel-body">' +
        'Panel content' +
        '<div class="input-group">' +
        '<input type="text" id=' + joinInputId + ' class="form-control"  placeholder="Enter your name">' +
        '<span class="input-group-btn">' +
        '<button id = ' + enterButtonId + ' class="btn btn-info" type="button">' +
        '<i class="glyphicon glyphicon-user"></i>Enter</button>' +
        '<div id="validationAlertId"></div> ' +
        '<button id=' + cancelButtonId + ' type="button" class="btn btn-default" style="float: right;margin: 5px">Cancel</button> ' +
        '</span></div></div></div></div>' +
        '</div></div>'
    )
    ;
    var button = $("#" + enterButtonId);

    button.hide();

    $("#" + joinInputId).on("input", function () {
        var joinInput = $("#" + joinInputId);
        var nickname = joinInput.val().trim();

        var commandData = {"chatRoomName": chatRoomName, "nickname": nickname};
        var command = JoinValidationCommand(commandData);
        commandBus.emit(command.toMessage());
        //todo: CHECK NICKNAME
    });

    $("#" + cancelButtonId).on("click", function () {
        $('#myModal').modal('hide');
    });

    var _checkValidation = function (evt) {
        var validationResult = evt.data;
        if (validationResult) {
            $('#' + validationAlertId).html('');
            button.show();
        } else {
            $('#' + validationAlertId).html('').append('<div class="alert alert-danger" role="alert">' +
                'This nickname already exists</div>');
            button.hide();
        }
    };

    eventBus.subscribe(Events.JOIN_VALIDATED, _checkValidation);
};
