var
	crossfilter = require('crossfilter'),
	aggr        = require('../index.js'),
	data        = require('./data.js');

data = [
	{ a : "A", f : 10, n :  0 },
	{ a : "A", f :  4, n :  8 },
	{ a : "B", f :  2, n : 10 },
	{ a : "B", f :  3, n :  0 },
	{ a : "B", f :  8, n :  4 },
	{ a : "C", f :  9, n : 15 },
	{ a : "C", f :  2, n :  3 },
	{ a : "D", f :  3, n :  2 }
];

data = crossfilter(data);

dimension = data.dimension(function(d){
	return d.a;
});

fn1 = function(d) {
	return d.f;
}

fn2 = function(d) {
	return d.n;
}

group = dimension.group().reduce(
	aggr.mean(fn1, fn2).add,
	aggr.mean(fn1, fn2).remove,
	aggr.mean(fn1, fn2).init
);

console.log(group.top(Infinity));