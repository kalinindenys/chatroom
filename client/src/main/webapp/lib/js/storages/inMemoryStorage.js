function ChatRoomInMemoryStorage() {
    var storage = [];

    function _createStorageItem(id, entity) {
        return {key: id, value: entity};
    }

    function _findItemInStorage(type, id) {
        //todo: MODIFY OR REMOVE
        var existingItemIndex = -1;
        storage[type].forEach(function (item) {
            if (item.id === id) {
                existingItemIndex = storage[type].indexOf(item);
            }
        });
        return existingItemIndex;
    }

    function _saveItem(type, entity) {
        storage[type].push(_createStorageItem(entity.id, entity));
    }

    function _getItemById(type, id) {
        return storage[type][id];
    }

    function _getAllByName(type, name) {
        var foundItems = [];
        storage[type].forEach(function (item) {
            if (item.name == name) {
                foundItems.push(item);
            }
        });
        return foundItems;
    }

    function _getAllByType(type) {
        return storage[type];
    }

    function _generateId() {
        var date = new Date();
        var var1 = (date.getMilliseconds() * date.getSeconds());
        var var2 = Math.floor((Math.random() * 100) + 1);
        return var1 * var2;
    }

    return {
        "saveItem": _saveItem,
        "getItemById": _getItemById,
        "getAllByType": _getAllByType,
        "getAllByName": _getAllByName,
        "generateId": _generateId
    }
}


