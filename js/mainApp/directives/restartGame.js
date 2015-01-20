(function(module) {
    module.directive("restartGame",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/restartGame.html",
                controller: ['$scope', 'serverModel', ctrlHandler]
            };

            function ctrlHandler(s, serverModel) {
                s.restartGame = function() {
                    serverModel.restartGame();
                }
            }
        }
    )
})(angular.module("mainApp"));
