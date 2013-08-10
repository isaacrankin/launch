"use strict";

(function(window, document, $, _){

	// Magic goes here...

	var Parent = function(){
		return{
			init:function(config){

				console.log(config);

				this.get();

				return this;
			}
		}
	}


	var parent = new Parent().init();


})(window, document, jQuery, _);