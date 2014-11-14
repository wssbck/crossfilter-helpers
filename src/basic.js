var exports = (function(e){
	'use strict';

	/**
	 reduce by the number of elements of a group
	 initial value: 0
	*/
	e.count = function(){
		return {
			add : function(p, v){
				p.count++;
				return p;
			},
			rem : function(p, v){
				p.count--;
				return p;
			},
			ini : function(){
				return {
					count : 0
				};
			},
			acc : function(p){
				return p.count;
			}
		}
	};

	/**
	 reduce by the sum of elements of a group
	 initial value: 0
	*/
	e.sum = function(fn){
		return {
			add : function(p, v){
				p.sum += fn(v);
				return p;
			},
			rem : function(p, v){
				p.sum -= fn(v);
				return p;
			},
			ini : function(){
				return {
					sum : 0
				};
			},
			acc : function(p){
				return p.sum;
			}
		}
	};

	/**
	 reduce by the product of elements of a group
	 initial value: 1
	*/
	e.product = function(fn){
		return {
			add : function(p, v){
				p.product *= fn(v);
				return p;
			},
			rem : function(p, v){
				p.product = fn(v) != 0 ? p.product / fn(v) : p.product;
				return p;
			},
			ini : function(){
				return {
					product : 1
				};
			},
			acc : function(p){
				return p.product;
			}
		}
	};

	/**
	 reduce by maximum value among elements of a group
	 initial value: -Infinity
	*/
	e.max = function(fn){
		return {
			add : function(p, v){
				p.max = fn(v) > p.max ? fn(v) : p.max;
				return p;
			},
			rem : function(p, v){
				p.max = fn(v) > p.max ? fn(v) : p.max;
				return p;
			},
			ini : function(){
				return {
					max : -Infinity
				};
			},
			acc : function(p){
				return p.max;
			}
		}
	};

	/**
	 reduce by minimum value among elements of a group
	 initial value: Infinity
	*/
	e.min = function(fn){
		return {
			add : function(p, v){
				p.min = fn(v) < p.min ? fn(v) : p.min;
				return p;
			},
			rem : function(p, v){
				p.min = fn(v) < p.min ? fn(v) : p.min;
				return p;
			},
			ini : function(){
				return {
					min : Infinity
				};
			},
			acc : function(p){
				return p.min;
			}
		}
	};

	// reduce by spread, meaning the difference between the mininum and the maximum of the group
	// e.spread = function(fn){
	// 	return {
	// 		add : function(p, v){
	// 			p.min = fn(v) < p.min ? fn(v) : p.min;
	// 			return p;
	// 		},
	// 		rem : function(p, v){
	// 			p.min = fn(v) < p.min ? fn(v) : p.min;
	// 			return p;
	// 		},
	// 		ini : function(){
	// 			return {
	// 				spread : 0,
	// 				min    : Infinity,
	// 				max    : -Infinity
	// 			};
	// 		},
	// 		acc : function(p){
	// 			return p.spread;
	// 		}
	// 	}
	// };

	/**
	 reduce by the (weighted) mean of elements of a group
	 if weight is not set, constant 1 is assumed
	 initial value: 0
	*/
	e.mean = function(fn_f, fn_w){
		var w = typeof fn_w === 'undefined' ? e.helper_constant(1) : fn_w;
		return {
			add : function(p, v){
				p.sum   += fn_f(v) * w(v);
				p.count += w(v);
				p.mean   = p.count ? p.sum / p.count : 0;
				return p;
			},
			rem : function(p, v){
				p.sum   -= fn_f(v) * w(v);
				p.count -= w(v);
				p.mean   = p.count ? p.sum / p.count : 0;
				return p;
			},
			ini : function(){
				return {
					count : 0,
					sum   : 0,
					mean  : 0
				};
			},
			acc : function(p){
				return p.mean;
			}
		}
	};

	return e;

})(exports || {});

module.exports = exports;