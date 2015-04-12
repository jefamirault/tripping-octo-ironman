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
        }
      }
    }
  }

  return commandr;
}());

console.log("starting registrations");
Commandr.register("hello",function(){console.log("register worked (hello)");});
Commandr.register("goodbye",function(){console.log("register worked (goodbye)");});
Commandr.register("spencer rules",function(){console.log("register worked (spencer rules)");});

