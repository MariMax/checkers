'use strict';
(function(module, _) {
    module.factory('dataModel', dataModelFactory);
    dataModelFactory.$inject = ['dataStorage', '$timeout'];

    function dataModelFactory(dataStorage, $timeout) {
        var board = [];
        var alphabet = 'abcdefgh';
        var data = init();

        function clearData() {
            data.player1.setDefault();
            data.player2.setDefault();
            initEmptyBoard();
            save();
        }

        function initEmptyBoard() {
            var row = [];
            for (var i = 1; i < 9; i++) {
                row = [];
                row[0] = {
                    unreacheble: true,
                    value: 9 - i
                };
                row[9] = {
                    unreacheble: true,
                    value: 9 - i
                };
                for (var j = 1; j < 9; j++)
                    row[j] = {
                        unreacheble: false,
                        value: ''
                    };
                board[i] = row;
            }
            row = [];
            for (var i = 0; i < 10; i++) {
                if (i == 0 || i == 9)
                    row[i] = {
                        unreacheble: true,
                        value: ''
                    };
                else {
                    row[i] = {
                        unreacheble: true,
                        value: alphabet[i - 1]
                    };
                }
                board[0] = row;
                board[9] = row;
            }
        }

        function playerFactory(name) {
            var timerHandler;
            var move = false;
            var defaultName = name;
            var interval = 1000;

            var player = {
                name: name,
                score: 0,
                timer: 0,
                destroyedCount: 0,
                figures: [],
                startTimer: function() {
                    var self = this;
                    var timeFunction = function() {
                            self.timer += interval;
                            timerHandler = $timeout(timeFunction, interval);
                        }
                    timerHandler = $timeout(timeFunction, interval);
                },
                stopTimer: function() {
                    $timeout.cancel(timerHandler);
                },
                removeFigure: function(figure) {
                    var a = _.indexOf(this.figures, figure);
                    if (a >= 0)
                        this.figures.splice(a, 1);
                },
                startMove: function() {
                    this.startTimer();
                    move = true;
                },
                stopMove: function() {
                    this.stopTimer();
                    move = false;
                },
                isMyMove: function() {
                    return move;
                },
                setDefault: function() {
                    this.name = defaultName;
                    this.score = 0;
                    this.timer = 0;
                    this.destroyedCount = 0;
                    this.figures = [];
                    this.stopMove();
                }
            }

            return player;
        }

        function init() {
            initEmptyBoard();
            var data = {
                    player1: playerFactory('Игрок №1'),
                    player2: playerFactory('Игрок №2'),
                    board: board
                }
                // var str = dataStorage.get('player1');
                // if (str) data.player1 = str;
                // str = dataStorage.get('player2');
                // if (str) data.player2 = str;
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
            data: data
        }

        return dataModel;
    }


})(angular.module("mainApp"), _)
