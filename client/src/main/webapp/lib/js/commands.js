var Commands = {
    CREATE_CHATROOM: "Create chatroom"
};

var CreateChatRoomCommand = function(chatroomDto) {

	var _toMessage = function() {
		return new Message(Commands.CREATE_CHATROOM, chatroomDto);
	};
	
	return { "toMessage": _toMessage };
};
