var ChatroomComponent = function (commandBus, eventBus) {

    var componentId = "chatroomWidget";
    var leaveBtnId = componentId + "_leaveBtn";
    var postMessageBtnId = componentId + "_postMessageBtn";

    $("body").append(
        '<div class="container" id="' + componentId + '">' +
        '<div class="panel panel-default">' +
        '<div class="panel-heading clearfix">' +
        '<h4 class="panel-title pull-left" style="padding-top: 7px;">Chatroom name</h4>' +
        '<div class="pull-right">' +
        '<button class="btn btn-default btn-sm" id="' + leaveBtnId + '">Leave</button>' +
        '</div>' +
        '</div>' +
        '<div class="panel-body" style="height: 350px">' +
        'Chatroom body' +
        '</div>' +
        '<div class="panel-footer input-group">' +
        '<input type="text" class="form-control" placeholder="Your message...">' +
        '<span class="input-group-btn">' +
        '<button class="btn btn-default" type="button" id="' + postMessageBtnId + '">Post</button>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>'
    );

    $("#" + leaveBtnId).click(function () {
        $("#" + componentId).remove();
    });

    $("#" + postMessageBtnId).click(function () {

    });

};