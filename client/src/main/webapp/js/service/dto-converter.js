var DTOConverter = {

    toChatroomDTO: function (chatroom) {
        var messageDTOs = this.toMessageDTOs(chatroom.messages);

        return new ChatroomDTO(chatroom.id, chatroom.name, chatroom.creationDate, chatroom.guests, messageDTOs);
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
    },

    toChatroomEntity: function (chatroom) {
        var entity = new Chatroom(chatroom.getName(), chatroom.getCreationDate());
        entity.id = chatroom.getId();
        entity.guests = chatroom.getGuests();
        entity.messages = this.toMessageEntities(chatroom.getMessages());

        return entity;
    },

    toChatroomEntities: function (chatrooms) {
        var entities = [];

        for (var i = 0; i < chatrooms.length; i++) {
            entities.push(this.toChatroomEntity(chatrooms[i]));
        }

        return entities;
    },

    toMessageEntity: function (message) {
        return new ChatroomMessage(
            message.getChatroomId(), message.getAuthorNickname(), message.getMessage(), message.getPostTime());
    },

    toMessageEntities: function (messages) {
        var entities = [];

        for (var i = 0; i < messages.length; i++) {
            entities.push(this.toMessageEntity(messages[i]));
        }

        return entities;
    }

};