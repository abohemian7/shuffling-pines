
angular.module('shuffling', [])

    .factory('notify', ['$window', function(win) {
   var msgs = [];
   return function(msg) {
     msgs.push(msg);
     if (msgs.length == 3) {
       win.alert(msgs.join("\n"));
       msgs = [];
     }
   };
 }])

    .controller('FormController', ['initGuest', 'notify', function(initGuest, notify){

        var vm = this;

        var guestStatus = vm.guestStatus;

        this.onSubmit = function(name,transDate,status,location){

            var tester="duh"

            var Guest = {
            name : name || 'Default name',
            transitionDate : transDate || new Date(),
            status : guestStatus || 'Drop-off',
            location : location || 'nowhere'
            };

            //console.log($scope.guestStatus);
            console.log(guestStatus);

            console.log(tester + JSON.stringify(Guest));
        };

        this.transDate = new Date('yyyy-mm-dd');

        // $scope.initGuests = ['test','test2'];
        //$scope.notify = notify;

        console.log(initGuest);

}])

    .value('initGuest','John Harvard');

app.directive('guests', ['dateFilter','$interval',function(dateFilter, $interval){

  var link = function(scope, element,attrs){

  var format = element.attr('format') || 'HH:mm:ss';
  var updateTime = function(){
    var now = Date.now();

    element.html(dateFilter(now, format));

    };

    $interval(updateTime,1000);

    updateTime();

  };

  return {
    restrict: ['E'],
    link: link
  };

}])
    .factory('guestFactory',['formFields', function($scope){

    var Guest = {
        name : $scope.name || 'Default name',
        transitionDate : $scope.transitionDate || new Date(),
        status : $scope.status || 'Drop-off',
        location : $scope.location || 'nowhere'
    };

    return {Guest};

}]);
