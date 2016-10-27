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
    })

}