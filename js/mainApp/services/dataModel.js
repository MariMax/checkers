'use strict';
(function(module) {
    module.factory('dataModel', dataModelFactory);
    dataModelFactory.$inject = ['dataStorage'];

    function dataModelFactory(dataStorage) {

        function clearData() {
            data.player1.name = 'Игрок №1'
            data.player1.score = 0,
            data.player1.timer = 0,
            data.player1.destroyCount = 0
            data.player2.name = 'Игрок №2'
            data.player2.score = 0,
            data.player2.timer = 0,
            data.player2.destroyCount = 0
            save();
        }

        function init() {
            var data = {
                player1: {
                    name: 'Игрок №1',
                    score: 0,
                    timer: 0,
                    destroyCount: 0
                },
                player2: {
                    name: 'Игрок №2',
                    score: 0,
                    timer: 0,
                    destroyCount: 0
                }
            }
            var str = dataStorage.get('player1');
            if (str) data.player1 = str;
            str = dataStorage.get('player2');
            if (str) data.player2 = str;

            return data;
        }

        function save() {
            var str = JSON.stringify(data.player1);
            dataStorage.save('player1', str);
            var str = JSON.stringify(data.player2);
            dataStorage.save('player2', str);
        }

        var data = init();

        var dataModel = {
            clearData: clearData,
            data: data,
            save: save
        }

        return dataModel;
    }


})(angular.module("mainApp"))
