(function() {
    'use strict';
    angular
        .module("sch.directives")
        .directive('datepickerPopup', function () {
            return {
                restrict: 'EAC',
                require: 'ngModel',
                link: function (scope, element, attr, controller) {
                    controller.$formatters.shift();
                }
            }
        });
})(); 