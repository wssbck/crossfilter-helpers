var
	data  = [
		{ id :  1, g : "A", n :  100 },
		{ id :  2, g : "A", n :    4 },
		{ id :  3, g : "A", n : -300 },
		{ id :  4, g : "A", n :    0 },
		{ id :  5, g : "A", n : -212 },
		{ id :  6, g : "B", n :    0 },
		{ id :  7, g : "B", n : 0.15 },
		{ id :  8, g : "B", n : 0.15 },
		{ id :  9, g : "B", n :  0.1 },
		{ id : 10, g : "B", n :  0.2 }
	],
	cross   = require('crossfilter')(data),
	decimal = require('decimal.js'),
	helpers = require('../crossfilter-helpers.js');

	if(typeof window != 'undefined') { window.Decimal = decimal }
	if(typeof global != 'undefined') { global.Decimal = decimal }

describe('Reduce by min', function() {

	var
		dimf      = cross.dimension(function(d){ return d.id; }),
		dimg      = cross.dimension(function(d){ return d.g; }),
    	reduction = helpers.min(function(d){ return d.n }),
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
		expect(typeof helpers.sum).toBe('function');
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

	it('returns Infinity initially', function() {
		expect(reduceAcc( reduceIni() )).toBe(Infinity);
	});

	describe('calculates reduction values correctly using arbitrary precision arithmetic', function() {

        it('whole dataset to -300', function() {
            reduceVal = reduceAcc( reduceAll.value() );
            expect(reduceVal).toBe(-300);
        });

        it('group A to -300', function() {
		 	dimf.filter('A');
		 	reduceVal = reduceAcc( reduce.all()[0].value );
			expect( reduceVal ).toBe(-300);
		});

		it('group B to 0', function() {
		 	dimf.filter('B');
		 	reduceVal = reduceAcc( reduce.all()[1].value );
		 	expect( reduceVal ).toBe(0);
		});

	});

	describe('also when a dimension is filtered', function() {

		beforeEach(function() {
		    dimf.filter([4, 7]);
	  	});

        it('whole dataset reduced to -212', function() {
            reduceVal = reduceAcc( reduceAll.value() );
            expect(reduceVal).toBe(-212);
        });

        it('group A reduced to -212', function() {
		 	reduceVal = reduceAcc( reduce.all()[0].value );
			expect( reduceVal ).toBe(-212);
		});

		it('group B reduced to 0', function() {
		 	reduceVal = reduceAcc( reduce.all()[1].value );
		 	expect( reduceVal ).toBe(0);
		});

	});

});