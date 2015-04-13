/*global Lib:false, Mediator:false */

'use strict';

var App = {};

(function(window, document, $) {

    /*
     App configuration goes here, include things like:

     - Rest API urls
     - API keys, e.g FB App ID
     - Google Analytics code
     - Google map options
     - Environment specific values
     */
    var options = {
        rootURL: '/'
    };

    $(function(){

        // Router
            // Ember?

        // Modules
            // Module pattern for ES 5?
            // ES6?

        // Module loader
            // webpack & Common JS?

        // Mediator / Dispatcher
            // Custom mediator?
            // Facebook Dispatcher?

        // DOM binding manipulation
            // jQuery

        // Rendering & templating
            // jQuery + Underscore
            // React

        console.log('Go application!');

        App.mediator = new Mediator();

        // Channels
        // ----------------------------------------------------------------
        App.mediator.subscribe('exampleChannel', function (arg) {
            console.log(arg);
        });

        // Plugins
        // ----------------------------------------------------------------

    });

})(window, document, jQuery);