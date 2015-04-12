Commandr.register("play game",navigateGames);
Commandr.register("top left", "square one", squareOne);
Commandr.register("top middle","square to", squareTwo);
Commandr.register("top right", "square three", squareThree);
Commandr.register("middle left", "square four", squareFour);
Commandr.register("middle middle", "center", "square five", squareFive);
Commandr.register("middle right", "square six", squareSix);
Commandr.register("bottom left", "square seven", squareSeven);
Commandr.register("bottom middle","square eight", squareEight);
Commandr.register("bottom right", "square nine", squareNine);


function navigateGames(){
  $.ajax({
    url: '/games/tic_tac_toe',
    dataType: 'script'
  });
  //debugger;
  navigate('games');
  console.log('play game');
}

function squareOne() {
  $('.tic_tac_toe_board').find('div:eq(0)').trigger('click');
  console.log('square 1');
}
function squareTwo() {
  $('.tic_tac_toe_board').find('div:eq(1)').trigger('click');
  console.log('square 2');
}
function squareThree() {
  $('.tic_tac_toe_board').find('div:eq(2)').trigger('click');
  console.log('square 3');
}
function squareFour() {
  $('.tic_tac_toe_board').find('div:eq(3)').trigger('click');
  console.log('square 4');
}
function squareFive() {
  $('.tic_tac_toe_board').find('div:eq(4)').trigger('click');
  console.log('square 5');
}
function squareSix() {
  $('.tic_tac_toe_board').find('div:eq(5)').trigger('click');
  console.log('square 6');
}
function squareSeven() {
  $('.tic_tac_toe_board').find('div:eq(6)').trigger('click');
  console.log('square 7');
}
function squareEight() {
  $('.tic_tac_toe_board').find('div:eq(7)').trigger('click');
  console.log('square 8');
}
function squareNine() {
  $('.tic_tac_toe_board').find('div:eq(8)').trigger('click');
  console.log('square 9');
}
