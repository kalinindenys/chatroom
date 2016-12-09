var MessageDto = function (id, userId, chatRoomId, content, date) {
    return {
        "id": id,
        "userId": userId,
        "chatRoomId": chatRoomId,
        "content": content,
        "date": date
    };
};

