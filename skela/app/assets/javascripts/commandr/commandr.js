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
        if(this.registered[i].string.indexOf(string) == 0){
          this.registered[i].command.call(window, string);
        }
      }
    }
  }

  return commandr;
}());

console.log("starting registrations");
Commandr.register("commander",function(){console.log("register worked");});
