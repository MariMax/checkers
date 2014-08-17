describe("Unit: Testing dataStorage", function() {

    beforeEach(module('mainApp'));

    it('should contain an boardModel service',
        inject(['boardModel',
            function(boardModel) {
                expect(boardModel).not.toEqual(null);
            }
        ]));

    it('should contain an dataModel service',
        inject(['dataModel',
            function(dataModel) {
                expect(dataModel).not.toEqual(null);
            }
        ]));

    it('should have a working dataStorage service',
        inject(['dataStorage',
            function(dataStorage) {

                expect(dataStorage).not.toEqual(null);
                expect(dataStorage.save).not.toEqual(null);
                expect(dataStorage.get).not.toEqual(null);
                expect(dataStorage.drop).not.toEqual(null);
            }
        ]));


    it('should store and save data properly',
        inject(['dataStorage',
            function(dataStorage) {

                var key = 'key',
                    value = 'value';
                    
                dataStorage.save(key, value);
                expect(dataStorage.get(key)).toEqual(value);

                dataStorage.drop(key);
                var newKey = dataStorage.get(key);

                expect(newKey).toBe(null);
            }
        ]));

});

describe("Unit: Testing Player", function() {

    beforeEach(module('mainApp'));



    it('should contain an Player service',
        inject(['playerModel',
            function(playerModel) {
                expect(playerModel).not.toEqual(null);
            }
        ]));

    it('should have a working playerModel service',
        inject(['playerModel',
            function(playerModel) {

                expect(playerModel).not.toEqual(null);
                expect(playerModel.create).not.toEqual(null);
                var player = playerModel.create('1');
                expect(player.startTimer).not.toEqual(null);
                expect(player.stopTimer).not.toEqual(null);
                expect(player.removeFigure).not.toEqual(null);
                expect(player.removeAllFigures).not.toEqual(null);
                expect(player.startMove).not.toEqual(null);
                expect(player.stopMove).not.toEqual(null);
                expect(player.isMyMove).not.toEqual(null);
                expect(player.showVictoryFlag).not.toEqual(null);
                expect(player.setDefault).not.toEqual(null);
                expect(player.clearGameData).not.toEqual(null);
            }
        ]));


    it('should be able to da somthing with player',
        inject(['playerModel',
            function(playerModel) {
                var name = "Hello friend"
                var player = playerModel.create(name);
                expect(player.name).toEqual(name);
                player.startMove();
                expect(player.isMyMove()).toEqual(true);
                player.showVictoryFlag()
                expect(player.score).toEqual(1);
                player.name = 'qwerty';
                expect(player.name).toEqual('qwerty');
                player.setDefault();
                expect(player.name).toEqual(name);
                player.figures = [1,2,3,4,5,6];
                player.removeFigure(3);
                expect(player.figures).toEqual([1,2,4,5,6]);
                player.removeAllFigures();
                expect(player.figures).toEqual([]);
                player.stopMove();
                expect(player.isMyMove()).toEqual(false);
            }
        ]));

});
