var SignInComponent = function (rootElementId, eventBus) {

    var render = function () {
        $("#" + rootElementId).html(
          '<form id="signInForm">' +
          '<div class="form-group">' +
          '<label for="login">Login</label>' +
          '<input id="login" type="text" class="form-control" placeholder="Login">' +
          '</div> ' +
          '<div class="form-group">' +
          '<lable for="password">Password</lable>' +
          '<input id="password" type="password" class="form-control" placeholder="Password">' +
          '</div>' +
          '<button id="signIn" type="button" class="btn btn-primary">Sign in</button> ' +
          '</form>'
        );

        $("#signIn").click(function () {
            var login = $("#login").val();
            var password = $("#password").val();

            signInRequest(login, password);
        });
    };

    var signInRequest = function (login, password) {
        var signInInfo = {
            login: login,
            password: password
        };

        $.ajax({
            url: 'api/auth/signIn',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(signInInfo)
        }).done(function (result) {
            eventBus.emitMessage(Events.LOGGED_IN, result);
        }).fail(function (error) {
            errorResponse = JSON.parse(error.responseText);

            if (errorResponse.status !== 404) {
                showError(errorResponse.errorMessage);
            }
        })
    };

    var showError = function (message) {
        $('<div class="alert alert-danger">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            message +
            '</div>'
        ).insertBefore("#signInForm");
    };

    $(function () {
        render();
    });

};