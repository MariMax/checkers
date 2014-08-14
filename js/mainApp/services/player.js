'use strict';
(function(module, _) {

    module.factory('playerModel', playerModelFactory);
    playerModelFactory.$inject = ['$timeout'];

    function playerModelFactory($timeout) {

        return {
            create: function(name){
                return playerFactory(name);
            }
        }

        function playerFactory(name) {
            var timerHandler;
            var move = false;
            var defaultName = name;
            var interval = 1000;


            var player = {
                name: name,
                score: 0,
                timer: 0,
                destroyedCount: 0,
                figures: [],

                startTimer: function() {
                    var self = this;
                    function timeFunction() {
                        self.timer += interval;
                        timerHandler = $timeout(timeFunction, interval);
                    }
                    timerHandler = $timeout(timeFunction, interval);
                },
                stopTimer: function() {
                    $timeout.cancel(timerHandler);
                },
                removeFigure: function(figure) {
                    var a = _.indexOf(this.figures, figure);
                    if (a >= 0)
                        this.figures.splice(a, 1);
                },
                removeAllFigures: function() {
                    this.figures = [];
                },
                startMove: function() {
                    this.startTimer();
                    move = true;
                },
                stopMove: function() {
                    this.stopTimer();
                    move = false;
                },
                isMyMove: function() {
                    return move;
                },
                showVictoryFlag: function() {
                    this.score++;
                },
                setDefault: function() {
                    this.name = defaultName;
                    this.score = 0;
                    this.clearGameData();
                },
                clearGameData: function() {
                    this.timer = 0;
                    this.destroyedCount = 0;
                    this.figures = [];
                    this.stopMove();
                    this.victory = 0;
                }
            }

            return player;
        }
}

})(angular.module("mainApp"), _)
