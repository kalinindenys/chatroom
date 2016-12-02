var DTOConverter = {

    toChatroomDTO: function (chatroom) {
        // var messageDTOs = this.toMessageDTOs(chatroom.messages);

        return new ChatroomDTO(chatroom.id, chatroom.name, chatroom.creationDate, chatroom.guests, chatroom.messages);
    },

    toChatroomDTOs: function (chatrooms) {
        var chatroomDTOs = [];

        for (var i = 0; i < chatrooms.length; i++) {
            chatroomDTOs.push(this.toChatroomDTO(chatrooms[i]));
        }

        return chatroomDTOs;
    },

    toMessageDTO: function (message) {
        return new ChatroomMessageDTO(message.chatroomId, message.authorNickname, message.message, message.postTime);
    },

    toMessageDTOs: function (messages) {
        var messageDTOs = [];

        for (var i = 0; i < messages.length; i++) {
            messageDTOs.push(this.toMessageDTO(messages[i]));
        }

        return messageDTOs;
    }

};