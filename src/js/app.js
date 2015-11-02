var app = angular.module('shuffling', []);

app.factory('notify', ['$window', function(win) {
   var msgs = [];
   return function(msg) {
     msgs.push(msg);
     if (msgs.length == 3) {
       win.alert(msgs.join("\n"));
       msgs = [];
     }
   };
 }]);

app.controller('FormController', [function(){

  var vm = this;

    var onSubmit = function(){
      tester="duh"
      console.log(tester);
    };

    var Guest = function(name, transitionDate, status, location){
        this.Name = name || 'Default name';
        this.transitionDate = transitionDate || new Date();
        this.status = status || 'Drop-off';
        this.location = location;

        return this;
    };

    var initGuests = [new Guest('John Harvard',null,null,'front')];
    console.log(initGuests);
    console.log(JSON.stringify(initGuests));
    localStorage.guests = JSON.stringify(initGuests);

    var tester = "";

    // delete - this.delete = true

}]);

app.controller('TabController', [function(){

    var vm = this;

}]);
