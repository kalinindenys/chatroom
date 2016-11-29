var Chatroom = function (chatroomName, creationDate) {

    this.id = Chatroom.idCounter++;
    this.name = chatroomName;
    this.creationDate = creationDate ? creationDate : new Date();
    this.guests = [];
    this.messages = [];

};

Chatroom.idCounter = 0;