'use strict';
(function(module) {

    module.directive("checkersController", 
    	function() {
            return {
                restrict: 'A',
                controller: ['$scope','dataModel','communicationModule','gameLogic', checkersControllerFactory]
            };});

    function checkersControllerFactory(s,dataModel,communicationModule,gameLogic) {
    	communicationModule.channel.on('start-game', function(event, game){
    		if (gameLogic.gameName==game.name){
    			dataModel.data.player1.figures = gameLogic.makeDraughts(1,-1);
    			dataModel.data.player2.figures = gameLogic.makeDraughts(2,1);
                dataModel.data.player1.startMove();
                
    			gameLogic.fillBoard(dataModel.data.player1,dataModel.data.player2,dataModel.data.board);
                gameLogic.showDraughtsWithMoves(dataModel.data.player1,dataModel.data.board);
    			dataModel.gameLogic = gameLogic.logic;
    		}
    		
    	})

    };

})(angular.module("checkers"));
