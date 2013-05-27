window.App.Views = {

	ContactForm : Backbone.View.extend({

		tagName: "form",

		className: "contact-form",

		events: {
			"click .icon":          "open",
			"click .button.edit":   "openEditDialog",
			"click .button.delete": "destroy"
		},

		initialize: function() {
			//this.listenTo(this.model, "change", this.render);
		},

		render: function() {

		}
	}),

	ModalWindow : Backbone.View.extend({

		tempalte: _.template( $('#modal-template').html() ),

		initialize: function(){

		},

		render:function (e) {
			$(this.el).html( this.template( this.model.toJSON() ) );
			return this;
		}
	})
}