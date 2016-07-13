var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

var sassInput = './stylesheets/scss/**/*.scss';
var sassOutput = './stylesheets/css';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp
    .src(sassInput)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest(sassOutput));
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    // Remove "Connected to BrowserSync" notifications
    notify: false
  });

  gulp.watch(['*.html', 'stylesheets/css/*.css', './*.js'], {cwd: './'}, browserSync.reload);
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(sassInput, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'watch', 'serve']);