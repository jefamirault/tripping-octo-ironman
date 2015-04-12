window.Commandr = (function(){
  function Commandr(){}

  var commandr = {
    registered: [],
    uberRegistered: [],
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
    registerToAll: function(fn) {
        this.uberRegistered.push(fn);
    },
    alertUberListeners: function(str) {
        for(var i=0;i < this.uberRegistered.length;i++) {
            this.uberRegistered[i].call(window, str);
        }
    },
    registerScroll: function() {
      for(var i = 0; i < arguments.length - 1; i++) {
        this.registered.push({"string":arguments[i],"command":function(){$('body').animate({scrollTop: $(arguments[arguments.length-1]).offset().top})}});
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
      for(var i=0; i< this.registered.length; i++){
          console.log(this.registered[i].string);
      }
    },
    speak: function(string) {
      $('#textArea').val(string);
      $('.speak-button').trigger('click');
    },
    initMarquee: function() {
        for(var i = 0; i < this.registered.length; i++) {
            console.log(this.registered[i].string);
            $('.marquee').html($('.marquee').html() + this.registered[i].string + "\"<br/>");
        }
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
  var audio = $('<audio></audio>').attr('autoplay','true').attr('preload','true').attr('autobuffer', 'true')
      .attr('controls', 'true').addClass('audio').css({display:'none'});
  var speakText = $('<textarea></textarea>').attr('id', 'textArea').attr('name', 'text').css({display:'none'});
  var speakButton = $('<div></div>').addClass('speak-button').css({display:'none'});
  var marquee = $('<marquee></marquee>').addClass('marquee').attr('behavior', 'scroll')
                            .attr('direction', 'up').attr('scrollamount', '1').attr('scrolldelay', '150');

  icon.append(pic);
  container.append(icon);
  textContainer.append(banner);
  textContainer.append(marquee);
  textContainer.append(spoken);
  container.append(textContainer);
  container.append(audio);
  container.append(speakText);
  container.append(speakButton);

  container.css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ddd',
    width: '400px',
    height: '75px',
    border: '3px solid black',
    borderTop: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomRightRadius: '15px',
    borderBottomLeftRadius: '15px',
    boxShadow: '2px 2px 1px #888, 2px -2px 1px #888',
    zIndex: '50',
    opacity: '0.8'
  });

  icon.css({
    display: 'inline-block',
    marginLeft: '20px',
    verticalAlign: 'top',
    marginTop: '10px'
  });

  pic.css({
    height: '45px',
    width: '27px',
    margin: 0
  });

  banner.css({
    verticalAlign: 'top'
  });

  spoken.css({
    width: '250px',
    height: '32px',
    display: 'inline-block',
    fontWeight: 'normal'
  });

  textContainer.css({
    display: 'inline-block',
    width: '300px',
    marginLeft: '30px',
    marginTop: '7px',
    fontSize: '14px',
    fontWeight: 'bold',
    overflow: 'hidden'
  });

  marquee.css({
    height: '12px',
    width: '150px',
    overflow: 'hidden'
  });

  spoken.text("");
  banner.append(marquee);
  banner.prepend("Say \"Commander ");
  $('body').prepend(container);


});

console.log("starting registrations");
Commandr.register("help", Commandr.help.bind(Commandr));
Commandr.register("scroll down", "go down", function(){$('body').animate({scrollTop: $('body').scrollTop()+ parseInt(screen.height - screen.height*0.15)}, 800);});
Commandr.register("scroll up", "go up", function(){$('body').animate({scrollTop: $('body').scrollTop()- (screen.height + parseInt(screen.height*0.15))}, 800);});
Commandr.register("spencer rules",function(){console.log("register worked (spencer rules)");});
$(function(){
    Commandr.initMarquee();
});
