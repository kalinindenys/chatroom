var DTOConverter = {

    toChatroomDTO: function (chatroom) {
        return new ChatroomDTO(chatroom.id, chatroom.name, chatroom.creationDate, chatroom.guests, chatroom.messages);
    },

    toChatroomDTOs: function (chatrooms) {
        var chatroomDTOs = [];

        for (i = 0; i < chatrooms.length; i++) {
            chatroomDTOs.push(new ChatroomDTO(chatrooms[i].id, chatrooms[i].name, chatrooms[i].creationDate, chatrooms[i].guests, chatrooms[i].messages));
        }

        return chatroomDTOs;
    },

    toChatroomEntity: function (chatroom) {
        var entity = new Chatroom(chatroom.getName(), chatroom.getCreationDate());

        entity.id = chatroom.getId();
        entity.guests = chatroom.getGuests();
        entity.messages = chatroom.getMessages();

        return entity;
    }

};