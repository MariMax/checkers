var gulp = require('gulp');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var nib = require('nib');
<<<<<<< HEAD
var open = require("gulp-open");
var inject = require("gulp-inject");

gulp.task('index', function() {
    var target = gulp.src('./app/index.html');

    return target
        .pipe(inject(gulp.src(['./app/js/lib/angular.min.js',
            './app/js/lib/angular-local-storage.js',
            './app/js/lib/underscore-min.js',
            './app/js/mainApp/module.js',
            './app/js/mainApp/config.js',
            './app/js/mainApp/**/*.js',
            './app/js/checkersApp/module.js',
            './app/js/checkersApp/**/*.js',
            './app/js/app.js',
            './app/js/main.js'
            
        ]),{read:false}))
        .pipe(gulp.dest('./app'));
});
=======
>>>>>>> start

gulp.task('connect', function() {
    connect.server({
        port: 8080,
        livereload: true
    });
});

<<<<<<< HEAD
gulp.task('watch', function() {
    gulp.watch(['./app/css/**/*.styl'], ['stylus']);
    gulp.watch(['./app/css/**/*.css'], ['reload-css']);
    gulp.watch(['./app/js/**/*.js'], ['index', 'reload-js']);
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
=======

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
>>>>>>> start
        .pipe(connect.reload());
});

gulp.task('reload-html', function() {
<<<<<<< HEAD
    gulp.src(['./app/index.html', './app/js/**/*.html'])
        .pipe(connect.reload());
});

gulp.task("url", function() {
    var options = {
        url: "http://localhost:8080/app"
    };
    gulp.src("./app/index.html")
        .pipe(open("./app/index.html", options));
});

var karma = require('gulp-karma');

gulp.task('test', function() {
    return gulp.src('./foobar')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }))
        .on('error', function(err) {
            throw err;
        });
});

gulp.task('default', function() {
    gulp.run('connect', 'stylus', 'url', 'watch', 'test', 'index');
=======
    gulp.src(['./index.html'])
        .pipe(connect.reload());
});


// Default gulp task to run
gulp.task('default', function() {
    gulp.run('connect', 'stylus', 'watch');
>>>>>>> start
});
