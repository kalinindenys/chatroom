function showRegistrationForm() {
    $.ajax({
        type: 'GET',
        url: 'RegistrationServlet',
        success: function (result) {
            $('#registrationForm').html(result);
        }
    });
}
function signUpUser() {
    var login = $('#logInInput').val();
    var password = $('#passInput').val();
    var data = {login: login, password: password}
    $.ajax({
        type: 'POST',
        data: data,
        url: 'RegistrationServlet',
        success: function (result) {
            $('#registrationForm').html(result);
        }
    });
}

function signUpUserBySpring() {
    var login = $('#logInInput').val();
    var password = $('#passInput').val();
    var data = {login: login, password: password}
    $.ajax({
        url: '/api/signUp',
        method: 'POST',
        data: data,
        dataType: "json",
        success: function (result) {
            $('#registrationForm').html(null);
            console.log("Hello here")
        }
    })
}

function showRegistrationFormByJS() {
    var registerForm = 'Login <input id="logInInput" type="text">' +
        '        Password <input id="passInput" type="password">' +
        '        <button id="okSignUpButton" class="btn btn-default" onclick="signUpUserBySpring()">Sign me up!</button>';
    $('#content').html(registerForm);

}
