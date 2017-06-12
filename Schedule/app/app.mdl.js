(function () {
    'use strict';
    angular.module('sch.login', []);
    angular.module('sch.sign', []);
    angular.module('sch.report', []);
    angular.module('sch.calendar', []);
    angular.module('sch.services', []);
    angular.module("sch.filter", []);
    angular.module("sch.directives", []);
    angular.module('schApp', [
        // Angular modules 
        'ngRoute',

        // Custom modules 
        'sch.report',
        'sch.sign',
        'sch.login',
        'sch.calendar',
     
        "sch.services",
        "sch.filter",
        "sch.directives",
        
        // 3rd Party Modules
        'ui.bootstrap',
        "ds.clock",
        'angularMoment',

    ]).run(['$rootScope', '$filter','schData', function ($rootScope, $filter,schData) {
        $rootScope.title = "דוח שעות";
        $rootScope.currentDate = schData.currentDate;
        $rootScope.user = schData.currentUser;
    }]);
    
})();