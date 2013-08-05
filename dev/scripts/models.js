
var Flint = (typeof Flint === "object") ? Flint : {};

Flint.Base = {

	init: function(){
		return this;
	},

	extend: function(instance){
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
		this.init();
		return this;
	}
}
