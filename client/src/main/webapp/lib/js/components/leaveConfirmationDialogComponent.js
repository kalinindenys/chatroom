var LeaveConfirmationDialogComponent = function (commandBus, rootDivId, chatRoomMember) {
    var confirmLeaveId = rootDivId + "_confirmLeaveDialogComponent";
    var confirmButtonId = confirmLeaveId + "_confirmButton";
    var cancelButtonId = confirmLeaveId + "_cancelButton";

    var chatRoomName = chatRoomMember.chatRoomName;

    $('#popup').html('').append('<div id=' + confirmLeaveId + ' class="modal-dialog modal-sm" role="document"> ' +
        '<div class="join-popup">' +
        '<div class="panel panel-info">' +
        '<div class="panel-heading"><h3 class="panel-title">\'' + chatRoomName + '\'</h3></div>' +
        '<div class="panel-body">' +
        'Are you sure you want to leave the room? <br>' +
        '<button id = ' + confirmButtonId + ' class="btn btn-info" type="button">Yes</button>' +
        '<button id=' + cancelButtonId + ' type="button" class="btn btn-default" style="float: right">Cancel</button> ' +
        '</div></div></div></div>'
    );

    var confirmButton = $("#" + confirmButtonId);
    var cancelButton = $("#" + cancelButtonId);

    cancelButton.on("click", function () {
        _closeConfirmDialog();
    });

    confirmButton.on("click", function () {
        var command = new LeaveChatRoomCommand(chatRoomMember);
        commandBus.emit(command.toMessage());
        _closeConfirmDialog();
        //todo: MODIFY
    });

    var _closeConfirmDialog = function () {
        $('#popup').modal('hide');
    };

    var _initialize = new function () {
        $('#popup').modal();
    };
};

LeaveConfirmationDialogComponent.init = function (commandBus, rootDivId, chatRoomMember) {
    return new LeaveConfirmationDialogComponent(commandBus, rootDivId, chatRoomMember);
};

