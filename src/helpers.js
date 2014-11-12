var exports = (function(e){
	'use strict';

	// build a general data accessor for reduce() parameter functions
	// if f is a function, it will return this function
	// otherwise it will build a function that, given a datum d,
	// will return d[f]
	e.helper_accessor = function(f) {
		if (typeof f != 'function') {
			return function(d) {
				return d[f];
			}
		}
		return f;
	}

	// build a function returning a selected variable
	e.helper_constant = function(c) {
		return function() {
			return c;
		}
	}

	return e;

})(exports || {});

module.exports = exports;