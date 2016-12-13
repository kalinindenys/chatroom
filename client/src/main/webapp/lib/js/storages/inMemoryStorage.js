function InMemoryStorage() {
    var storage = [];

    function _saveItem(type, entity) {
        if (storage[type] === undefined) {
            storage[type] = [];
        }
        storage[type][entity.id] = entity;

        //fixed
    }

    function _getItemById(type, id) {
        return storage[type][id];
    }

    function _getAllByType(type) {
        if (storage[type] === undefined) {
            return null;
        } else {
            return storage[type].slice();
        }
    }

    function _generateId(type) {
        if (storage[type] === undefined || storage[type].length == 0) {
            return 0;
        } else {
            return storage[type][storage[type].length - 1].id+1;
        }
    }

    return {
        "saveItem": _saveItem,
        "getItemById": _getItemById,
        "getAllByType": _getAllByType,
        "generateId": _generateId
    }
}


