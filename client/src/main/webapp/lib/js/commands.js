var Commands = {
    CREATE_CHATROOM: "Create chatroom"
};

var CreateChatroomCommand = function(description) {

	var _toMessage = function() {
		return new Message(Commands.CREATE_CHATROOM, description);
	};
	
	return { "toMessage": _toMessage };
};
