(function(window, document, $, undefined){


	// Backbone JS inheritence experiments
	var Parent = Backbone.Model.extend({

		talk: function(){
			return "Parent Talking";
		}

	});

	var Child = Parent.extend({
		defaults:{
			_val: "child val"
		},

		talk: function(){
			return Child.__super__.talk()+" appended by a child";
		}
	});

	var p = new Parent();
	var c = new Child();

	Child.newMethod = function(){
		return "new method";
	};

	console.log(c.talk());


	return;




	// Homemade prototypal inheritance

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
			console.log("grandchild init");
		}
	}, false);


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
	console.log(SecondChild);
	console.log(GrandChild);


})(window, document, jQuery);