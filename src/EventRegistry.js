var eventRegistry = function (name, parent) {
    var _childs = {};
    var _events = {};
    var _name = name;
    var _parent = parent;

    return {
      addEvent: function(name, callback){
        if (_childs[name] != null) {
          console.log("There is already an event registred with name of " + name);
        }
  
        _events[name] = callback;
      },
  
      getEvent: function(name){
        return _events[name];
      },

      getName: function(){ return _name; },
      getParent: function() { return _parent; },
      addChild: function(name, child){
        _childs[name] = child;
      },

      newRegistry: function(name){
        var newRegistry = eventRegistry(name, this);
        
        this.addChild(newRegistry);
        
        return newRegistry;  
      }
    }
};

var parent = eventRegistry("root", null);

export default parent;