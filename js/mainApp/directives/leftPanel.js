(function(module) {
    module.directive("leftPanel",
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: "js/mainApp/views/leftPanel.html",
                controller: ['$scope','dataModel','serverModel', ctrlHandler]
            };

            function ctrlHandler(s, dataModel,serverModel) {

                s.player1 = dataModel.data.player1;
                s.player2 = dataModel.data.player2;
                serverModel.loadState(dataModel.data.player1,dataModel.data.player2);

            }
        }
    )
})(angular.module("mainApp"));
