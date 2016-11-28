var Chatroom = function (chatroomName) {

    this.name = chatroomName;
    this.creationDate = new Date();
    this.guests = [];
    this.messages = [];

};