'use strict';
(function(module) {

    module.directive("checkersController",
        function() {
            return {
                restrict: 'A',
                controller: ['$scope', 'dataModel', 'gameLogic', 'serverModel', checkersControllerFactory]
            };
        });

    function checkersControllerFactory(s, dataModel, gameLogic, serverModel) {

        s.$on('start-game', function(event, game) {
            if (gameLogic.gameName == game.name) {
                serverModel.saveState(dataModel.data.player1,dataModel.data.player2);
                dataModel.data.player1.figures = gameLogic.makeDraughts(1, -1);
                dataModel.data.player2.figures = gameLogic.makeDraughts(2, 1);
                gameLogic.fillBoard(dataModel.data.player1, dataModel.data.player2, dataModel.data.board);
                dataModel.data.player1.startMove();

                gameLogic.showDraughtsWithMoves(dataModel.data.player1, dataModel.data.board);
                serverModel.moveHandler = gameLogic.logic;
            }

        })

    };

})(angular.module("checkers"));
