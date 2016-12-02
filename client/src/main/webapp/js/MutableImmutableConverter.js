var MutableImmutableConverter = {

    toImmutable: function (mutable) {
        var immutable = {};

        for (var property in mutable) {
            if (mutable.hasOwnProperty(property)) {
                immutable["get" + property] = function () {
                    return mutable[property];
                };
            }
        }

        return immutable;
    }

};