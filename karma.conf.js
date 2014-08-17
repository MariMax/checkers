// Karma configuration
// Generated on Sun Aug 17 2014 17:36:28 GMT+0600 (Ekaterinburg Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/js/lib/angular.min.js',
      'app/js/lib/angular-local-storage.js',
      'app/js/lib/underscore-min.js',
      'app/js/lib/angular-mocks.js',
      'app/js/mainApp/module.js',
      'app/js/mainApp/config.js',
      'app/js/mainApp/**/*.js',
      'app/js/checkersApp/module.js',
      'app/js/checkersApp/**/*.js',
      'app/js/app.js',
      'app/js/main.js',
      'tests/karma/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      //'app/js/lib/**/*.js'
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    preprocessors: {
      'app/js/mainApp/**/*.js': 'coverage'
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
