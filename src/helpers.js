var exports = (function(e){
	'use strict';

	// build a function returning a selected variable
	e.helper_constant = function(c) {
		return function() {
			return c;
		}
	}

	return e;

})(exports || {});

module.exports = exports;