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
        return storage[type][id];//fixed
    }

    function _getAllByType(type) {
        if (storage[type] === undefined) {
            return null;
        } else {
            return storage[type].slice();
        }
    }

    function _removeItemById(type, id) {
        storage[type].splice(id, 1);//check
    }

    function _generateId(type) {
        if (storage[type] === undefined || storage[type].length == 0) {
            return '0';
        } else {
            var previousId = parseInt(storage[type][storage[type].length - 1].id);
            return (previousId + 1).toString();
        }
        /*        var date = new Date();
         var var1 = (date.getMilliseconds() * date.getSeconds());
         var var2 = Math.floor((Math.random() * 100) + 1);*/
    }

    return {
        "saveItem": _saveItem,
        "getItemById": _getItemById,
        "getAllByType": _getAllByType,
        "generateId": _generateId,
        "removeItemById": _removeItemById
    }
}


