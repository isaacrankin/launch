/* global Mediator:false, Lib:false */

'use strict';

var App = {};

(function(window, document, $) {

    $(function(){

        App.mediator = new Mediator();

        //TODO: install a router???

        // Example use of modules
        // ----------------------------------------------------------------

        // Example ES6 module
        var example = new Lib.Module('Example ES6 Module');
        console.log(example.message('using an ES6 method'));

        // Example ES5 module
        var es5Example = new Lib.ES5Module('Example ES5 Module');
        console.log(es5Example.message('using an ES5 method'));

        // Channels
        // ----------------------------------------------------------------
        App.mediator.subscribe('exampleChannel', function (arg) {
            console.log(arg);
        });

        // Initiate Plugins
        // ----------------------------------------------------------------

    });

})(window, document, jQuery);