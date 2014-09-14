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
	// if weight is not set, constant 1 is assumed
	// if weight equals 0, sum is not changed (current record is ignored)
	// if count equals 0, mean is zeroed
	e.mean = function(fn_f, fn_w){
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