var
	crossfilter = require('crossfilter'),
	aggr        = require('../index.js'),
	data        = require('./data.js');

data = crossfilter(data);
dimension = data.dimension(function(d){
	return d.id;
});

group = dimension.group().reduce(aggr.count.add, aggr.count.remove, aggr.count.init);
console.log(group.top(2));