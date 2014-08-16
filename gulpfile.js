var gulp = require('gulp');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var nib = require('nib');
var open = require("gulp-open");

gulp.task('connect', function() {
    connect.server({
        port: 8080,
        root: 'app',
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch(['./app/css/**/*.styl'], ['stylus']);
    gulp.watch(['./app/css/**/*.css'], ['reload-css']);
    gulp.watch(['./app/js/**/*.js'], ['reload-js']);
    gulp.watch(['./app/index.html', './app/js/**/*.html'], ['reload-html']);
});

gulp.task('stylus', function() {
    gulp.src('./app/css/**/*.styl')
        .pipe(stylus({
            use: [nib()],
            import: ['nib']
        }))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('reload-js', function() {
    gulp.src(['./app/js/**/*.js'])
        .pipe(connect.reload());
});

gulp.task('reload-css', function() {
    gulp.src(['./app/css/**/*.css'])
        .pipe(connect.reload());
});

gulp.task('reload-html', function() {
    gulp.src(['./app/index.html', './app/js/**/*.html'])
        .pipe(connect.reload());
});

gulp.task("url", function() {
    var options = {
        url: "http://localhost:8080"
    };
    gulp.src("./app/index.html")
        .pipe(open("./app/index.html", options));
});


gulp.task('default', function() {
    gulp.run('connect', 'stylus', 'url', 'watch');
});
