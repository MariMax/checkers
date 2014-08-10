(function(module) {
    module.directive("startGame",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/startGame.html",
                controller: ['$scope', 'configuration', 'communicationModule', ctrlHandler]
            };

            function ctrlHandler(s, config, communicationModule) {
                s.startGame = function(game) {
                    if (!config.isModuleAvailable(game)) return;
                    s.hide = true;
                    communicationModule.channel.broadcast('start-game', {
                        name: game
                    });
                }

                communicationModule.channel.on('restart-game', function() {
                    s.hide = false;
                }).offWhen(s);
            }
        }
    )
})(angular.module("mainApp"));
