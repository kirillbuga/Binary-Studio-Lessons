var app = app || {};

app.Mediator = (function() {

	var Mediator = function() {
		this.listeners_ = {};
	}

	Mediator.prototype.subscribe = function(event, callback) {
		if(this.listeners_.hasOwnProperty(event)) {
			this.listeners_[event].push(callback);
		} else {
			this.listeners_[event] = [callback];
		}
	};

	Mediator.prototype.publish = function(event, data) {
		if(this.listeners_.hasOwnProperty(event)) {
			var listeners = this.listeners_[event];
			for (var i = listeners.length - 1; i >= 0; i--) {
				listeners[i](data);
			}
		}
	};

	return new Mediator();
})();

window.mediator = app.Mediator;