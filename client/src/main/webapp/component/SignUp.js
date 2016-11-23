var SignUpComponent = function (rootElementId, commandBus, eventBus) {

    var componentId = rootElementId + "_signUpComponent";
    var loginId = componentId + "_login";
    var emailId = componentId + "_email";
    var passwordId = componentId + "_password";
    var passwordConfirmId = componentId + "_passwordConfirm";
    var confirmId = componentId + "_confirm";

    $("#" + rootElementId).html(
        '<form id="' + componentId + '">' +
            '<div class="form-group">' +
                '<label for="' + loginId + '">Login</label>' +
                '<input type="text" id="' + loginId + '" class="form-control" required placeholder="Login">' +
            '</div> ' +
            '<div class="form-group">' +
                '<label for="' + emailId + '">Email</label>' +
                '<input type="email" id="' + emailId + '" class="form-control" required placeholder="Email">' +
            '</div> ' +
            '<div class="form-group">' +
                '<label for="' + passwordId + '">Password</label>' +
                '<input type="password" id="' + passwordId + '" class="form-control" required placeholder="Password">' +
            '</div> ' +
            '<div class="form-group" id="passwordConfirmationGroup">' +
                '<label for="' + passwordConfirmId + '">Password confirmation</label>' +
                '<input type="password" id="' + passwordConfirmId + '" class="form-control" required placeholder="Password confirmation">' +
            '</div>' +
            '<button type="button" id="' + confirmId + '" class="btn btn-primary">Sign up</button> ' +
        '</form>'
    );

    var toMessage = function () {
        return {
            login: $("#" + loginId).val(),
            email: $("#" + emailId).val(),
            password: $("#" + passwordId).val(),
            passwordConfirmation: $("#" + passwordConfirmId).val()
        }
    };

    $("#" + confirmId).click(function () {
        commandBus.emitMessage(Commands.VALIDATE_SIGN_UP_FORM, toMessage());
    });

    var validateForm = function (fields) {
        var errors = {};

        if (fields.login.length < 3) {
            errors.login = {
                id: loginId,
                message: "Length can not be less than 3"
            };
        }

        if (fields.password.length < 5) {
            errors.password = {
                id: passwordId,
                message: "Length can not be less than 5"
            };
        }

        if (fields.passwordConfirmation !== fields.password) {
            errors.passwordConfirmation = {
                id: passwordConfirmId,
                message: "Passwords do not match"
            }
        }

        if (Object.keys(errors).length === 0) {
            commandBus.emitMessage(Commands.SIGN_UP, fields);
        } else {
            eventBus.emitMessage(Events.SIGNED_UP_VALIDATION_FAILED, errors);
        }
    };

    var showErrors = function (errors) {
        $("#" + rootElementId).find("p").remove(".text-danger");

        for (var elementData in errors) {
            if (errors.hasOwnProperty(elementData)) {
                var parent = $("#" + errors[elementData].id).parent();
                parent.append(
                    '<p class="text-danger">' + errors[elementData].message + '</p>');
            }
        }
    };

    var showErrorFromServer = function (errorMessage) {
        $("#" + rootElementId).find("p").remove(".text-danger");

        $('<p class="text-danger">Sign up failed! ' + errorMessage + '</p>')
            .insertBefore("#" + componentId);
    };

    var signUp = function (signUpInfo) {
        $.ajax({
            url: 'api/auth/signUp',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(signUpInfo)
        }).done(function (result) {
            eventBus.emitMessage(Events.SIGNED_UP, result);
        }).fail(function (error) {
            errorResponse = JSON.parse(error.responseText);
            eventBus.emitMessage(Events.SIGN_UP_FAILED, errorResponse.errorMessage);
        })
    };

    commandBus.subscribe(Commands.VALIDATE_SIGN_UP_FORM, validateForm);
    commandBus.subscribe(Commands.SIGN_UP, signUp);

    eventBus.subscribe(Events.SIGNED_UP_VALIDATION_FAILED, showErrors);
    eventBus.subscribe(Events.SIGN_UP_FAILED, showErrorFromServer);

};