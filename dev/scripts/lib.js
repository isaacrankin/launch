(function(window){

	var Flint = {};

	Flint.Base = {

		init: function(){
			return this;
		},

		extend: function(instance, initiate){
			if(typeof instance === "object"){

				// Copy defaults onto object, can be accessed later if needed
				if(typeof instance.defaults === "object"){
					for(var key in instance.defaults){
						this[key] = instance.defaults[key];
					}
				}

				// Copy over other properties
				for(var key in instance){
					this[key] = instance[key];
				}
			}

			// Disable auto initiate
			if(initiate !== false)
				this.init();

			return this;
		}
	}

	if(typeof window === "object" && typeof window.document === "object"){
		window.Flint = Flint;
	}
})(window);

