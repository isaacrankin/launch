(function(window, document, $, undefined){


	//TODO: write merge functionality
	//TODO: write examples
	//TODO: package into library called Spark or Fire or Flint or kindling


	// Object.create allows for true Prototypal inheritence
	// But "new" allows for a proper constructor method


	// Define classes
	var ParentPrototype = Object.create(Flint.Base).extend({

		defaults:{
			_val: "default value"
		},

		init: function(){
			console.log("Parent Initialized");
		},

		get: function(){
			return this._val;
		},

		set: function(value){
			this._val = value;
		}
	});

	var Child = Object.create(ParentPrototype).extend({

		init: function(){
			this.play();
		},

		play: function(){
			alert('watch out and play');
		}
	});

	var SecondChild = Object.create(ParentPrototype).extend({
		shout: function(words){
			return words+"!!!";
		}
	});

	var GrandChild = Object.create(Child).extend({
		init: function(){

		}
	});

	var Carousel = Object.create(Flint.Base).extend({

		defaults:{
			interval: 3000,
			pause: true
		},

		create: function(){

		},

		destroy: function(){

		},

		play:function(){

		},

		pause: function(){

		},

		transition: function(){

		}
	});

	var homepageCarousel = Object.create(Carousel).extend();
	homepageCarousel.create();

	var siteCarousel = Object.create(Carousel).extend({
		interval: 6000
	});
	siteCarousel.create();


	console.log(siteCarousel.interval);





	ParentPrototype.set("overrulled");
	GrandChild.set("Grandchild is unique");

	console.log(Child.get());
	console.log(SecondChild.get());
	console.log(GrandChild.get());

	console.log(Child);
	console.log(GrandChild);

	return;




	/* Simple JavaScript Inheritance
	 * By John Resig http://ejohn.org/
	 * MIT Licensed.
	 */
	// Inspired by base2 and Prototype
	(function(){
		var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

		// The base Class implementation (does nothing)
		this.Class = function(){};

		// Create a new Class that inherits from this class
		Class.extend = function(prop) {
			var _super = this.prototype;

			// Instantiate a base class (but only create the instance,
			// don't run the init constructor)
			initializing = true;
			var prototype = new this();
			initializing = false;

			// Copy the properties over onto the new prototype
			for (var name in prop) {
				// Check if we're overwriting an existing function
				prototype[name] = typeof prop[name] == "function" &&
					typeof _super[name] == "function" && fnTest.test(prop[name]) ?
					(function(name, fn){
						return function() {
							var tmp = this._super;

							// Add a new ._super() method that is the same method
							// but on the super-class
							this._super = _super[name];

							// The method only need to be bound temporarily, so we
							// remove it when we're done executing
							var ret = fn.apply(this, arguments);
							this._super = tmp;

							return ret;
						};
					})(name, prop[name]) :
					prop[name];
			}

			// The dummy class constructor
			function Class() {
				// All construction is actually done in the init method
				if ( !initializing && this.init )
					this.init.apply(this, arguments);
			}

			// Populate our constructed prototype object
			Class.prototype = prototype;

			// Enforce the constructor to be what we expect
			Class.prototype.constructor = Class;

			// And make this class extendable
			Class.extend = arguments.callee;

			return Class;
		};
	})();

	// Base level Class for all "working" classes
	var Base = Class.extend({

		defaults:{
			name: "Base",
			_val: "BaseValDefault"
		},

		init: function(config){

			// Copy defaults onto object, can be accessed later if needed
			if(typeof this.defaults === "object"){
				for(var key in this.defaults){
					this[key] = this.defaults[key];
				}
			}

			// Copy config properties onto object, over-writing defaults
			if(typeof config === "object"){
				for(var key in config){
					this[key] = config[key];
				}
			}

			return this;
		},

		set: function(value){
			this._val = value;
		},

		get: function(){
			console.log('base get method');
			return this._val;
		}
	});

	var Carousel = Base.extend({
		init: function(config){
			this._super(config);

			// Do other things for the Carousel class
		}
	});

	var Form = Base.extend({

		testa: 'holla',

		init: function(config){
			this._super(config);

			// Do other things for the Form class
		},

		get: function(){
			return 'Form calling parent: '+this._super();
		}
	});

	var SubForm = Form.extend({
		init: function(config){
			this._super(config);

			// Do other things for the Form class
		},
		get: function(){
			return "SubForm calling..."+this._super();
		}
	});

	var b = new Base();
	var c = new Carousel({ name: "Carousel" });
	var f = new Form({ name: "Form" });
	var sf = new SubForm();

	console.log(b.name);
	console.log(c.name);
	console.log(f.get());
	console.log(f.defaults);
	console.log(sf.get());
	console.log(sf.testa);


})(window, document, jQuery);