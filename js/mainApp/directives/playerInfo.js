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
                controller: ['$scope', 'communicationModule','dataModel', ctrlHandler]
            };

            function ctrlHandler(s, communicationModule,dataModel) {

                communicationModule.channel.on('start-game', function() {
                    s.cantChangeName = true;
                    dataModel.save();
                }).offWhen(s);

                communicationModule.channel.on('restart-game', function() {
                    s.cantChangeName = false;
                }).offWhen(s);
            }
        }
    )
})(angular.module("mainApp"));
