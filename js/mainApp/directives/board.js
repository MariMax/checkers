(function(module) {
    module.directive("board",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/board.html",
                controller: ['$scope','dataModel','serverModel', ctrlHandler]
            };

            function ctrlHandler(s,dataModel,serverModel) {
                s.board = dataModel.data.board;

                s.moveHandler = function(x,y){
                    var winner = serverModel.moveHandler(x,y);
                    if (winner){
                        winner.showVictoryFlag();
                        dataModel.data.player1.stopMove();
                        dataModel.data.player2.stopMove();
                        serverModel.showVictory(winner);
                        serverModel.saveState(dataModel.data.player1,dataModel.data.player2);
                    }
                    serverModel.moveDone(dataModel.data.player1,dataModel.data.player2,dataModel.data.board);
                }
            }
        }
    )
})(angular.module("mainApp"));
