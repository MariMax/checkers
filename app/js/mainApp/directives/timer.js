(function(module) {
    module.directive("timer",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/timer.html",
                scope: {
                    player: '='
                }
            };
        }
    )
})(angular.module("mainApp"));
