(function(module) {
    module.directive("startGame",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/startGame.html",
                controller: ['$scope', 'configuration','serverModel','$rootScope', ctrlHandler]
            };

            function ctrlHandler(s, config, serverModel, $rootScope) {
                s.startGame = function(game) {
                    if (!config.isModuleAvailable(game)) return;
                    s.hide = true;
                    serverModel.startGame(game);
                }

                s.$on('restart-game', function() {
                    s.hide = false;
                });
            }
        }
    )
})(angular.module("mainApp"));
