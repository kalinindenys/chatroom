var DateFormatter = function () {

    function _formatDate(date) {
        var chatRoomDate = new Date(date);
        var day = chatRoomDate.getDate();
        var month = chatRoomDate.getMonth() + 1;
        var year = chatRoomDate.getFullYear();
        var hours = ("0" + chatRoomDate.getHours()).slice(-2);
        var minutes = ("0" + chatRoomDate.getMinutes()).slice(-2);
        return day + "-" + month + "-" + year + " " + hours + ":" + minutes;
    }

    return {
        "formatDate": _formatDate
    };
};