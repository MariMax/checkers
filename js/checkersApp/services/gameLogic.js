'use strict';
(function(module, _) {
    module.factory('gameLogic', gameLogicFactory);

    function gameLogicFactory() {
        var gameName = 'checkers';

        var selectedFigure;

        function makeDraughts(type, mainDirrection) {
            var draughts = [];
            if (type == 2) {
                draughts.push({
                    type: 1,
                    x: 2,
                    y: 1,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 4,
                    y: 1,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 6,
                    y: 1,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 8,
                    y: 1,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });

                draughts.push({
                    type: 1,
                    x: 1,
                    y: 2,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 3,
                    y: 2,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 5,
                    y: 2,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 7,
                    y: 2,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });

                draughts.push({
                    type: 1,
                    x: 2,
                    y: 3,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 4,
                    y: 3,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 6,
                    y: 3,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 8,
                    y: 3,
                    viewClass: 'dark-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
            }
            if (type == 1) {
                draughts.push({
                    type: 1,
                    x: 1,
                    y: 8,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 3,
                    y: 8,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 5,
                    y: 8,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 7,
                    y: 8,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });

                draughts.push({
                    type: 1,
                    x: 2,
                    y: 7,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 4,
                    y: 7,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 6,
                    y: 7,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 8,
                    y: 7,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });

                draughts.push({
                    type: 1,
                    x: 1,
                    y: 6,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 3,
                    y: 6,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 5,
                    y: 6,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
                draughts.push({
                    type: 1,
                    x: 7,
                    y: 6,
                    viewClass: 'white-draught',
                    canMove: false,
                    selected: false,
                    mainDirrection: mainDirrection
                });
            }

            return draughts;
        }

        function fillBoard(player1, player2, board) {
            fillForPlayer(player1, board);
            fillForPlayer(player2, board);
        }

        function fillForPlayer(player, board) {
            for (var i = 0; i < player.figures.length; i++) {
                board[player.figures[i].y][player.figures[i].x].value = player.figures[i]
            }
        }

        function checkPosition(myx, myy, myclass, mytype, x, y, board) {
            if (mytype == 1) {
                if (board[y][x].unreacheble) return {
                    priority: 0,
                    x: x,
                    y: y
                };
                if (board[y][x].value == '') return {
                    priority: 1,
                    x: x,
                    y: y
                };
                if (board[y][x].value != '' && board[y][x].value.viewClass != myclass) {
                    if (board[2 * y - myy][2 * x - myx].unreacheble) return {
                        priority: 0,
                        x: 2 * x - myx,
                        y: 2 * y - myy
                    };
                    if (board[2 * y - myy][2 * x - myx].value == '') return {
                        priority: 2,
                        x: 2 * x - myx,
                        y: 2 * y - myy
                    };
                    else return {
                        priority: 0,
                        x: 2 * x - myx,
                        y: 2 * y - myy
                    };
                }
                return {
                    priority: 0,
                    x: x,
                    y: y
                };
            }
            //написать алгоритм проверки ходов для дамки
        }

        function possibleMove(draught, board) {
            var figure = draught;
            var values = [];
            var priority;

            //проверка направления движения, в зависимости от цвета пешки
            if (figure.mainDirrection > 0) {
                priority = checkPosition(figure.x, figure.y, figure.viewClass, figure.type, figure.x + 1, figure.y + 1, board);
                values.push(priority);
                values.push(checkPosition(figure.x, figure.y, figure.viewClass, figure.type, figure.x - 1, figure.y + 1, board));
                priority = checkPosition(figure.x, figure.y, figure.viewClass, figure.type, figure.x - 1, figure.y - 1, board);
                if (priority.prioryty == 2) values.push(priority);
                priority = checkPosition(figure.x, figure.y, figure.viewClass, figure.type, figure.x + 1, figure.y - 1, board);
                if (priority.priority == 2) values.push(priority);
            }
            if (figure.mainDirrection < 0) {
                priority = checkPosition(figure.x, figure.y, figure.viewClass, figure.type, figure.x + 1, figure.y - 1, board);
                values.push(priority);
                values.push(checkPosition(figure.x, figure.y, figure.viewClass, figure.type, figure.x - 1, figure.y - 1, board));
                priority = checkPosition(figure.x, figure.y, figure.viewClass, figure.type, figure.x + 1, figure.y + 1, board);
                if (priority.priority == 2) values.push(priority);
                priority = checkPosition(figure.x, figure.y, figure.viewClass, figure.type, figure.x - 1, figure.y + 1, board);
                if (priority.priority == 2) values.push(priority);
            }
            return values;
        }

        function showDraughtsWithMoves(player, board) {
            if (!player.move) return;
            //смотрим кто может ходить
            for (var i = 0; i < player.figures.length; i++) {
                var figure = player.figures[i];
                var values = possibleMove(figure, board);
                figure.movePriority = _.max(values, function(value) {
                    return value.priority;
                });
            }
            //проверяем есть ли атакующие
            var figureCanAttack = _.any(player.figures, function(figure) {
                return figure.movePriority.priority == 2
            })
            if (figureCanAttack) {
                //ходят только атакующие
                for (var i = 0; i < player.figures.length; i++) {
                    if (player.figures[i].movePriority.priority < 2) delete player.figures[i].movePriority;
                    else player.figures[i].canMove = true;
                }
            } else
            //если нет атакующих, то ходят все кто может
                for (var i = 0; i < player.figures.length; i++) {
                if (player.figures[i].movePriority.priority == 1) {
                    player.figures[i].canMove = true;
                    delete player.figures[i].movePriority;
                }
            }
        }

        function cleanPossibleMoves(board) {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++)
                    board[i][j].posibleMove = false;
            }
        }

        function showDraughtPosibleMovies(draught, board) {
            cleanPossibleMoves(board);
            var values = possibleMove(draught, board);
            //проверяем есть ли атакующие ходы
            var figureCanAttack = _.any(values, function(value) {
                return value.priority == 2
            })
            if (figureCanAttack) {
                var posibleMoves = _.filter(values, function(value) {
                    return value.priority == 2
                });
                _.each(posibleMoves, function(move) {
                    board[move.y][move.x].posibleMove = true;
                });
                draught.attack = true;
            } else {
                _.each(values, function(move) {
                    if (move.priority == 1) board[move.y][move.x].posibleMove = true;
                });
                draught.attack = false;
            }
        }


        function selectNew(player, x, y, board) {
            if (!checkBoard(x, y, board)) return;
            _.each(player.figures, function(figure) {
                if (x == figure.x && y == figure.y && figure.canMove) {
                    figure.selected = true;
                    selectedFigure = figure;
                    showDraughtPosibleMovies(figure, board);
                } else figure.selected = false
            })
        }

        function checkBoard(x, y, board) {
            if (board[y][x].value != '' && board[y][x].value.canMove)
                return true
            return false;
        }

        function checkMove(x, y, board) {
            if (board[y][x].posibleMove) return true;
            return false;
        }

        function makeMove(x, y, board) {
            if (checkMove(x, y, board)) {
                board[selectedFigure.y][selectedFigure.x].value = '';
                selectedFigure.x = x;
                selectedFigure.y = y;
                board[selectedFigure.y][selectedFigure.x].value = selectedFigure;
                cleanPossibleMoves(board);

                return true;
            }
            return false;
        }

        function clearFigures(player){
            _.each(player.figures,function(figure){figure.canMove=false;figure.selected = false});
        }

        function changeMove(player1,player2){
            clearFigures(player1);
            clearFigures(player2);
            if (player1.move) {player1.move = false; player2.move = true; return player2}
            if (player2.move) {player2.move = false; player1.move = true; return player1}
        }

        function logic(x, y, player1, player2, board) {
            selectNew(player1, x, y, board);
            selectNew(player2, x, y, board);
            if (makeMove(x, y, board)){
                gameLogic.showDraughtsWithMoves(changeMove(player1,player2),board);
            }
        }

        var gameLogic = {
            gameName: gameName,
            logic: logic,
            fillBoard: fillBoard,
            makeDraughts: makeDraughts,
            showDraughtsWithMoves: showDraughtsWithMoves
        }

        return gameLogic;
    }


})(angular.module("checkers"), _)
