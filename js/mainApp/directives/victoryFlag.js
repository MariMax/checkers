(function(module) {
    module.directive("victoryFlag",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/victoryFlag.html",
                controller: ['$scope', 'dataModel','communicationModule', ctrlHandler]
            };

            function ctrlHandler(s, dataModel,communicationModule) {
                s.player1 = dataModel.data.player1;
                s.player2 = dataModel.data.player2;

                s.show = function() {
                    if (s.player1&&s.player1.victory) s.winner = s.player1;
                    else s.winner = s.player2;

                    return s.player1&&s.player1.victory || s.player2&&s.player2.victory;
                };

                s.startNewGame = function() {
                    if (dataModel.data.currentGame) {
                        dataModel.clearLastGameData();
                        communicationModule.channel.broadcast('start-game', {
                            name: dataModel.data.currentGame
                        });
                    }
                };

            }
        }
    )
})(angular.module("mainApp"));
