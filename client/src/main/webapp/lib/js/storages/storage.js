function LocalStorage() {
    function _saveItem(type, entity) {
        if (localStorage.getItem(type) === null) {
            var item = [];
            item[entity.id] = entity;
            localStorage.setItem(type, JSON.stringify(item));
        } else {
            var items = JSON.parse(localStorage.getItem(type));
            items[entity.id] = entity;
            localStorage.setItem(type, JSON.stringify(items));
        }
    }

    function _getItemById(type, id) {
        return JSON.parse(localStorage.getItem(type))[id];
    }

    function _getAllByType(type) {
        if (localStorage.getItem(type) === null) {
            return null;
        } else {
            return JSON.parse(localStorage.getItem(type)).slice();
        }
    }

    function _generateId(type) {
        if (localStorage.getItem(type) === null || JSON.parse(localStorage.getItem(type)).length == 0) {
            return 0;
        } else {
            var value = JSON.parse(localStorage.getItem(type));
            return value[value.length - 1].id+1;
        }
    }

    return {
        "saveItem": _saveItem,
        "getItemById": _getItemById,
        "getAllByType": _getAllByType,
        "generateId": _generateId
    }
}


