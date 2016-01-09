var gulp = require('gulp');
var concat = require('gulp-concat');

var sass = require('gulp-sass');
var compass = require('gulp-compass');
var simpleCompass = require('gulp-simple-compass');

var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var gulpFilter = require('gulp-filter');
var mainBower = require('main-bower-files');
var cssnano = require('gulp-cssnano');


/*=============================================
=            CSS         =
=============================================*/
/*---------- 
	SASS
----------*/
gulp.task('sass', function(cb) {
	return gulp.src('app/sass/screen.scss')
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end'); 
			}
		}))
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/css',
			sass: 'app/sass'
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'));		
});
/*===========*/


/*=============================================
=            	JS         =
=============================================*/
gulp.task('js', function() {
	return gulp.src([
		'./bower_components/underscore/underscore.js',
		'./bower_components/backbone/backbone.js',
		'./bower_components/handlebars/handlebars.js',
		'./bower_components/js-cookie/src/js.cookie.js',
		'./bower_components/moment/moment.js',
		'./app/js/namespace/namespace.js',
		'./app/js/model/model.js',
		'./app/js/collection/collection.js',
		'./app/js/view/login.js',
		'./app/js/view/task.js',
		'./app/js/router/router.js',
		'./app/js/main.js'
	])
	.pipe(plumber({
		errorHandler: function(error) {
			console.log(error.message);
			this.emit('end'); 
		}
	}))
	.pipe(sourcemaps.init())
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./app/js'))
})
/*===========*/


/*=============================================
=            WATCH           =
=============================================*/
gulp.task('watch', function() {
	gulp.watch('./app/sass/*', ['styles']);
})
/*===========*/

/*=============================================
=            ****	DEFAULT    ****          =
=============================================*/
gulp.task('default', [
	'sass', 
	'js'
]);
/*===========*/


