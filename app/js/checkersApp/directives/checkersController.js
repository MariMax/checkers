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
                serverModel.saveState(dataModel.data.player1, dataModel.data.player2);
                gameLogic.startGame(dataModel.data.player1, dataModel.data.player2, dataModel.data.board);

                serverModel.moveHandler = gameLogic.makeMove;
            }

        })

    };

})(angular.module("checkers"));
