var ChatroomDTO = function (id, name, creationDate, guests, messages) {

    var getId = function () {
        return id;
    };

    var getName = function () {
        return name;
    };

    var getCreationDate = function () {
        return creationDate;
    };

    var getGuests = function () {
        return guests;
    };

    var getMessages = function () {
        return messages;
    };

    return {
        getId: getId,
        getName: getName,
        getCreationDate: getCreationDate,
        getGuests: getGuests,
        getMessages: getMessages
    };

};