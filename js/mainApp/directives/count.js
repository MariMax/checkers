(function(module) {
    module.directive("count",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/count.html",
                scope:{
                    player1:'=',
                    player2:'='
                },
                controller: ['$scope', 'communicationModule', ctrlHandler]
            };

            function ctrlHandler(s, communicationModule) {

                communicationModule.channel.on('win-game', function(event, player) {
                    player.score++;
                }).offWhen(s);
            }
        }
    )
})(angular.module("mainApp"));
