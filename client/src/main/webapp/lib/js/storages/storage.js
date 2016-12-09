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

    function _getChatRoomNumber() {
        return localStorage.length;
    }

    function _generateId() {
        var date = new Date();
        var var1 = (date.getMilliseconds() * date.getSeconds());
        var var2 = Math.floor((Math.random() * 100) + 1);
        return var1 * var2;

    }

    return {
        "saveChatRoom": _saveChatRoom,
        "getChatRoom": _getChatRoom,
        "getAllChatRooms": _getAllChatRooms,
        "getChatRoomNumber": _getChatRoomNumber,
        "generateId": _generateId
    }
}


