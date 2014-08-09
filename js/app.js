'use strict';
window.app = (function (angular,mainApp) {
    return {
        init: function(params) {
            mainApp.config(['configurationProvider', function (moduleManagerProvider) {
                moduleManagerProvider.modules = params;
            }]);
            return angular.bootstrap(document, params);
        } 
    };
})(angular,angular.module("mainApp"));
