(function(module) {
    module.directive("restartGame",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/restartGame.html",
                controller: ['$scope', 'communicationModule','dataModel', ctrlHandler]
            };

            function ctrlHandler(s, communicationModule,dataModel) {
                s.restartGame = function() {
                    communicationModule.channel.broadcast('restart-game');
                    dataModel.clearData();
                }
            }
        }
    )
})(angular.module("mainApp"));
