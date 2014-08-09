(function (module, _, angular) {

    // publuc event
    function broadcast(eventName, data) {
        var subscriptions = this.subscriptions[eventName] = this.subscriptions[eventName] || [];
        _.forEach(subscriptions, function (handler) {
            var context = handler.context || null;
            if (!angular.isFunction(handler.proviso) || handler.proviso.call(context, data, { name: eventName })) {
                handler.callback.call(context, { name: eventName }, data);
            }
        });
    };

    function getUnsubscribers(eventName, callBack) {
        var self = this;
        return {
            off: function () {
                return off.call(self, eventName, callBack);
            },
            offWhen: function (deferObjOrScope) {
                offWhen.call(self, deferObjOrScope, eventName, callBack);
            }
        };
    }

    //subscribe to event
    function on(eventName, callBack, context) {
        var self = this;
        
        var subscriptions = this.subscriptions[eventName] = this.subscriptions[eventName] || [];
        subscriptions.push({ callback: callBack, context: context });
        return getUnsubscribers.call(self, eventName, callBack);
    };

    //unsubscribe to event
    function off(callBackOrEventName, callback) {
        if (angular.isString(callBackOrEventName)) {
            var eventName = callBackOrEventName;
            var subscriptions;
            if (!(subscriptions = this.subscriptions[eventName])) return;
            
            if (angular.isFunction(callback)) {
                spliceSubscriptionsByCallBack(subscriptions, callback);
            } else { // clear all
                this.subscriptions[eventName] = [];
            }
        }
        else if (angular.isFunction(callBackOrEventName)) {
            _.forEach(this.subscriptions, function (subscription) {
                spliceSubscriptionsByCallBack(subscription, callback);
            });
        }
    };
    
    function offWhen(deferObjOrScope, eventName, callBack) {
        var self = this;
        if (deferObjOrScope && angular.isFunction(deferObjOrScope.then)) { // if defer
            deferObjOrScope.then(function () {
                return off.call(self, eventName, callBack);
            });
        } 
        else if (deferObjOrScope && angular.isFunction(deferObjOrScope.$on)) { // if $scope
            deferObjOrScope.$on("$destroy", function () {
                return off.call(self, eventName, callBack);
            });
        }
    }

    function when(eventName, proviso) {
        var self = this;
        var subscriptions = this.subscriptions[eventName] = this.subscriptions[eventName] || [];
        var subscription = { proviso: proviso };
        return {
            then: function (callBack, context) {
                subscription.callback = callBack;
                subscription.context = context;
                subscriptions.push(subscription);
                return getUnsubscribers.call(self, eventName, callBack);
            }
        };
    }

    function filter(proviso) {
        var self = this;
        return {
            on: function(eventName, callback, contex) {
                return when.call(self,eventName, proviso).then(callback, contex);
            }
        };
    }

    function spliceSubscriptionsByCallBack(subscriptions, callback) {
        var length = subscriptions.length, i = 0;
        for (; i < length; i++) {
            if (subscriptions[i].callback === callback) {
                subscriptions.splice(i, 1);
                i--;
                length--;
            }
        }
    };

    module.factory("broadcaster", function () {
        return {
            createChannel: function () {
                var channel = {};
                channel.subscriptions = {};
                var channelProxy = {
                    broadcast: function () {
                        return broadcast.apply(channel, arguments);
                    },
                    on: function () {
                        return on.apply(channel, arguments);
                    },
                    off: function () {
                        return off.apply(channel, arguments);
                    },
                    clear: function () {
                        return channel.subscriptions = {};
                    },
                    when: function() {
                        return when.apply(channel, arguments);
                    },
                    filter : function() {
                        return filter.apply(channel, arguments);
                    },
                };
                return channelProxy;
            }
        };
    });
})(angular.module("mainApp"), _, angular);
