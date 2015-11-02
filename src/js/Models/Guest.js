define(function(){

    var Guest = function(name, transitionDate, status, location){
        this.Name = name || 'Default name';
        this.transitionDate = transitionDate || new Date();
        this.status = status || 'Drop-off';
        this.location = location;
    };

    return Guest;
});
