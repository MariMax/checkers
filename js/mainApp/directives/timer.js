(function(module) {
    module.directive("timer",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/timer.html",
                scope: {
                    player: '='
                },
                controller: ['$scope', 'communicationModule', ctrlHandler]
            };

            function ctrlHandler(s, communicationModule) {

                var timer;

                s.toUTCDate = function(millis) {
                    millis = new Date(millis||0);
                    return new Date(0, 0, 0, millis.getUTCHours(), millis.getUTCMinutes(), millis.getUTCSeconds());
                };

                s.start = function() {
                    timer = setInterval(function() {
                        s.player.timer++
                    }, 1000);
                }

                s.stop = function() {
                    clearInterval(timer);
                }

                communicationModule.channel.on('start-timer', function(event, player) {
                    if (player === s.player)
                        s.start();
                }).offWhen(s);

                communicationModule.channel.on('stop-timer', function() {
                    s.stop();
                }).offWhen(s);
            }
        }
    )
})(angular.module("mainApp"));
