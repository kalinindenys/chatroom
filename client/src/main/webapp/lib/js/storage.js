function ChatRoomStorage() {
    function _saveChatRoom(chatRoomDto) {
        localStorage.setItem(chatRoomDto.name, JSON.stringify(chatRoomDto));
    }
    function _getChatRoom(chatRoomName) {
        return JSON.parse(localStorage.getItem(chatRoomName));
    }
    function _getAllChatRooms() {
        var chatRooms = [];
        for (key in localStorage) {
            chatRooms.push(JSON.parse(localStorage.getItem(key)));
        }
        return chatRooms;
    }
    return {
        "saveChatRoom": _saveChatRoom,
        "getChatRoom": _getChatRoom,
        "getAllChatRooms": _getAllChatRooms
    }
}


