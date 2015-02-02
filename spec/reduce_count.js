var
	data  = [
		{ g : "A" },
		{ g : "B" },
		{ g : "B" },
		{ g : "C" },
		{ g : "C" },
		{ g : "C" },
		{ g : "D" },
		{ g : "D" },
		{ g : "D" },
		{ g : "D" }
	],
	cross   = require('crossfilter')(data),
	helpers = require('../index.js'),
	dimg    = cross.dimension(function( d ){ return d.g; }),
    dimf    = cross.dimension(function( d ){ return d.g; });

describe('Reduce by count', function() {

	var
		reduceAdd = helpers.count().add,
		reduceRem = helpers.count().rem,
		reduceIni = helpers.count().ini,
		reduceAcc = helpers.count().acc;

	it('is defined', function() {
		expect(typeof helpers.count).toBe('function');
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