var app = app || {};

var counter = 0;

app.Model = (function() {
	var Model = function(options) {	
		for(var i in options) {
			if(options.hasOwnProperty(i)) {
				this[i] = options[i];
			}
		}
		this.props = this.props || {};
		this.cid = (function() {
			return ++counter;
		})();
	};

	Model.prototype.get = function(name) {
		return this.props[name];
	};

	Model.prototype.set = function(name, value) {
		if(this.props[name] !== value) {
			this.props[name] = value;
			mediator.publish('changed:' + name, this.cid);
		}
	};

	return Model;
})();