var MessageService = function (chatroomStorage, chatroomService) {

    var postMessage = function (messageDTO) {
        var chatroom = chatroomService.findById(messageDTO.getChatroomId());

        var messageEntity = new ChatroomMessage( messageDTO.getChatroomId(), messageDTO.getAuthorNickname(),
                                                 messageDTO.getMessage(), messageDTO.getPostTime()
                                               );
        chatroom.getMessages().push(messageEntity);

        var chatroomEntity = chatroomStorage.findOne(chatroom.getId());
        chatroomEntity.guests = chatroom.getGuests();
        chatroomEntity.messages = chatroom.getMessages();
        chatroomStorage.save(chatroomEntity);

        return chatroom;
    };

    return {
        postMessage: postMessage
    }

};