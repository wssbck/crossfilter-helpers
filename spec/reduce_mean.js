var
	data  = [
		{ id :  1, g : "A", w : 1,   x :   10 },
		{ id :  2, g : "A", w : 3,   x :    4 },
		{ id :  3, g : "A", w : 2,   x :    2 },
		{ id :  4, g : "A", w : 0,   x :    0 },
		{ id :  5, g : "A", w : 1,   x :    2 },
		{ id :  6, g : "B", w : 2.5, x :    0 },
		{ id :  7, g : "B", w : 10,  x : 0.15 },
		{ id :  8, g : "B", w : 5.2, x : 0.09 },
		{ id :  9, g : "B", w : 0.2, x :  0.2 },
		{ id : 10, g : "B", w : 2,   x :  0.1 }
	],
	cross   = require('crossfilter')(data),
	decimal = require('decimal.js'),
	helpers = require('../index.js');

	if(typeof window != 'undefined') { window.Decimal = decimal }
	if(typeof global != 'undefined') { global.Decimal = decimal }

describe('Reduce by (weighted) mean', function() {

	var  
		dimf        = cross.dimension(function(d){ return d.id; }),
		dimg        = cross.dimension(function(d){ return d.f; }),
		red_x       = function(d){ return d.x },
		red_w       = function(d){ return d.w },

    	reduction_1 = helpers.mean(red_x),
		reduceAdd_1 = reduction_1.add,
		reduceRem_1 = reduction_1.rem,
		reduceIni_1 = reduction_1.ini,
		reduceAcc_1 = reduction_1.acc,
		reduce_1    = dimg.group().reduce(
			reduceAdd_1, reduceRem_1, reduceIni_1
		),
        reduceAll_1 = dimg.groupAll().reduce(
            reduceAdd_1, reduceRem_1, reduceIni_1
        ),

    	reduction_w = helpers.mean(red_x, red_w),
		reduceAdd_w = reduction_w.add,
		reduceRem_w = reduction_w.rem,
		reduceIni_w = reduction_w.ini,
		reduceAcc_w = reduction_w.acc,
		reduce_w    = dimg.group().reduce(
			reduceAdd_w, reduceRem_w, reduceIni_w
		),
        reduceAll_w = dimg.groupAll().reduce(
            reduceAdd_w, reduceRem_w, reduceIni_w
        ),
		reduceVal;

	it('is defined', function() {
		expect(typeof helpers.mean).toBe('function');
	});
	
    it('returns reduce add function', function() {
		expect(typeof reduceAdd_w).toBe('function');
	});

	it('returns reduce remove function', function() {
		expect(typeof reduceRem_w).toBe('function');
	});

	it('returns reduce init function', function() {
		expect(typeof reduceIni_w).toBe('function');
	});

	it('returns accessor function', function() {
		expect(typeof reduceAcc_w).toBe('function');
	});

	it('returns 0 initially', function() {
		expect(reduceAcc_w( reduceIni_w() )).toBe(0);
	});

	describe('When weight function is not provided, it sets weight to 1 for every data point', function() {

        it('whole dataset to 1.854', function() {
            reduceVal = reduceAcc_1( reduceAll_1.value() );
            expect(reduceVal).toBe(1.854);
        });

	});

	// describe('calculates reduction values correctly using arbitrary precision arithmetic', function() {

 //        it('whole dataset to 18.6', function() {
 //            reduceVal = reduceAcc( reduceAll.value() );
 //            expect(reduceVal).toBe(18.6);
 //        });

 //        it('group A to 18', function() {
	// 	 	dimf.filter('A');
	// 	 	reduceVal = reduceAcc( reduce.all()[0].value );
	// 		expect( reduceVal ).toBe(18);
	// 	});

	// 	it('group B to 0.6', function() {
	// 	 	dimf.filter('B');
	// 	 	reduceVal = reduceAcc( reduce.all()[1].value );
	// 	 	expect( reduceVal ).toBe(0.6);
	// 	});

	// });

	// describe('also when a dimension is filtered', function() {

	// 	beforeEach(function() {
	// 	    dimf.filter(6);
	//   	});

 //        it('whole dataset reduced to 0', function() {
 //            reduceVal = reduceAcc( reduceAll.value() );
 //            expect(reduceVal).toBe(0);
 //        });

 //        it('group A reduced to 0', function() {
	// 	 	reduceVal = reduceAcc( reduce.all()[0].value );
	// 		expect( reduceVal ).toBe(0);
	// 	});

	// 	it('group B reduced to 0', function() {
	// 	 	reduceVal = reduceAcc( reduce.all()[1].value );
	// 	 	expect( reduceVal ).toBe(0);
	// 	});

	// });

});