var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-csso');

gulp.task('copy-jquery', function() {
    return gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-calendar-js', function() {
    return gulp.src('src/js/calendar.js')
        .pipe(sourcemaps.init())
        .pipe(concat('calendar.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-calendar-css', function() {
    return gulp.src('src/scss/calendar.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['copy-jquery', 'copy-calendar-js', 'copy-calendar-css']);