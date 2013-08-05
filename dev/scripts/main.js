(function(window, document, $, undefined){


	// Simple inheritence: http://alexsexton.com/blog/2013/04/understanding-javascript-inheritance/
	var ParentPrototype = {
		_super: this,
		zero: 0,
		one: 1,
		_val: "fishes",

		defaults:{

		},

		init: function(properties){

			// copy defaults onto object - can access defaults later if needed
			// copy properties onto object - over-writting defaults

			console.log(properties);

			// Must return this
			return this;
		},

		get: function(){
			return this._val;
		},

		set: function(value){
			this._val = value;
		}
	};

	var myOptions = Object.create(ParentPrototype).init({ option: "hola" });
	var yourOptions = Object.create(ParentPrototype);

	// When I want to change *just* my options
	myOptions.two = 1000;
	myOptions.set("birds");

	// Extend the get method on the parent.
	myOptions.get = function(){
		return this._val+" overide the parent method!";

		// Call parent method directly - dodgy?
		//return ParentPrototype.get.call(this)+' extended method!!';
	}

	// When you wanna change yours
	yourOptions.one = 42;

	// When we wanna change the **defaults** even after we've got our options
	// even **AFTER** we've already created our instances
	ParentPrototype.two = 2;
	ParentPrototype.set("cows");

	var newOptions = Object.create(myOptions);


	console.log(myOptions.two); // 1000
	console.log(yourOptions.two); // 2
	console.log(newOptions.two); // 1000

	console.log(yourOptions.get()); // cows, inherited from parent
	console.log(myOptions.get()); // birds, as set directly
	myOptions.set('chickens');

	console.log(newOptions.get()); // chickens, as inherited from parent

})(window, document, jQuery);