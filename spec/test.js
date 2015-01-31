var
	data  = [
		{ g : "A", f :    10, n :    0 },
		{ g : "B", f :     4, n :    8 },
		{ g : "B", f :  null, n :   10 },
		{ g : "C", f :     3, n : null },
		{ g : "C", f :     0, n :    4 },
		{ g : "C", f :  null, n :   15 },
		{ g : "D", f :  0.15, n :    3 },
		{ g : "D", f :  0.15, n :    2 },
		{ g : "D", f :   0.1, n :    2 },
		{ g : "D", f :   0.2, n : null }
	],
	cross = require('crossfilter')(data),
	aggr  = require('../index.js')
	dimg  = cross.dimension(function( d ){ return d.g; }),
    dimf  = cross.dimension(function( d ){ return d.g; }),
	grg   = dimg.group();

describe('Initialization', function() {
	
    it('test data is an object', function() {
		expect(typeof data).toBe('object');
	});
	
    it('test data contains 10 rows', function() {
		expect(data.length).toBe(10);
	});
	
    it('crossfilter is initialized', function() {
		expect(typeof cross.dimension).toBe('function');
	});
	
    it('crossfilter dimension is initialized', function() {
		expect(typeof dimg.group).toBe('function');
	});
	
    it('crossfilter group is initialized', function() {
		expect(typeof grg.reduce).toBe('function');
	});
});

describe('Reduce by count', function() {
	
    var	
		reduceAdd = aggr.count().add,
		reduceRem = aggr.count().rem,
		reduceIni = aggr.count().ini,
		reduceAcc = aggr.count().acc;

	it('is defined', function() {
		expect(typeof aggr.count).toBe('function');
	});
	
    it('returns reduce add function', function() {
		expect(typeof reduceAdd).toBe('function');
	});

	it('returns reduce remove function', function() {
		expect(typeof reduceRem).toBe('function');
	});

	it('returns reduce init function', function() {
		expect(typeof reduceIni).toBe('function');
	});

	it('returns accessor function', function() {
		expect(typeof reduceAcc).toBe('function');
	});

	it('returns 0 initially', function() {
		expect(reduceAcc( reduceIni() )).toBe(0);
	});

	describe('reduces groups correctly', function() {

		var
			reduce = dimg.group().reduce(
				reduceAdd, reduceRem, reduceIni
			),
            reduceAll = dimg.groupAll().reduce(
                reduceAdd, reduceRem, reduceIni
            ),
			reduceVal;

        it('whole dataset to 10', function() {
            reduceVal = reduceAcc( reduceAll.value() );
            expect(reduceVal).toBe(10);
        });
		
        it('group A to 1', function() {
		 	dimf.filter('A');
		 	reduceVal = reduceAcc( reduce.all()[0].value );
			expect( reduceVal ).toBe(1);
		});
		it('group B to 2', function() {
		 	dimf.filter('B');
		 	reduceVal = reduceAcc( reduce.all()[1].value );
		 	expect( reduceVal ).toBe(2);
		});
		it('group C to 3', function() {
		 	dimf.filter('C');
		 	reduceVal = reduceAcc( reduce.all()[2].value );
		 	expect( reduceVal ).toBe(3);
		});
		it('group D to 4', function() {
		 	dimf.filter('D');
		 	reduceVal = reduceAcc( reduce.all()[3].value );
		 	expect( reduceVal ).toBe(4);
		});

	});
});
