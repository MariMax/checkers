'use strict';
(function(module) {
    module.factory('dataModel', dataModelFactory);
    dataModelFactory.$inject = ['dataStorage'];

    function dataModelFactory(dataStorage) {
        var board = [];
        var alphabet = 'abcdefgh';
        var data = init();


        function clearData() {
            data.player1.name = 'Игрок №1';
            data.player1.score = 0;
            data.player1.timer = 0;
            data.player1.destroyCount = 0;
            data.player2.name = 'Игрок №2';
            data.player2.score = 0;
            data.player2.timer = 0;
            data.player2.destroyCount = 0;
            initEmptyBoard();
            save();
        }

        function initEmptyBoard() {
            var row=[];
            for (var i = 1; i < 9; i++){
                row = [];
                row[0] = {unreacheble:true, value:9-i};
                row[9] = {unreacheble:true, value:9-i};
                for (var j = 1; j < 9; j++) 
                     row[j] = {unreacheble:false, value:''};
                board[i] = row;
            }
            row = [];
            for (var i = 0; i < 10; i++){
                if (i==0||i==9)
                    row[i] = {unreacheble:true, value:''};
                else {
                    row[i] = {unreacheble:true, value: alphabet[i-1]};
                }
                board[0] = row;
                board[9] = row;
            }
        }

        function init() {
            initEmptyBoard();
            var data = {
                player1: {
                    name: 'Игрок №1',
                    score: 0,
                    timer: 0,
                    destroyCount: 0,
//                    figures: makeDraughts(1)
                },
                player2: {
                    name: 'Игрок №2',
                    score: 0,
                    timer: 0,
                    destroyCount: 0,
//                    figures: makeDraughts(2)
                },
                board:board
            }
            var str = dataStorage.get('player1');
            if (str) data.player1 = str;
            str = dataStorage.get('player2');
            if (str) data.player2 = str;
//            fillBoard(data.player1,data.player2)
            return data;
        }

        function save() {
            var str = JSON.stringify(data.player1);
            dataStorage.save('player1', str);
            var str = JSON.stringify(data.player2);
            dataStorage.save('player2', str);
        }

        var dataModel = {
            clearData: clearData,
            save: save,
            data: data,
            board: board
        }

        return dataModel;
    }


})(angular.module("mainApp"))
