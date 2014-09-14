var exports = (function(e){
	'use strict';

	// reduce by the number of elements of a group
	e.count = function(){
		return {
			add : function(p, v){
				p.count++;
				return p;
			},
			remove : function(p, v){
				p.count--;
				return p;
			},
			init : function(){
				return { count : 0 };
			},
			access : function(p){
				return p.count;
			}
		}
	};

	// reduce by the sum of elements of a group
	e.sum = function(fn){
		return {
			add : function(p, v){
				p.sum += fn(v);
				return p;
			},
			remove : function(p, v){
				p.sum -= fn(v);
				return p;
			},
			init : function(){
				return { sum : 0 };
			},
			access : function(p){
				return p.sum;
			}
		}
	};

	// reduce by the (weighted) mean of elements of a group
	e.mean = function(fn_f, fn_w){
		// weight from the parameter, otherwise set it to one, as in non-weighted mean
		var w = typeof fn_w === 'function' ? fn_w : e.helper_constant(1);
		return {
			add : function(p, v){
				p.count += w(v);
				p.sum   += w(v) ? fn_f(v) : 0;
				p.mean   = p.count ? p.sum / p.count : 0;
				return p;
			},
			remove : function(p, v){
				p.count -= w(v);
				p.sum   -= w(v) ? fn_f(v) : 0;
				p.mean   = p.count ? p.sum / p.count : 0;
				return p;
			},
			init : function(){
				return { count : 0, sum : 0, mean : 0 };
			},
			access : function(p){
				return p.mean;
			}
		}
	};

	return e;

})(exports || {});

module.exports = exports;
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