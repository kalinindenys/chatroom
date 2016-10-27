var displayLoginForm = function () {
    $("#content").html('<form id="loginForm" onsubmit="sendLoginRequest()">' +
        '<div class="form-group">' +
        '<label for="login">Login:</label>' +
        '<input type="text" class="form-control" required placeholder="Enter login" id="login">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="password">Password:</label>' +
        '<input type="password" class="form-control" required placeholder="Enter password" id="password">' +
        '</div>' +
        '<button type="submit" class="btn btn-default">Sign in</button>' +
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
    };
};

var handleLoginResponse = function (xmlHttpRequest) {
    if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
        if (xmlHttpRequest.status = 200) {
            var response = JSON.parse(xmlHttpRequest.responseText);

            if (response.error.message) {
                alert(response.error.message);
                // $("#loginForm").append(
                //     '<div class="alert alert-success">' +
                //     '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                //     response.error.message + '</div>'
                // );
            } else {
                alert(response.data);
            }
        } else {

        }
    }
};