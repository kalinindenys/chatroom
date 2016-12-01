var Message = function (topic, data) {
    return {
        topic: topic,
        data: data
    }
};

var MessageBus = function () {

    var subscribers = [];

    var subscribe = function (topic, callback) {
        if (!topic) {
            throw new Error("Topic must be specified");
        }

        if (!subscribers[topic]) {
            subscribers[topic] = [];
        }

        subscribers[topic].push(callback);
    };

    var unsubscribe = function (topic, callback) {
        var callbackIndex = subscribers[topic].indexOf(callback);

        if (callbackIndex !== -1) {
            subscribers[topic].splice(callbackIndex, 1);
        }
    };

    var emitMessage = function (message) {
        if (!message.topic) {
            throw new Error("Message must specify topic")
        }

        var callbacksForTopic = subscribers[message.topic];

        if (callbacksForTopic) {
            for (var i = 0; i < callbacksForTopic.length; i++) {
                callbacksForTopic[i].call(null, message.data);
            }
        }
    };

    return {
        "subscribe": subscribe,
        "unsubscribe": unsubscribe,
        "emitMessage": emitMessage
    };

};