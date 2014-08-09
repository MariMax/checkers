(function(module, _) {
    module.provider("configuration", function() {

        var self = this;

        self.modules = [];

        self.isModuleAvailable = function(moduleName) {
            return _.any(self.modules, function(name) {
                return name === moduleName;
            });
        };

        this.$get = function() {
            return {
                isModuleAvailable: self.isModuleAvailable,
            };
        };
    });

})(angular.module("mainApp"), _);
