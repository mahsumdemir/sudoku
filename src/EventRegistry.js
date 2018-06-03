var eventRegistry = function (name, parent) {
    var _childs = {};
    var _events = {};
    var _name = name;
    var _parent = parent;
    var _root;

    return {
      addEvent: function(name, callback){
        if (_childs[name] != null) {
          console.log("There is already an event registred with name of " + name);
        }
  
        _events[name] = callback;
      },
  
      getEvent: function(name){ return _events[name]; },
      getName: function(){ return _name; },
      getParent: function() { return _parent; },
      addChild: function(name, child){ _childs[name] = child; },
      getChild: function(name) { 
        if (_childs[name] == null) console.log("there is no child named " + name + " in " + _name);
        return _childs[name] 
      },
      getRoot: function(){ return _root; },
      setRoot: function(root) { _root = root },
      getAllChilds: function() { return _childs},
      getAllEvents: function() { return _events },

      fire: function(name, ...params){
        if (_events[name] == null) {
          console.log("There is no event name:" + name + " in " + _name);
          return;
        }
        console.log("executing event " + name + " on " + _name);
        _events[name](...params); 
      },

      newRegistry: function(name){
        var newRegistry = eventRegistry(name, this);
        newRegistry.setRoot(_root);
        this.addChild(name, newRegistry);
        
        return newRegistry;  
      }
    }
};

var parent = eventRegistry("root", null);
parent.setRoot(parent);

export default parent;