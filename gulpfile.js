var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifyHtml= require('gulp-minify-html');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imageMin= require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

// todo: create paths object
var sassInput = 'app/scss/**/*.scss';
var sassOutput = 'dist/css';
var htmlInput = 'app/**/*.html';
var jsVendor = 'app/js/vendor/*.js';
var jsInput = 'app/js/*.js';
var images = 'app/assets/*'

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

// todo: compress/handle assets

gulp.task('sass', function () {
  return gulp
    .src(sassInput)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(sassOutput));
});

gulp.task('html', function() {
	return gulp
		.src(htmlInput)
		.pipe(minifyHtml())
		.pipe(gulp.dest('dist/'));
})

gulp.task('js', function() {
	return gulp
		.src([jsVendor, jsInput])
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(uglify())
    .pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'))
})

gulp.task('images', function() {
	return gulp
		.src(images)
		.pipe(imageMin({ progressive: true }))
		.pipe(gulp.dest('dist/assets'))
});

gulp.task('nodemon', function() {
  var started= false;

  return nodemon({
    script: 'server.js'
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('serve', ['nodemon'], function() {
  browserSync({
    // server: {
    //   baseDir: './dist'
    // },
    proxy: 'http://localhost:8000',
    // Remove "Connected to BrowserSync" notifications
    notify: false
  });

  gulp.watch(['dist/**/*.html', 'dist/css/**/*.css', 'dist/js/**/*.js'], {cwd: './'}, browserSync.reload);
});

gulp.task('watch', function() {
   gulp.watch(sassInput, ['sass']).on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
   gulp.watch(htmlInput, ['html']);
   gulp.watch(jsInput, ['js']);
});

gulp.task('default', ['sass', 'js', 'html', 'images', 'watch', 'serve']);