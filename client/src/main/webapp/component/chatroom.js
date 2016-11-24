var ChatroomComponent = function (rootElementId, eventBus) {
    $("#" + rootElementId).html(
        '<div id="cahtroom">' +
        '<div class="col-md-12">' +
        '<table id="conversation" class="table table-striped">' +
        '<thead>' +
        '<tr> ' +
        '<th>Greetings</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="greetings">' +
        '</tbody> ' +
        '</table>' +
        '</div>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '  <div class="col-lg-6">' +
        '<div class="input-group">' +
        '<textarea id="messageContentTextArea" class="form-control" rows="4" cols="200" style="resize: none" >' +
        '</textarea>' +
        '<span class="input-group-btn">' +
        '<button class="btn btn-info"style="; height: 94px"  type="button" accesskey="enter"><i class="glyphicon glyphicon-pencil"></i> Send</bi cln>' +
        '</span>' +
        '</div>' +
        '</div>'
    );

    $(document).keydown(function (e) {
        if (e.which === 13 && e.altKey) {
            sendMessage();
        }
    });

    function sendMessage() {
        alert('Keyboard shortcut working!')
        $("#messageContentTextArea").val(null);

    }
}

