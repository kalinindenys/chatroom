var Events = {
    CHAT_ROOM_LIST_UPDATED: "Chat room List updated",
	CHAT_ROOM_CANNOT_BE_CREATED: "Chat room cannot be created",
	OPEN_JOIN_DIALOG: "Open join dialog",
};

var ChatRoomListUpdatedEvent = function(chatRoomList) {
	
	var _toMessage = function() {
		return new Message(Events.CHAT_ROOM_LIST_UPDATED, chatRoomList);
	};
	
	return { "toMessage": _toMessage };
};

var OpenJoinDialogEvent = function(chatRoom) {

	var _toMessage = function() {
		return new Message(Events.OPEN_JOIN_DIALOG, chatRoom);
	};

	return { "toMessage": _toMessage };
};


var ChatRoomCannotBeCreatedEvent = function(reason, chatRoomList) {
	
	var _toMessage = function() {
		
		var data = {
			"reason": reason,
			"chatRoomList": chatRoomList
		};
		
		return new Message(Events.CHAT_ROOM_CANNOT_BE_CREATED, data);
	};
	
	return { "toMessage": _toMessage };
	
	
}