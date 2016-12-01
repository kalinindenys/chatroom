var Chatroom = function (chatroomName, creationDate) {

    this.id = generateChatroomId();
    this.name = chatroomName;
    this.creationDate = creationDate;
    this.guests = [];
    this.messages = [];

};

function generateChatroomId() {
    var id;

    if ((id = JSON.parse(localStorage.getItem("chatroom_id_counter"))) == null) {
        id = { value: 0 };
    }

    id.value++;
    localStorage.setItem("chatroom_id_counter", JSON.stringify(id));
    return id.value;
}

