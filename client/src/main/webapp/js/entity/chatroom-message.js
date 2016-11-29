var ChatroomMessage = function (authorNickname, message) {

    this.id = ChatroomMessage.idCounter++;
    this.authorNickname = authorNickname;
    this.message = message;
    this.postTime = new Date();

};

ChatroomMessage.idCounter = 0;