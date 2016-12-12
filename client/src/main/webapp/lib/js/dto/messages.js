var MessageDto = function (id, userId, username, chatRoomId, content, date) {
    return {
        "id": id,
        "userId": userId,
        "username": username,
        "chatRoomId": chatRoomId,
        "content": content,
        "date": date
    };
};

