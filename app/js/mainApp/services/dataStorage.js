'use strict';
(function(module) {
    module.factory('dataStorage', dataStorageFactory);
    dataStorageFactory.$inject = ['localStorageService'];

    function dataStorageFactory(localStorageService) {

        var dataStorage = {};
        dataStorage.save = function(key, value) {
            localStorageService.add(key, value);
        }
        dataStorage.get = function(key) {
            try {
                var value = localStorageService.get(key);
            } catch (e) {
                value = null
            }
            return value;
        }

        dataStorage.drop = function(key) {
            localStorageService.add(key, '');
        }

        return dataStorage;
    }


})(angular.module("mainApp"))
