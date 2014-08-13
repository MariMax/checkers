(function(module) {
    module.directive("board",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/board.html",
                controller: ['$scope','dataModel', ctrlHandler]
            };

            function ctrlHandler(s,dataModel) {
                s.board = dataModel.data.board;

                s.moveHandler = function(x,y){
                    var winner = dataModel.gameLogic(x,y,dataModel.data.player1, dataModel.data.player2, dataModel.data.board)
                    if (winner){
                        winner.showVictoryFlag();
                        dataModel.data.player1.stopMove();
                        dataModel.data.player2.stopMove();
                    }
                }
            }
        }
    )
})(angular.module("mainApp"));
