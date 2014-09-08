var app = app || {};

app.Controller = (function() {

	var Controller = function(options) {
		var i, id;
		for(i in options) {
			if(options.hasOwnProperty(i)) {
				this[i] = options[i];
			}
		}
		this.elementId = this.elementId || '';
		this.clickHandlers = this.clickHandlers || {};
		this.template = this.template || '<div></div>';

		if(typeof this.elementId === 'string') {
			this.el = document.getElementById(this.elementId);
		}

		if(typeof this.model === 'function') {
			this.model = new this.model();
		}

		this.initialize();
	};

	var render = function(model, template) {
		var result = template;
		for(var i in model.props) {
			var regexp = new RegExp("{{" + i + "}}", "gm");
			result = result.replace(regexp, model.get(i));
		}
		return result;
	};

	Controller.prototype.initialize = function() {
		this.render();
		this.bindEventListeners();
	};

	Controller.prototype.render = function() {
		this.el.innerHTML = render(this.model, this.template);
		this.bindUIListeners();
	};

	Controller.prototype.bindEventListeners = function() {
		var handlersObj = this.eventHandlers;

		for(event in handlersObj) {
			if(handlersObj.hasOwnProperty(event)) {
				var callback = (this[handlersObj[event]]).bind(this);
				mediator.subscribe(event, callback);
			}
		}
	};
	
	Controller.prototype.bindUIListeners = function() {
		var handlersObj = this.clickHandlers;

		for(id in handlersObj) {
			if(handlersObj.hasOwnProperty(id)) {
				var callback = (this[handlersObj[id]]).bind(this);
				this.el.querySelector(id).addEventListener('click', callback);
			}
		}		
	};

	return Controller;
})();