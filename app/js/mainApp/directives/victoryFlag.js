(function(module) {
    module.directive("victoryFlag",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "app/js/mainApp/views/victoryFlag.html",
                controller: ['$scope', 'serverModel','dataModel', ctrlHandler]
            };

            function ctrlHandler(s, serverModel,dataModel) {

                s.$on('victory', function(event, winner) {
                    s.winner = winner;
                    s.show = true;
                });

                s.startNewGame = function() {

                    if (dataModel.data.currentGame) {
                        s.show = false;
                        
                        serverModel.startGame(dataModel.data.currentGame);
                    }
                };

            }
        }
    )
})(angular.module("mainApp"));
