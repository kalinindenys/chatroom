$(function () {
    var commandBus = new MessageBus();
    var eventBus = new MessageBus();

    new MainComponent(commandBus, eventBus);
});