var
	crossfilter = require('crossfilter'),
	aggr        = require('../index.js'),
	data        = [
		{ g : "A", f : 10, n :  0 },
		{ g : "A", f :  4, n :  8 },
		{ g : "B", f :  2, n : 10 },
		{ g : "B", f :  3, n :  0 },
		{ g : "B", f :  8, n :  4 },
		{ g : "C", f :  9, n : 15 },
		{ g : "C", f :  2, n :  3 },
		{ g : "D", f :  3, n :  2 }
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
	aggr.mean(fn1).add,
	aggr.mean(fn1).remove,
	aggr.mean(fn1).init
);

console.log(group.top(Infinity));