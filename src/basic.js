var crossfilterh = (function(e){
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
				var val = new Decimal(fn(v));
				p.sum = p.sum.plus( val );
				return p;
			},
			rem : function(p, v){
				var val = new Decimal(fn(v));
				p.sum = p.sum.minus( val );
				return p;
			},
			ini : function(){
				var val = new Decimal(0);
				return {
					sum : val
				};
			},
			acc : function(p){
				return p.sum.toNumber();
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
	e.mean = function(fn_x, fn_w){
		var fn_w = typeof fn_w != 'function' ? e.helper_constant(1) : fn_w;
		return {
			add : function(p, v){
				var
					x = new Decimal( fn_x(v) ),
					w = new Decimal( fn_w(v) );
				
				p.sum   =  p.sum.plus( x.times(w) );
				p.count =  p.count.plus(w);
				p.mean  = !p.count.isZero() ? p.sum.dividedBy( p.count ) : new Decimal(0);
				return p;
			},
			rem : function(p, v){
				var
					x = new Decimal( fn_x(v) ),
					w = new Decimal( fn_w(v) );

				p.sum   =  p.sum.minus( x.times(w) );
				p.count =  p.count.minus(w);
				p.mean  = !p.count.isZero() ? p.sum.dividedBy( p.count ) : new Decimal(0);
				return p;
			},
			ini : function(){
				var
					count = new Decimal(0),
					sum   = new Decimal(0),
					mean  = new Decimal(0);

				return {
					count : count,
					sum   : sum,
					mean  : mean
				};
			},
			acc : function(p){
				return p.mean.toNumber();
			}
		}
	};

	return e;

})(crossfilterh || {});

module.exports = crossfilterh;