'use strict';
(function(module) {
    module.factory("communicationModule", dataModelFactory);
    dataModelFactory.$inject = ['broadcaster'];
    function dataModelFactory(broadcaster) {
        var api = {
             channel: broadcaster.createChannel(),
        };
        return api;
    }
})(angular.module("mainApp"));
