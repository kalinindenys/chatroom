var ChatroomMessage = function (chatroomId, authorNickname, message, postTime) {

    this.id = generateMessageId();
    this.chatroomId = chatroomId;
    this.authorNickname = authorNickname;
    this.message = message;
    this.postTime = postTime;

};

function generateMessageId() {
    var id;

    if ((id = JSON.parse(localStorage.getItem("message_id_counter"))) == null) {
        id = { value: 0 };
    }

    id.value++;
    localStorage.setItem("message_id_counter", JSON.stringify(id));
    return id.value;
}