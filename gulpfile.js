var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

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

gulp.task('default', ['copy-jquery', 'copy-calendar-js']);