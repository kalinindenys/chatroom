var displayLoginForm = function () {
    $("#content").append('<form id="loginForm">' +
        '<div class="form-group">' +
        '<label for="login">Login:</label>' +
        '<input type="text" class="form-control" required id="login">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="password">Password:</label>' +
        '<input type="password" class="form-control" required id="password">' +
        '</div>' +
        '<button class="btn btn-default" onclick="sendLoginRequest()">Sign in</button>' +
        '</form>'
    );
};

var sendLoginRequest = function () {
    var httpRequest = new XMLHttpRequest();
    var url = "/login";

    var login = encodeURIComponent($("#login").val());
    var password = encodeURIComponent($("#password").val());

    var loginInfo = {
        "login": login,
        "password": password
    };

    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send("loginInfo=" + JSON.stringify(loginInfo));

    httpRequest.onreadystatechange = function () {
        handleLoginResponse(httpRequest);
    }
};

var handleLoginResponse = function (xmlHttpRequest) {
    if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
        if (xmlHttpRequest.status = 200) {
            alert(xmlHttpRequest.responseText);
            var response = JSON.parse(xmlHttpRequest.responseText);

            if (response.error) {
                $("#loginForm").append(
                    '<div class="alert alert-success">' +
                    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                    response.error.message + '</div>'
                );
            } else {

            }
        } else {

        }
    }
};