const eventRegistry = function(){
    //private things
    var _eventRegistry = {}
    
    return {
        //public things
        addEvent: (name, callback) => {
            if (_eventRegistry[name] != null){
                console.log("There is already an event registred with name of " + name);
            }

            _eventRegistry[name] = callback;
        },

        getEvent: (name) => {
            return _eventRegistry[name];
        }
    }
}();

const eventNameGenerator = function(){
    //private things

    //public things
    return {
        getChangeCellNumberEventName: (x, y) => "changeNumber_" + x + "_" + y,
        getShowErrorEventName: (x, y) => "showError_" + x + "_" + y,
    }
}();

export {eventRegistry, eventNameGenerator};

