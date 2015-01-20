'use strict';
(function(module, _) {
    module.factory('dataModel', dataModelFactory);
    dataModelFactory.$inject = ['playerModel', 'boardModel'];

    function dataModelFactory(playerModel, boardModel) {
        var board = boardModel;
        var exportBoard = board.board;

        var data = init();

        function setBoard(newBoard) {
            board.board = newBoard;
        }

        function clearData() {
            data.player1.setDefault();
            data.player2.setDefault();
            data.currentGame = '';
            board.initEmptyBoard();
        }

        function clearLastGameData() {
            board.initEmptyBoard();
            data.player1.clearGameData();
            data.player2.clearGameData();
        }

        function setGame(game) {
            data.currentGame = game;
        }

        function init() {
            board.initEmptyBoard();
            return {
                player1: playerModel.create('Player 1'),
                player2: playerModel.create('Player 2'),
                board: exportBoard
            }
        }

        return {
            clearData: clearData,
            clearLastGameData: clearLastGameData,
            setGame: setGame,
            data: data,
            setBoard: setBoard
        }
    }


})(angular.module("mainApp"), _)
