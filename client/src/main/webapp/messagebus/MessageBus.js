var MessageBus = function () {

    var subscribers = [];

    var subscribe = function (topic, callback) {
        if (topic === undefined) {
            throw new Error("Topic must be specified");
        }

        if (!subscribers[topic]) {
            subscribers[topic] = [];
        }

        subscribers[topic].push(callback);
    };

    var emitMessage = function (topic, message) {
        if (subscribers[topic]) {
            for (var i = 0; i < subscribers[topic].length; i++) {
                subscribers[topic][i].call(null, message);
            }
        }
    };

    return {
        "subscribe": subscribe,
        "emitMessage": emitMessage
    };

};