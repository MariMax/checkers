'use strict';
(function(window) {
    var includedModules = ['mainApp','checkers'];
    window.appInjector = (function(app, params) {
        return app.init(params);
    })(window.app, includedModules);
})(window);
