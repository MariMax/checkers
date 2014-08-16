module.exports = {
'Page title is correct': function (test) {
  test
    .open('http://localhost:8080')
    .assert.title().is('Checkers', 'It has title')
    .done();
},
'Page has counter': function(test){
	test
		.open('http://localhost:8080')
		.assert.visible('.count')
		.done();
},
'Page has player info': function(test){
	test
		.open('http://localhost:8080')
		.assert.visible('.player-info')
		.assert.numberOfElements('.player-info', 2, '2 player-info are presented')
		.done();
},
'Page has restart button': function(test){
	test
		.open('http://localhost:8080')
		.assert.visible('.start-button')
		.done();
},
'Page has text click here for start': function(test){
	test
		.open('http://localhost:8080')
		.assert.visible('.cover-board')
		.assert.text('.cover-board').is('Кликните для начала игры')
		.done();
},
'start game': function(test){
	test
		.open('http://localhost:8080')
		.assert.visible('.cover-board')
		.click('.cover-board')
		.assert.numberOfElements('.white-draught', 12, '12 white-draught are presented')
		.assert.numberOfElements('.dark-draught', 12, '12 dark-draught are presented')
		.done();
},
're-start game': function(test){
	test
		.open('http://localhost:8080')
		.assert.visible('.cover-board')
		.click('.cover-board')
		.assert.numberOfElements('.white-draught', 12, '12 white-draught are presented')
		.assert.numberOfElements('.dark-draught', 12, '12 dark-draught are presented')
		.assert.visible('.start-button')
		.click('.start-button')
		.assert.visible('.cover-board')
		.assert.visible('.count')
		.assert.text('.count').is('0:0')
		.done();
},
'first-move':function(test){
	test
		.open('http://localhost:8080')
		.assert.visible('.cover-board')
		.click('.cover-board')
		.assert.numberOfElements('.white-draught', 12, '12 white-draught are presented')
		.assert.numberOfElements('.dark-draught', 12, '12 dark-draught are presented')
		.assert.numberOfElements('.can-move', 4, '4 white-draught can move')
		.click('.can-move')
		.assert.numberOfElements('.selected', 1, '1 draught is selected')
		.assert.numberOfElements('.posible-move', 1, 'it has only 1 posible move')
		.click('.posible-move')
		.assert.numberOfElements('.can-move', 4, '4 dark-draught can move')
		.done();
},
};