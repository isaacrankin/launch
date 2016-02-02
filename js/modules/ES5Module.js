var Lib = Lib || {};

Lib.ES5Module = function(title){

    var _privateMethod = function(){
        return 'private method';
    };

    return {
        init: function(title){
            this.title = title;
            return this;
        },
        message: function(message){
            return 'Your message: ' + message;
        }
    }.init(title);
};