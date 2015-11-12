Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return retVal = yyyy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]);

    //return retVal; // padding
};

angular.module('shuffling', [])

    .controller('FormController', ['localGuests', function(localGuests){

        var vm = this;

        this.transDate = new Date().yyyymmdd;

        this.localGuests = localGuests.data;

        this.onSubmit = function(name,transDate,status,location, preferences){

            var Guest = {
                name : name || 'Default name',
                transitionDate : transDate.yyyymmdd() || new Date().yyyymmdd(),
                status : status || 'Drop-off',
                location : location || 'nowhere',
                preferences: preferences || 'none'
            };

            console.log(JSON.stringify(Guest));
            localGuests.addGuest(Guest);

            return 1;

        };

        this.onDelete = function(guestIndex){
            localGuests.removeGuest(guestIndex);
        };

    }])

    .controller('GuestsController', ['localGuests', function(localGuests){

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
            this.confirm = false;
        };

    }])

    // service = values by ref
    .service('localGuests',[function(){

        var oldGuests = [];

        var addGuest = function(aGuest){

            oldGuests.push(aGuest);
            localStorage.setItem('guestList',JSON.stringify(oldGuests));

        };

        try{

            oldGuests = (JSON.parse(localStorage.getItem('guestList')) || []);

            for(var i = 0; i < oldGuests.length; i++){
                if(oldGuests[i].delete){
                    oldGuests.splice(i,1);
                    i--;
                }
            }

        } catch(e){
            console.log(e);
        }

        console.log(oldGuests.length);

        if(!oldGuests.length){

            var newGuest = {
                name : 'Default name',
                transitionDate : new Date().yyyymmdd(),
                status : 'Drop-off',
                location : 'somewhere',
                preferences: 'none'
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
