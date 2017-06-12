(function () {
    'use strict';
    angular
        .module('sch.sign')
        .controller('signCtrl', signCtrl);
    function signCtrl($scope, $rootScope, schData) {

        var vm = this;

        /****************************************************
                    VARIABLES
        **************************************************** */
        vm.currentDayMessage = null;

        /*****************************************************
        *                  METHODS                          *
        *****************************************************/
        vm.enter = function () {
            schData.setUserschedules(true, $rootScope.currentDate);
            setCurrentDayMessage();
        };

        vm.exit = function () {
            schData.setUserschedules(false, $rootScope.currentDate);
            setCurrentDayMessage();
        };

        vm.isEnterDisabled = function () {
            if (!schData.todaySchedule || (schData.todaySchedule && !schData.todaySchedule.timeStart))
            {
                return false;
            }
            return true;
        }

        vm.isExitDisabled = function () {
            if ((schData.todaySchedule && !schData.todaySchedule.timeEnd))
            {
                return false;
            }
            return true;
        }

        /*****************************************************
       *               METHODS - PRIVATE                   *
       *****************************************************/
        function init() {
            setCurrentDayMessage();
        }

        var setCurrentDayMessage = function () {
            var today = schData.todaySchedule;
            if (today && today.timeStart && today.timeEnd) {
                vm.currentDayMessage = "החתמת היום בוצעה בהצלחה";
            }
        };

        /*****************************************************
        *                  EXECUTIONS                       *
        *****************************************************/
        init();

    }
})();
