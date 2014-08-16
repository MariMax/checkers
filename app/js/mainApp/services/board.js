'use strict';
(function(module, _) {
    module.factory('boardModel', boardModelFactory);

    function boardModelFactory() {
        var alphabet = 'abcdefgh';
        
        var board = {
            board:[],
            initEmptyBoard:initEmptyBoard

        };

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
                this.board[i] = row;
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
                this.board[0] = row;
                this.board[9] = row;
            }
        }

        return board;
    }


})(angular.module("mainApp"), _)
