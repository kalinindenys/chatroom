var JoinDialogComponent = function (eventBus, rootDivId, chatRoom) {
    var joinDialogId = rootDivId + "_joinDialogComponent";
    var joinInputId = joinDialogId + "_input";
    var enterButtonId = joinDialogId + "_enterButton";
    var cancelButtonId = joinDialogId + "_cancelButton";

    $('#myModal').html('').append('<div id=' + joinDialogId + ' class="modal-dialog modal-sm" role="document"> ' +
        '<div class="join-popup">' +
        '<div class="panel panel-info">' +
        ' <div class="panel-heading"><h3 class="panel-title">\'' + chatRoom.name + '\'</h3></div>' +
        '<div class="panel-body">' +
        'Panel content' +
        '<div class="input-group">' +
        '<input type="text" id=' + joinInputId + ' class="form-control"  placeholder="Enter your name">' +
        '<span class="input-group-btn">' +
        '<button style="visibility: hidden" id = ' + enterButtonId + ' class="btn btn-info" type="button">' +
        '<i class="glyphicon glyphicon-user"></i>Enter</button>' +
        '<button id='+cancelButtonId+' type="button" class="btn btn-default" style="float: right;margin: 5px">Cancel</button> ' +
        '</span></div></div></div></div>' +
        '</div></div>'
    )
    ;

    $("#" + joinInputId).on("input", function () {
        var joinInput = $("#" + joinInputId);
        var nickname = joinInput.val().trim();
        var button = $("#" + enterButtonId);
        if (nickname.length > 1) {
            //todo: CHECK NICKNAME
            button.css("visibility", "visible");
        } else {
            button.css("visibility", "hidden");
        }
    });

    $("#" + cancelButtonId).on("click", function () {
        $('#myModal').modal('hide')
    });

};
