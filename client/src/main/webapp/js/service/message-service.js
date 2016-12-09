var MessageService = function (chatroomStorage) {

    if (!chatroomStorage) {
        throw new Error("Chatroom storage must be specified");
    }

    var postMessage = function (messageDTO) {
        if (messageDTO.getChatroomId() == undefined) {
            throw new Error("Message must specify chatroom ID");
        }

        var chatroom = chatroomStorage.findOne(messageDTO.getChatroomId());
        chatroom.messages.push(DTOConverter.toMessageEntity(messageDTO));

        chatroom = chatroomStorage.save(chatroom);

        return DTOConverter.toChatroomDTO(chatroom);
    };

    return {
        postMessage: postMessage
    }

};