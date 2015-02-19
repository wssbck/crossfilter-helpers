var
	data  = [
		{ id :  1, g : "A" },
		{ id :  2, g : "A" },
		{ id :  3, g : "A" },
		{ id :  4, g : "A" },
		{ id :  5, g : "A" },
		{ id :  6, g : "B" },
		{ id :  7, g : "B" },
		{ id :  8, g : "B" },
		{ id :  9, g : "B" },
		{ id : 10, g : "C" }
	],
	cross   = require('crossfilter')(data),
	helpers = require('../index.js');

describe('Reduce by count', function() {

	var
		dimf      = cross.dimension(function(d){ return d.id; }),
		dimg      = cross.dimension(function(d){ return d.g; }),
   		reduction = helpers.count(),
		reduceAdd = reduction.add,
		reduceRem = reduction.rem,
		reduceIni = reduction.ini,
		reduceAcc = reduction.acc,
		reduce    = dimg.group().reduce(
			reduceAdd, reduceRem, reduceIni
		),
        reduceAll = dimg.groupAll().reduce(
            reduceAdd, reduceRem, reduceIni
        ),
		reduceVal;

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

	describe('calculates reduction values correctly', function() {

        it('whole dataset reduced to 10', function() {
            reduceVal = reduceAcc( reduceAll.value() );
            expect(reduceVal).toBe(10);
        });

        it('group A reduced to 5', function() {
		 	reduceVal = reduceAcc( reduce.all()[0].value );
			expect( reduceVal ).toBe(5);
		});

		it('group B reduced to 4', function() {
		 	reduceVal = reduceAcc( reduce.all()[1].value );
		 	expect( reduceVal ).toBe(4);
		});

		it('group C reduced to 1', function() {
		 	reduceVal = reduceAcc( reduce.all()[2].value );
		 	expect( reduceVal ).toBe(1);
		});

	});

	describe('also when a dimension is filtered', function() {

		beforeEach(function() {
		    dimf.filter(2);
	  	});

        it('whole dataset reduced to 1', function() {
            reduceVal = reduceAcc( reduceAll.value() );
            expect(reduceVal).toBe(1);
        });

        it('group A reduced to 1', function() {
		 	reduceVal = reduceAcc( reduce.all()[0].value );
			expect( reduceVal ).toBe(1);
		});

		it('group B reduced to 0', function() {
		 	reduceVal = reduceAcc( reduce.all()[1].value );
		 	expect( reduceVal ).toBe(0);
		});

		it('group C reduced to 0', function() {
		 	reduceVal = reduceAcc( reduce.all()[2].value );
		 	expect( reduceVal ).toBe(0);
		});

	});
});