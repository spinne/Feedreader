var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

gulp.task('scripts', function(){
	gulp.src('dev/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));

	gulp.src('dev/jasmine/lib/jasmine-2.1.2/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/jasmine/lib/jasmine-2.1.2/'));

	gulp.src('dev/jasmine/spec/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/jasmine/spec/'));
});


gulp.task('styles', function(){
	gulp.src('dev/css/*.css')
		.pipe(minify())
		.pipe(gulp.dest('dist/css/'));

	gulp.src('dev/jasmine/lib/jasmine-2.1.2/*.css')
		.pipe(minify())
		.pipe(gulp.dest('dist/jasmine/lib/jasmine-2.1.2/'));
});


gulp.task('copy', function(){
	gulp.src('dev/fonts/*')
		.pipe(gulp.dest('dist/fonts/'));

	gulp.src('dev/*.html')
		.pipe(gulp.dest('dist/'));

	gulp.src('dev/jasmine/lib/jasmine-2.1.2/*.png')
		.pipe(gulp.dest('dist/jasmine/lib/jasmine-2.1.2/'));
});



gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

gulp.task('default', ['scripts', 'styles', 'copy']);