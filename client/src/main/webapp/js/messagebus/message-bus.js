var Message = function (topic, data) {
    return {
        topic: topic,
        data: data
    }
};

var MessageBus = function () {

    var subscribers = [];
    var subscriptionId = 0;

    var subscribe = function (topic, callback) {
        if (!topic) {
            throw new Error("Topic must be specified");
        }

        if (!subscribers[topic]) {
            subscribers[topic] = [];
        }

        subscribers[topic].push({ id: subscriptionId, callback: callback });
        return subscriptionId++;
    };

    var unsubscribe = function (subscriptionId) {
        if (!subscriptionId) {
            throw new Error("Subscription id must be specified");
        }

        for (var topic in subscribers) {
            if (subscribers.hasOwnProperty(topic)) {
                for (var i = 0; i < subscribers[topic].length; i++) {
                    if (subscribers[topic][i].id === subscriptionId) {
                        subscribers[topic].splice(i, 1);
                    }
                }
            }
        }
    };

    var emitMessage = function (message) {
        if (!message.topic) {
            throw new Error("Message must specify topic")
        }

        var callbacksForTopic = subscribers[message.topic];

        if (callbacksForTopic) {
            for (var i = 0; i < callbacksForTopic.length; i++) {
                callbacksForTopic[i].callback.call(null, message.data);
            }
        }
    };

    return {
        "subscribe": subscribe,
        "unsubscribe": unsubscribe,
        "emitMessage": emitMessage
    };

};