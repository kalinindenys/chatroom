var Message = function (type, data) {
    return {
        "type": type,
        "data": data
    }
};

var MessageBus = function (name) {

    var subscriptions = {};

    var _subscribe = function (messageType, subscriber) {

        _checkMessageType(messageType);

        if (!subscriptions[messageType]) {
            subscriptions[messageType] = [];
        }
        subscriptions[messageType].push(subscriber);
    };

    var _emit = function (message) {
        _checkMessageType(message.type);

        var subscriptionsForType = subscriptions[message.type];
        if (!subscriptionsForType) {
            return;
        }

        for (var subscriberIndex = 0; subscriberIndex < subscriptionsForType.length; subscriberIndex++) {
            var subscriber = subscriptionsForType[subscriberIndex];
            _deliverToSubscriber(message, subscriber);
        }
    };

    var _getName = function () {
        return name;
    };

    function _deliverToSubscriber(message, subscriber) {
        subscriber(message);
    }

    var _checkMessageType = function (messageType) {
        if (!messageType) {
            throw new Error("Message must specify a type.");
        }
    };


    return {
        "subscribe":    _subscribe,
        "emit":         _emit,
        "getName":      _getName
    }
};