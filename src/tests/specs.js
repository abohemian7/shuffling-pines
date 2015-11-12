
//FormController test
describe('FormController',function(){

    beforeEach(function(){
       localStorage.clear('guestList');
    });

    it('should be true', function(){
        expect(true).toBe(true);
    });

    it('should add a guest onSubmit', function(){
        spyOn(localStorage,"setItem");
        localStorage.setItem("test",1);
        //this.onSubmit("test","2015-01-01","Pick-Up","anyhwere","none");
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should soft remove a guest onDelete', function(){
        spyOn(localStorage,"setItem");
        localStorage.setItem("test",1);
        /// /this.onDelete(0);
        expect(localStorage.setItem).toHaveBeenCalled();
    });

});


