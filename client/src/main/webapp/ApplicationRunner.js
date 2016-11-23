$(function () {
    var commandBus = new MessageBus();
    var eventBus = new MessageBus();

    var chatroomAppId = "chatroomApp";

    $("body").append(
        '<div class="container">' +
        '<div id="header" class="page-header">' +
        '<h1>Chatroom</h1>' +
        '<p>Welcome to chatroom!</p>' +
        '</div>' +
        '<div id="' + chatroomAppId + '">' +
        '</div>' +
        '</div>'
    );

    new ChatroomApplication(chatroomAppId, commandBus, eventBus);
});