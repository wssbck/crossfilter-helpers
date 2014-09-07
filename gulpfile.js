var
	gulp    = require('gulp'),
	concat  = require('gulp-concat'),
	jasmine = require('gulp-jasmine'),
	jshint  = require('gulp-jshint');

gulp.task( 'build', function() {
	gulp.src( 'src/*.js')
		.pipe( concat( 'crossfilter-helpers.js' ) )
		.pipe( gulp.dest( '.' ) )
		.pipe( concat( 'index.js' ) )
		.pipe( gulp.dest( '.' ) );
});