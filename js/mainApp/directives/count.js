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
                }
            };

        }
    )
})(angular.module("mainApp"));
