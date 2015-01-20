(function(module) {
    module.directive("timer",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "app/js/mainApp/views/timer.html",
                scope: {
                    player: '='
                }
            };
        }
    )
})(angular.module("mainApp"));
