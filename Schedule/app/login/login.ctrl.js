(function () {
    'use strict';
    var app = angular.module('sch.login').controller('loginCtrl', loginCtrl);
    function loginCtrl($scope, $rootScope, schData, $location, $filter) {
        var vm = this;
        vm.login = function () {
            var user = schData.findUser(vm.username, vm.password);
            if (user == null) {
                vm.error = "משתמש לא קיים";
            }
            else {
                schData.currentUser=user;
                $location.path("/sign");
            }
        };
    }
})();
