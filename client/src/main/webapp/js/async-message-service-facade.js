var AsyncMessageServiceFacade = function (messageService, commandBus) {

    commandBus.subscribe(Commands.POST_MESSAGE, messageService.postMessage);

};