'use strict';
(function(module, _) {
    module.factory('serverModel', serverModelFactory);
    serverModelFactory.$inject = ['dataModel', 'dataStorage', '$rootScope'];

    function serverModelFactory(dataModel, dataStorage, $rootScope) {
        function getState(player) {
            var state = {
                playerScore: player.score,
                playerName: player.name
            }
            return state;
        }

        function setState(player, state) {
            player.name = state.playerName;
            player.score = state.playerScore;
        }

        return {
            saveState: function(player1, player2) {
                dataStorage.save('player1', getState(player1));
                dataStorage.save('player2', getState(player2));
            },
            loadState: function(player1, player2) {
                var state = dataStorage.get('player1');
                if (state) setState(player1,state);
                state = dataStorage.get('player2');
                if (state) setState(player2,state);
            },
            startGame: function(game) {
                dataModel.clearLastGameData();
                dataModel.setGame(game);
                $rootScope.$broadcast('start-game', {
                    name: game
                });
            },
            restartGame: function() {
                $rootScope.$broadcast('restart-game');
                dataModel.clearData();
            },
            moveDone:function(player1,player2,board){
                dataModel.data.player1 = player1;
                dataModel.data.player2 = player2;
                dataModel.data.setBoard(board);
            },
            showVictory:function(winner){
                $rootScope.$broadcast('victory',winner);
            }
        }
    }


})(angular.module("mainApp"), _)
