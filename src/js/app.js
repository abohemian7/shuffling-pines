Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]); // padding
};

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

    .controller('FormController', ['initGuest', 'notify','localGuests', function(initGuest, notify, localGuests){

        var vm = this;

        this.transDate = new Date().yyyymmdd;

        this.localGuests = localGuests.data;

        this.onSubmit = function(name,transDate,status,location){

            var Guest = {
            name : name || 'Default name',
            transitionDate : transDate.yyyymmdd() || new Date().yyyymmdd(),
            status : status || 'Drop-off',
            location : location || 'nowhere'
            };

            console.log(JSON.stringify(Guest));
            localGuests.addGuest(Guest);

        };

        this.onDelete = function(guestIndex){
            localGuests.removeGuest(guestIndex);
        }

        console.log(initGuest);

    }])

    .value('initGuest','John Harvard')

    .directive('clock', ['dateFilter','$interval',function(dateFilter, $interval){

        var link = function(scope, element){

            var format = element.attr('format') || 'HH:mm:ss';
            var updateTime = function(){
                var now = Date.now();

                element.html(dateFilter(now, format) + " hrllo");

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

        var oldGuests = [];

        var addGuest = function(aGuest){

            oldGuests.push(aGuest)
            localStorage.setItem('guestList',JSON.stringify(oldGuests));

        };

        try{

            oldGuests = (JSON.parse(localStorage.getItem('guestList')) || []);

        } catch(e){
            console.log(e);
        };

        console.log(oldGuests.length);

        if(!oldGuests.length){

            var newGuest = {
                name : 'Default name',
                transitionDate : new Date().yyyymmdd(),
                status : 'Drop-off',
                location : 'nowhere'
            };

            addGuest(newGuest);
        }

        var softDelete = function(guestIndex){

            oldGuests[guestIndex].delete = true;
            localStorage.setItem('guestList',JSON.stringify(oldGuests));

        };

        return {
            data: oldGuests,
            addGuest: addGuest,
            removeGuest: softDelete
        };

    }]);
