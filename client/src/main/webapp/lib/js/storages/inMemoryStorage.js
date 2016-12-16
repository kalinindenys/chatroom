function InMemoryStorage() {
    var storage = {};

    function _saveItem(type, entity) {
        if (storage[type] === undefined) {
            storage[type] = [];
        }
        storage[type][entity.id] = entity;
    }

    function _getItemById(type, id) {
        if (storage[type] === undefined || storage[type][id] === undefined) {
            return null;
        } else {
            return storage[type][id];
        }
    }

    function _getAllByType(type) {
        if (storage[type] === undefined) {
            return null;
        } else {
            return storage[type].slice();
        }
    }

    function _generateId(type) {
        var date = new Date();
        var milliseconds = date.getMilliseconds();
        var randomNumber = Math.floor((Math.random() * 100000) + 1);
        var id;
        do {
            id = milliseconds + randomNumber;
        } while (_getItemById(type, id) != null);
        return id;
    }

    return {
        "saveItem": _saveItem,
        "getItemById": _getItemById,
        "getAllByType": _getAllByType,
        "generateId": _generateId
    }
}


