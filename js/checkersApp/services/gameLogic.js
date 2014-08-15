'use strict';
(function(module, _) {
    module.factory('gameLogic', gameLogicFactory);

    function gameLogicFactory() {
        var gameName = 'checkers';

        var selectedFigure;
        var playerMove;
        var playera, playerb, board;

        function makeDraught(owner, mainDirrection, x, y) {
            return {
                type: 1,
                owner: owner,
                x: x,
                y: y,
                viewClass: owner == 2 ? 'dark-draught' : 'white-draught',
                canMove: false,
                selected: false,
                mainDirrection: mainDirrection
            }
        }

        function makeDraughts(owner, mainDirrection) {
            var draughts = [];
            var x, y, base;
            base = owner == 2 ? 1 : 6;

            for (var i = 0; i < 12; i++) {
                y = (i / 4 >> 0) + base;
                x = y % 2 == 1 ? (i % 4 + 1) * 2 : (i % 4) * 2 + 1;
                draughts.push(makeDraught(owner, mainDirrection, x, y));
            }

            return draughts;
        }

        function fillBoard() {
            fillForPlayer(playera);
            fillForPlayer(playerb);
        }

        function fillForPlayer(player) {
            for (var i = 0; i < player.figures.length; i++) {
                board[player.figures[i].y][player.figures[i].x].value = player.figures[i]
            }
        }

        function checkPosition(myx, myy, myowner, mytype, x, y) {
            if (mytype == 1) {
                if (board[y][x].unreacheble) return [{
                    priority: 0,
                    x: x,
                    y: y
                }];
                if (board[y][x].value == '') return [{
                    priority: 1,
                    x: x,
                    y: y
                }];
                if (board[y][x].value.owner != myowner) {
                    if (board[2 * y - myy][2 * x - myx].unreacheble) return [{
                        priority: 0,
                        x: 2 * x - myx,
                        y: 2 * y - myy
                    }];
                    if (board[2 * y - myy][2 * x - myx].value == '') return [{
                        priority: 2,
                        x: 2 * x - myx,
                        y: 2 * y - myy
                    }];
                    else return [{
                        priority: 0,
                        x: 2 * x - myx,
                        y: 2 * y - myy
                    }];
                }
                return [{
                    priority: 0,
                    x: x,
                    y: y
                }];
            }
            //алгоритм проверки ходов для дамки
            else return checkQuinPosition(myx, myy, myowner, x, y)
        }

        function checkQuinPosition(myx, myy, myowner, x, y) {
            var distance = 1;
            var posibleMoves = [];
            var priority = 1;
            //простой ход, без атаки
            while (board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].value == '' && !board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].unreacheble) {
                posibleMoves.push({
                    x: distance * x - myx * (distance - 1),
                    y: distance * y - myy * (distance - 1),
                    priority: priority
                });
                distance++;
            }
            //если уперлись в свою шашку, или конец поля то считаем что поиски окончены и возвращаем возможные ходы
            if (board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].owner == myowner ||
                board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].unreacheble)
                return posibleMoves;
            //если уперлись в чужую шашку, надо проверить можно ли её срубить, 
            //для этого за ней должно быть свободное поле
            if (board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].value.owner != myowner) {
                var closeX = distance * x - myx * (distance - 1);
                var closeY = distance * y - myy * (distance - 1);
                distance++;
                priority++;
                while (board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].value == '' && !board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].unreacheble) {
                    //ок, поле свободно, значит приоритет такого хода повышается
                    if (canAttackAdditionalVictim(distance * x - myx * (distance - 1), distance * y - myy * (distance - 1), closeX, closeY, myowner))
                    //если из этой позиции мы можем напасть еще на кого-то, то вообще супер
                        posibleMoves.push({
                        x: distance * x - myx * (distance - 1),
                        y: distance * y - myy * (distance - 1),
                        priority: priority + 1
                    });
                    else
                    //если не можем, то тоже неплохо
                        posibleMoves.push({
                        x: distance * x - myx * (distance - 1),
                        y: distance * y - myy * (distance - 1),
                        priority: priority
                    });
                    distance++;
                }
            }
            var thirdPriority = _.any(posibleMoves, function(move) {
                return move.priority == 3;
            })
            if (thirdPriority)
                _.each(posibleMoves, function(move) {
                    if (move.priority == 2) move.priority = 1;
                    if (move.priority == 3) move.priority = 2;
                });
            return posibleMoves;
        }

        function findVictim(myx, myy, x, y, myowner, closeX, closeY) {
            var distance = 1;
            //пропускаем пустые клетки
            while (board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].value == '' && !board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].unreacheble) {
                distance++;
            }
            //уперлись в непустую или край поля
            //если это край поля или своя фишка, то считаем что в данном направлении жертву не нашли
            //или это уже атакуемая фишка
            if (board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].unreacheble || board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].value.owner == myowner || (distance * y - myy * (distance - 1) == closeY && distance * x - myx * (distance - 1) == closeX))
                return false;
            //если уперлись в чужую фишку
            //и за ней есть пустое место, то это наша жертва
            if (board[distance * y - myy * (distance - 1)][distance * x - myx * (distance - 1)].value.owner != myowner 
                && !board[(distance + 1) * y - myy * distance][(distance + 1) * x - myx * distance].unreacheble 
                && board[(distance + 1) * y - myy * distance][(distance + 1) * x - myx * distance].value == '')
                return true;
        }

        function canAttackAdditionalVictim(x, y, closeX, closeY, myowner) {
            if (findVictim(x, y, x + 1, y + 1, myowner, closeX, closeY)) return true;
            if (findVictim(x, y, x + 1, y - 1, myowner, closeX, closeY)) return true;
            if (findVictim(x, y, x - 1, y + 1, myowner, closeX, closeY)) return true;
            if (findVictim(x, y, x - 1, y - 1, myowner, closeX, closeY)) return true;
            return false;
        }

        function possibleMove(draught) {
            var figure = draught;
            var values = [];
            var priority;
            //проверка направления движения, в зависимости от цвета пешки
            if (figure.mainDirrection > 0) {
                priority = checkPosition(figure.x, figure.y, figure.owner, figure.type, figure.x + 1, figure.y + 1, board);
                values = values.concat(values, priority);
                values = values.concat(values, checkPosition(figure.x, figure.y, figure.owner, figure.type, figure.x - 1, figure.y + 1, board));
                priority = checkPosition(figure.x, figure.y, figure.owner, figure.type, figure.x - 1, figure.y - 1, board);
                if (draught.type == 2 || priority[0].priority == 2) values = values.concat(values, priority);
                priority = checkPosition(figure.x, figure.y, figure.owner, figure.type, figure.x + 1, figure.y - 1, board);
                if (draught.type == 2 || priority[0].priority == 2) values = values.concat(values, priority);
            }
            if (figure.mainDirrection < 0) {
                priority = checkPosition(figure.x, figure.y, figure.owner, figure.type, figure.x + 1, figure.y - 1, board);
                values = values.concat(values, priority);
                values = values.concat(values, checkPosition(figure.x, figure.y, figure.owner, figure.type, figure.x - 1, figure.y - 1, board));
                priority = checkPosition(figure.x, figure.y, figure.owner, figure.type, figure.x + 1, figure.y + 1, board);
                if (draught.type == 2 || priority[0].priority == 2) values = values.concat(values, priority);
                priority = checkPosition(figure.x, figure.y, figure.owner, figure.type, figure.x - 1, figure.y + 1, board);
                if (draught.type == 2 || priority[0].priority == 2) values = values.concat(values, priority);
            }
            return values;
        }

        function showDraughtsWithMoves(player) {
            if (!player.isMyMove()) return;
            //смотрим кто может ходить
            for (var i = 0; i < player.figures.length; i++) {
                var figure = player.figures[i];
                var values = possibleMove(figure);
                figure.movePriority = _.max(values, function(value) {
                    return value.priority;
                });
                figure.posibleMoves = values;
            }
            //проверяем есть ли атакующие
            var figureCanAttack = _.any(player.figures, function(figure) {
                return figure.movePriority.priority == 2;
            })
            var moveCount = 0;
            if (figureCanAttack) {
                //ходят только атакующие
                for (var i = 0; i < player.figures.length; i++) {
                    if (player.figures[i].movePriority.priority === 2) {
                        player.figures[i].canMove = true;
                        player.figures[i].posibleMoves = _.filter(player.figures[i].posibleMoves, function(value) {
                            return value.priority === 2
                        });
                        moveCount++;
                    }
                    delete player.figures[i].movePriority;
                }
            } else {
                //если нет атакующих, то ходят все кто может
                for (var i = 0; i < player.figures.length; i++) {
                    if (player.figures[i].movePriority.priority == 1) {
                        player.figures[i].canMove = true;
                        player.figures[i].posibleMoves = _.filter(player.figures[i].posibleMoves, function(value) {
                            return value.priority === 1
                        });
                        moveCount++;
                    }
                    delete player.figures[i].movePriority;
                }
            }
            return moveCount;
        }

        function cleanPossibleMoves() {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++)
                    board[i][j].posibleMove = false;
            }
        }

        function showDraughtPosibleMovies(draught) {
            cleanPossibleMoves();
            var values = draught.posibleMoves?draught.posibleMoves:possibleMove(draught);
            //проверяем есть ли атакующие ходы
            var figureCanAttack = _.any(values, function(value) {
                    return value.priority == 2
                })
                //Если есть атакующие ходы, то показываем только их
            if (figureCanAttack) {
                var posibleMoves = _.filter(values, function(value) {
                    return value.priority == 2
                });
                _.each(posibleMoves, function(move) {
                    board[move.y][move.x].posibleMove = true;
                });
                draught.attack = true;
            } else {
                //если атакующих нет, показываем все остальные
                _.each(values, function(move) {
                    if (move.priority == 1) board[move.y][move.x].posibleMove = true;
                });
                draught.attack = false;
            }
        }

        function selectNew(player, x, y) {
            //ожидаем что на месте клика фигура, которая может ходить 
            if (board[y][x].value == '' || !board[y][x].value.canMove) return;
            //выбираем фигуру и если она может ходить, показываем её ходы
            _.each(player.figures, function(figure) {
                if (x == figure.x && y == figure.y && figure.canMove) {
                    figure.selected = true;
                    selectedFigure = figure;
                    showDraughtPosibleMovies(figure);
                } else figure.selected = false
            })
        }

        function cleanDestroyedDaughts(startx, starty, x, y) {
            var xDirrection = x - startx > 0 ? 1 : -1;
            var yDirrextion = y - starty > 0 ? 1 : -1;
            var i = startx,
                j = starty;
            while (i != x && j != y) {
                if (board[j][i].value != '') {
                    playera.removeFigure(board[j][i].value);
                    playerb.removeFigure(board[j][i].value);
                    board[j][i].value = '';

                    playerMove.destroyedCount++;
                }
                i += xDirrection;
                j += yDirrextion;
            }
        }

        //возвращает true - ход завершен, или false - ход продолжается
        function makeMove(x, y) {
            //проверяем возможен ли данный ход
            if (board[y][x].posibleMove) {
                //собственно сам ход
                board[selectedFigure.y][selectedFigure.x].value = '';
                var old_x = selectedFigure.x;
                var old_y = selectedFigure.y;
                selectedFigure.x = x;
                selectedFigure.y = y;
                board[selectedFigure.y][selectedFigure.x].value = selectedFigure;
                cleanPossibleMoves();
                delete selectedFigure.posibleMoves;
                //проверяем, может пора делать дамку
                if (y == 1 && selectedFigure.owner == 1 || y == 8 && selectedFigure.owner == 2) {
                    selectedFigure.type = 2;
                    selectedFigure.viewClass += ' quin';
                }
                //https://www.gambler.ru/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0_%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D1%85_%D1%88%D0%B0%D1%88%D0%B5%D0%BA
                // Если обычная шашка достигает последней горизонтали в результате боя шашки противника 
                // (где ей полагается превращаться в дамку), и если ей предоставляется возможность дальнейшего 
                // взятия вражеских шашек, то она обязана тем же ходом продолжать бой, но уже на правах дамки. 
                if (selectedFigure.attack) {
                    cleanDestroyedDaughts(old_x, old_y, x, y);
                    clearFigures(playerMove, selectedFigure);
                    showDraughtPosibleMovies(selectedFigure);
                    //если у фигуры есть атакующие ходы, то ход продолжается
                    if (selectedFigure.attack) {
                        return false;
                    } else {
                        cleanPossibleMoves();
                        return true;
                    }

                }
                return true;
            }
            return false;
        }

        function clearFigures(player, except) {
            _.each(player.figures, function(figure) {
                if (figure === except) return;
                figure.canMove = false;
                figure.selected = false;
                figure.attack = false;
            });
        }

        function changeMove() {
            clearFigures(playera);
            clearFigures(playerb);
            if (playera.isMyMove()) {
                playera.stopMove();
                playerb.startMove();
                playerMove = playerb;
                return playerb
            }
            if (playerb.isMyMove()) {
                playerb.stopMove();
                playera.startMove();
                playerMove = playera;
                return playera
            }
        }

        function moveHandler(x, y) {
            selectNew(playera, x, y);
            selectNew(playerb, x, y);
            if (makeMove(x, y)) {
                var moveCount = showDraughtsWithMoves(changeMove());
                if (moveCount == 0) return changeMove();
            }
        }

        function startGame(player1, player2, _board) {
            playera = player1;
            playerb = player2;
            board = _board;
            playera.figures = makeDraughts(1, -1);
            playerb.figures = makeDraughts(2, 1);
            fillBoard();
            playera.startMove();
            playerMove = playera;
            showDraughtsWithMoves(playera);
        }

        var gameLogic = {
            gameName: gameName,
            makeMove: moveHandler,
            startGame: startGame
        }

        return gameLogic;
    }


})(angular.module("checkers"), _)
