var gulp = require('gulp');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var simpleCompass = require('gulp-simple-compass');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sourceMaps = require('gulp-sourcemaps');
var cssNano = require('gulp-cssnano');


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
		.pipe(sourceMaps.init())
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/css',
			sass: 'app/sass',
			sourcemap: true
		}))		
		.pipe(cssNano())
		.pipe(sourceMaps.write('./'))		
		.pipe(plumber.stop())
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
	.pipe(sourceMaps.init())	
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(sourceMaps.write('./'))
	.pipe(plumber.stop())
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


