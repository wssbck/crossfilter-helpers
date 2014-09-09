var exports = (function(e){
	'use strict';

	e.count = {
		add : function(p, v){
			++p.count;
			return p;
		},
		remove : function(p, v){
			--p.count;
			return p;
		},
		init : function(){
			return { count : 0 };
		},
		access : function(d) {
			return d.count;
		},
		order : function(p) {
			return p.count;
		}
	};

	return e;

})(exports || {});

module.exports = exports;