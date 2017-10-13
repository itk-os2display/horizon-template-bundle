/* Set requirements */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

/* helper functions */
// handling errors
var onError = function (err) {  
  gutil.log;
  console.log(err);
};

/* Define tasks */

gulp.task('fonts', function() {
    return gulp.src('node_modules/npm-font-open-sans/fonts/**/*')
    .pipe(gulp.dest('fonts/'))
})

// Cleanup dist folders
gulp.task('clean', function() {
  del.sync('css');
})

// Compile scss to minifyed css
gulp.task('scss', function(){
  gulp.src('scss/*.scss')
    .pipe(plumber({ // More graceful error handling, prevents watch from breaking.
      errorHandler: onError
    }))
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('css')) // Destination for css
    .pipe(gulpIf('*.css', cssnano())) // minifi the css file
    .pipe(browserSync.reload({ // Reload browser with changes
      stream: true
  }))
});

// Watch task for easy development
gulp.task('watch', [`default`], function(){
  gulp.watch('scss/**/*.scss', ['scss']);
})

// Reload browser with watch task
gulp.task('browserSync', function() {
  browserSync.init({
    files: "css/*.*"
  })
})

// Default task when running gulp
gulp.task('default', function (callback) {
  runSequence(['clean','scss', 'browserSync'],
    callback
  )
})

