
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

        this.transDate = new Date('yyyy-mm-dd');

        this.onSubmit = function(name,transDate,status,location){

            var tester="duh"

            var Guest = {
            name : name || 'Default name',
            transitionDate : transDate || new Date(),
            status : status || 'Drop-off',
            location : location || 'nowhere'
            };

            console.log(tester + JSON.stringify(Guest));

        };

        console.log(initGuest);

    }])

    .value('initGuest','John Harvard')

    .directive('clock', ['dateFilter','$interval',function(dateFilter, $interval){

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

    .directive('guests', [function(){

        var vm = this;

        var baseHtml =


        vm.html()

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

    }])

    // service = values by ref
    .service('localGuests',[function(){

    }]);
