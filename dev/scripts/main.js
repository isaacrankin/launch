(function(window, document, $, undefined){

	window.App = {
		Controllers: {}
	};

	/**
	 * Application settings
	 */
	App.Config = {
		route_tag : 'body',
		route_key : 'page' // the key used to find the router data attribute on the body tag
	}

	/**
	 * Initialize application
	 */
	App.init = function(){
		console.log('Initialize application');

		// Functionality for all pages here...
		App.Controllers.Modal();

		// Route page to correct controller
		App.Router();



		return this;
	};

	/**
	 * Backbone Router
	 */
	App.BackboneRouter = Backbone.Router.extend({

		routes: {
			"help":                 "help",    // #help
			"search/:query":        "search",  // #search/kiwis
			"search/:query/p:page": "search"   // #search/kiwis/p7
		},

		help: function() {

		},

		search: function(query, page) {

		}
	});

	/**
	 * Basic Router
	 */
	App.Router = function( controller ){

		if( controller === undefined ) {
			// Look for page in the DOM
			var controller = $( App.Config.route_tag ).data( App.Config.route_key );
		}

		// Find controller and execute
		var fn = App.Controllers[ controller ];
		if(typeof fn === 'function') {
			fn();
		}else{
			console.log('Error: Can\'t find controller "'+key+'"');
			return false;
		}

		return this;
	}


	/**
	 * Utility methods
	 */
	App.Utils = {

		example_util : function(scope){
			console.log('Example util function from: '+scope);

			return this;
		}
	}

	/**
	 * Example Controller
	 */
	App.Controllers.Modal = function(){



		view = new ModalWindow({ content: 'Hello world' });



	}

	/**
	 * Example Controller
	 */
	App.Controllers.Contact = function(){

		App.Utils.example_util('controller');

		// Load data

		// Create models
		var contact = new App.Models.Contact();

		// Create views


		return this;
	}

	// Load application scripts
	require(["models-collections", "views"], function() {
		console.log( 'Scripts loaded' );

		App.init();
	});

})(window, document, jQuery);