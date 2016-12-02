var DTOConverter = {

    toChatroomDTO: function (chatroom) {
        return new ChatroomDTO(chatroom.id, chatroom.name, chatroom.creationDate, chatroom.guests, chatroom.messages);
    },

    toChatroomDTOs: function (chatrooms) {
        var chatroomDTOs = [];

        for (var i = 0; i < chatrooms.length; i++) {
            chatroomDTOs.push(this.toChatroomDTO(chatrooms[i]));
        }

        return chatroomDTOs;
    }

};