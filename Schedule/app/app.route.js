(function () {
    'use strict';
    angular.module('schApp')
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
          .when('/login', {
                controller: 'loginCtrl',
                controllerAs: 'loginVm',
                templateUrl: 'login/login.tpl.html',
            })
               .when('/sign', {
                   controller: 'signCtrl',
                   controllerAs:'signVm',
                   templateUrl: 'sign/sign.tpl.html'
               })
            .when('/report', {
                controller: 'reportCtrl',
                controllerAs: 'reportVm',
                templateUrl: 'report/report.tpl.html',
            })
            .when('/calendar', {
                controller: 'calendarCtrl',
                controllerAs: 'calendarVm',
                templateUrl: 'calendar/calendar.tpl.html',
            })
           
            .otherwise({
                redirectTo: '/login'
            });
    }]);
    
})();
