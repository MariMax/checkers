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
                s.board = dataModel.board;

                s.moveHandler = function(x,y){
                    dataModel.gameLogic(x,y,dataModel.data.player1, dataModel.data.player2, dataModel.data.board);
                }
            }
        }
    )
})(angular.module("mainApp"));
