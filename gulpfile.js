var gulp = require('gulp');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var nib = require('nib');

gulp.task('connect', function() {
    connect.server({
        port: 8080,
        livereload: true
    });
});


gulp.task('watch', function() {
    gulp.watch(['./css/**/*.styl'], ['stylus']);
    gulp.watch(['./css/**/*.css'], ['reload-css']);
    gulp.watch(['./index.html'], ['reload-html']);
});

gulp.task('stylus', function() {
    gulp.src('./css/**/*.styl')
        .pipe(stylus({
            use: [nib()],import: ['nib']
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('reload-css', function() {
    gulp.src(['./css/**/*.css'])
        .pipe(connect.reload());
});

gulp.task('reload-html', function() {
    gulp.src(['./index.html'])
        .pipe(connect.reload());
});


// Default gulp task to run
gulp.task('default', function() {
    gulp.run('connect', 'stylus', 'watch');
});
