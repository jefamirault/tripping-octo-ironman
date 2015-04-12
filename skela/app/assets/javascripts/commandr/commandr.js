window.Commandr = (function(){
  function Commandr(){}

  var commandr = {
    registered: [],
    register: function(string, command){
      // expects string to be a word, and command to be afunction
      this.registered.push({"string":string,"command":command});
    },

    parse: function(string){
      // iterate through the registered functions, and do the ones that match
      for(i=0;i<this.registered.length;i++){
        if(("commander " + this.registered[i].string) == string){
          this.registered[i].command.call(window, string);
          return string;
        }
      }
      return null;
    }
  };

  return commandr;
}());



$(function(){
  var container = $('<div></div>').addClass('commander');
  var icon = $('<div></div>').addClass('commander-icon');
  var textContainer = $('<div></div>').addClass('commander-text-container');
  var pic = $('<img />').attr("src", "http://images.clipartpanda.com/radio-microphone-vector-RiGK4RoiL.png");
  var banner = $('<div></div>').addClass('commander-banner');
  var spoken = $('<div></div>').addClass('commander-spoken');
  icon.append(pic);
  container.append(icon);
  textContainer.append(banner);
  textContainer.append(spoken);
  container.append(textContainer);

  container.css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFD700',
    width: '300px',
    height: '75px',
    border: '3px solid black',
    borderTop: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomRightRadius: '15px',
    borderBottomLeftRadius: '15px',
    boxShadow: '2px 2px 1px #888, 2px -2px 1px #888',
    zIndex: '50'
  });

  icon.css({
    display: 'inline-block',
    marginLeft: '20px',
    verticalAlign: 'top',
    marginTop: '10px'
  });

  pic.css({
    height: '45px'
  });

  banner.css({
    verticalAlign: 'top'
  });

  spoken.css({
    width: '200px',
    height: '10px',
    display: 'inline-block',
    fontWeight: 'normal'
  });

  textContainer.css({
    display: 'inline-block',
    width: '200px',
    marginLeft: '30px',
    marginTop: '7px',
    fontSize: '14px',
    fontWeight: 'bold'
  });

  $('body').prepend(container);

  banner.text("Say \"Commander...\"");
  spoken.text("");
});



console.log("starting registrations");
Commandr.register("goodbye",function(){console.log("register worked (goodbye)");});
Commandr.register("spencer rules",function(){console.log("register worked (spencer rules)");});
Commandr.register("hello",navigateGames);
Commandr.register("play game",navigateGames);
Commandr.register("a one", squareOne);
Commandr.register("square one", squareOne);
Commandr.register("square to", squareTwo);
Commandr.register("square two", squareTwo);
Commandr.register("square too", squareTwo);
Commandr.register("square three", squareThree);
Commandr.register("square four", squareFour);
Commandr.register("square five", squareFive);
Commandr.register("square six", squareSix);
Commandr.register("square seven", squareSeven);
Commandr.register("square eight", squareEight);
Commandr.register("square nine", squareNine);


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
