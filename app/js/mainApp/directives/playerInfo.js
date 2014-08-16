(function(module) {
    module.directive("playerInfo",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/playerInfo.html",
                scope:{
                    player:'='
                },
                controller: ['$scope', ctrlHandler]
            };

            function ctrlHandler(s) {

                s.$on('start-game', function() {
                    s.cantChangeName = true;
                });

                s.$on('restart-game', function() {
                    s.cantChangeName = false;
                });
            }
        }
    )
})(angular.module("mainApp"));
