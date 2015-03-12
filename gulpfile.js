var
	gulp    = require('gulp'),
	concat  = require('gulp-concat'),
	jasmine = require('gulp-jasmine'),
	jshint  = require('gulp-jshint'),
	uglify  = require('gulp-uglify');

gulp.task( 'build', function() {
	return gulp.src( 'src/*.js')
		.pipe( jshint() )
		.pipe( concat('crossfilter-helpers.js') )
		.pipe( gulp.dest( '.' ) )
		.pipe( uglify() )
		.pipe( concat('crossfilter-helpers.min.js') )
		.pipe( gulp.dest( '.' ) );
});

gulp.task( 'test', ['build'], function () {
    return gulp.src( 'spec/*.js' )
        .pipe( jasmine( {
        	verbose : true
        }));
});
