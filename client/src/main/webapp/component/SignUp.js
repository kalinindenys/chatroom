var SignUpComponent = function (rootElementId, eventBus) {

    var render = function () {
        $("#" + rootElementId).html(
            '<form id="signUpForm">' +
                '<div class="form-group">' +
                    '<label for="login">Login</label>' +
                    '<input type="text" id="login" class="form-control" required placeholder="Login">' +
                '</div> ' +
                '<div class="form-group">' +
                    '<label for="email">Email</label>' +
                    '<input type="email" id="email" class="form-control" required placeholder="Email">' +
                '</div> ' +
                '<div class="form-group">' +
                    '<label for="password">Password</label>' +
                    '<input type="password" id="password" class="form-control" required placeholder="Password">' +
                '</div> ' +
                '<div class="form-group" id="passwordConfirmationGroup">' +
                    '<label for="passwordConfirmation">Password confirmation</label>' +
                    '<input type="password" id="passwordConfirmation" class="form-control" required placeholder="Password confirmation">' +
                '</div>' +
                '<button type="button" id="signUp" class="btn btn-primary">Sign up</button> ' +
            '</form>'
        );

        $("#signUp").click(function () {
            var login = $("#login").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var passwordConfirmation = $("#passwordConfirmation").val();

            if (password !== passwordConfirmation) {
                showError("Passwords do not match");
            } else {
                signUpRequest(login, email, password, passwordConfirmation);
            }
        });
    };

    var showError = function (message) {
        $('<div class="alert alert-danger">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            message +
            '</div>'
        ).insertBefore("#signUpForm");
    };

    var signUpRequest = function (login, email, password, passwordConfirmation) {
        var signUpInfo = {
            login: login,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        };

        $.ajax({
            url: 'api/auth/signUp',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(signUpInfo)
        }).done(function (result) {
            eventBus.emitMessage(Events.SIGNED_UP, result);
        }).fail(function (error) {
            errorResponse = JSON.parse(error.responseText);

            if (errorResponse.status !== 404) {
                showError(errorResponse.errorMessage);
            }
        })
    };

    $(function () {
        render();
    })

};