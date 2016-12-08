function ChatRoomInMemoryStorage() {
    var chatRooms = [];

    function _createStorageItem(chatRoomDto) {
        return {key: chatRoomDto.name, value: chatRoomDto};
    }

    function _findItemInStorage(key) {
        var existingItemIndex;
        chatRooms.forEach(function (item) {
            if (item.key === key) {
                existingItemIndex = chatRooms.indexOf(item);
            }
        });
        return existingItemIndex;
    }

    function _saveChatRoom(chatRoomDto) {
        var currentItem = _createStorageItem(chatRoomDto);
        var index = _findItemInStorage(currentItem.key);
        if (index) {
            chatRooms[index] = currentItem;
        } else {
            chatRooms.push(currentItem);
        }
    }

    function _getChatRoom(chatRoomName) {
        var index = _findItemInStorage(chatRoomName);
        if (index >= 0) {
            return chatRooms[index].value;
        }
        return index;
    }

    function _getAllChatRooms() {
        var chatRoomsToReturn = [];
        chatRooms.forEach(function (item) {
            chatRoomsToReturn.push(item.value);
        });
        return chatRoomsToReturn;
    }

    function _getChatRoomNumber() {
        return chatRooms.length;
    }

    return {
        "saveChatRoom": _saveChatRoom,
        "getChatRoom": _getChatRoom,
        "getAllChatRooms": _getAllChatRooms,
        "getChatRoomNumber": _getChatRoomNumber
    }
}


