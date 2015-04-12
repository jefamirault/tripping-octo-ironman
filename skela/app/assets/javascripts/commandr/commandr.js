window.Commandr = (function(){
  function Commandr(){}

  var commandr = {
    registered: [],
    register: function(){
      // expects any number of strings, followed by a function
      for(var i = 0; i < arguments.length - 1; i++) {
        this.registered.push({"string":arguments[i],"command":arguments[arguments.length-1]});
      }
    },
    registerLink: function() {
      for(var i = 0; i < arguments.length - 1; i++) {
        this.registered.push({"string":arguments[i],"command":function(){$(arguments[arguments.length-1]).click()}});
      }
    },
    registerScroll: function() {
      for(var i = 0; i < arguments.length - 1; i++) {
        this.registered.push({"string":arguments[i],"command":function(){$('html,body').animate({scrollTop: $(arguments[arguments.length-1]).offset().top})}});
      }
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
    },
    help: function() {
      for(var i=0; i< this.registered.length; i++) {
        console.log(this.registered[i].string);
      }
    },
    speak: function(string) {
      $('#textArea').val(string);
      $('.speak-button').trigger('click');
    }

  };

  return commandr;
}());



$(function(){
  var container = $('<div></div>').addClass('commander');
  var icon = $('<div></div>').addClass('commander-icon');
  var textContainer = $('<div></div>').addClass('commander-text-container');
  var pic = $('<img />').attr("src", "http://images.clipartpanda.com/radio-microphone-vector-RiGK4RoiL.png");
  var pic2 = $('<img />').attr("src", "http://png-4.findicons.com/files/icons/2768/freecns_cumulus/16/164_questionmark.png");
  var banner = $('<div></div>').addClass('commander-banner');
  var spoken = $('<div></div>').addClass('commander-spoken');
  var questionmark = $('<div></div>').addClass('commander-help');
  var toggler_up = $('<span></span>').addClass('commander-toggler-up');
  var toggler_down = $('<span></span>').addClass('commander-toggler-down');

  icon.append(pic);
  questionmark.append(pic2);
  container.append(icon);
  textContainer.append(banner);
  textContainer.append(spoken);
  container.append(textContainer);
  container.append(questionmark);
  toggler_up.text("▲");
  toggler_down.text("▼");

  container.append(toggler_up);
  container.append(toggler_down);

  toggler_up.css({
    position: 'absolute',
    bottom: '-23px',
    width: '16px',
    left: '0',
    right: '0',
    margin: 'auto',
    fontSize: '25px',
    display: 'none',
    cursor: 'pointer'
  });

  toggler_down.css({
    position: 'absolute',
    bottom: '-23px',
    width: '16px',
    left: '0',
    right: '0',
    margin: 'auto',
    fontSize: '25px',
    display: 'none',
    cursor: 'pointer'
  });
  var show_toggler = function() {toggler_up.toggle();}
  container.hover(show_toggler);

  toggler_up.click(function(){
    toggler_up.hide();
    container.off("hover", show_toggler);
    container.animate({top: '-'+container.height()+'px'}, 'slow');
    toggler_down.show();
  });

  toggler_down.click(function(){
    toggler_down.hide();
    toggler_up.show();
    container.hover(show_toggler);
    container.animate({top:0}, 'slow');
  });

  container.css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ddd',
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
    height: '45px',
    margin: 0
  });

  banner.css({
    verticalAlign: 'top'
  });

  spoken.css({
    width: '175px',
    height: '10px',
    display: 'inline-block',
    fontWeight: 'normal'
  });

  textContainer.css({
    display: 'inline-block',
    width: '175px',
    marginLeft: '30px',
    marginTop: '7px',
    fontSize: '14px',
    fontWeight: 'bold'
  });

  questionmark.css({
    display: 'inline',
    verticalAlign: 'top',
    cursor: 'pointer'
  });

  pic2.css({
    verticalAlign: 'top',
    marginTop: '3px'
  });

  $('body').prepend(container);

  banner.text("Say \"Commander...\"");
  spoken.text("");
});



console.log("starting registrations");
Commandr.register("goodbye",function(){console.log("register worked (goodbye)");});
Commandr.register("help",function(){
    Commandr.speak("Say Commander Goodbye");
});
Commandr.register("spencer rules",function(){console.log("register worked (spencer rules)");});
