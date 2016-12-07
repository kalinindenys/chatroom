var MainComponent = function (commandBus, eventBus) {

    var mainId = "main";

    $("body").html(
        '<div class="container">' +
        '<div id="header" class="page-header">' +
            '<h1>Chatroom</h1>' +
            '<p>Welcome to chatroom!</p>' +
        '</div>' +

        '<div id="' + mainId + '">' +
            '<button id="signUp" class="btn btn-default">Sign up</button>' +
            '<button id="signIn" class="btn btn-default">Sign in</button>' +
            //for chat room testing
            '<button id="chatroom" class="btn btn-default">Chat Room</button>' +
        '</div>' +
        '</div>'
    );

    $("#signUp").click(function () {
        new SignUpComponent(mainId, eventBus);
    });

    $("#signIn").click(function () {
        new SignInComponent(mainId, eventBus);
    });

    $("#chatroom").click(function () {
        new ChatroomComponent(mainId, eventBus);
    });

    eventBus.subscribe(Events.SIGNED_UP, function (message) {
       $("#" + mainId).html(message);
    });

    eventBus.subscribe(Events.LOGGED_IN, function (message) {
        $("#" + mainId).html("Logged in");

        localStorage.setItem("chatroom token", message.token);
    })

    eventBus.subscribe(Events.CHAT_ROOM_OPENED, function (message) {
        $("#" + mainId).html("Entered chat room");

        localStorage.setItem("chatroom token", message.token);
    })

};