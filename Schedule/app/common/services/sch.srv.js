(function () {
    'use strict';
    angular
        .module('sch.services')
        .factory('schData', schData);

    function schData($rootScope, $filter) {


        /****************************************************
                    VARIABLES
        **************************************************** */
        var users = [];

        var self = {
            findUser: findUser,
            setUserschedules: setUserschedules,
            currentUser: null,
            todaySchedule: null,
            currentDate : $filter('date')(new Date(), "dd/MM/yyyy")
        };
        /*****************************************************
       *                  METHODS                          *
       *****************************************************/

        function findUser(username, password) {
            return _.find(users, { "userName": username, "password": password });
        };

        function setUserschedules(isStart) {
            if (isStart) {
                self.currentUser.schedules.push({
                    date: self.currentDate,
                    timeStart: $filter('date')(new Date(), "HH:mm"),
                    timeEnd: null
                });
                setTodaySchedule();
            }
            else {
                if (self.todaySchedule) self.todaySchedule.timeEnd = $filter('date')(new Date(), "HH:mm");
            }
        };

        function setTodaySchedule() {
            if (self.currentUser) self.todaySchedule = _.find(self.currentUser.schedules, { date: self.currentDate });
            else self.todaySchedule = null;
        }

        /*****************************************************
        *               METHODS - PRIVATE                   *
        *****************************************************/
        function init() {
            users = getInitUsers();
            setTodaySchedule();
        }

        function getInitUsers() {
            return [
                {
                    userName: "Chana Cohen", password: "ch12",
                    schedules: [
                        { date: "18/04/2017", timeStart: "10:00", timeEnd: "16:00" },
                        { date: "21/05/2017", timeStart: "09:00", timeEnd: "16:00" },
                        { date: "01/06/2017", timeStart: "08:00", timeEnd: "15:00" }
                    ]
                },
                {
                    userName: "Ayala Levi", password: "al12",
                    schedules: [
                        { date: "19/04/2017", timeStart: "08:00", timeEnd: "13:00" },
                        { date: "03/05/2017", timeStart: "08:00", timeEnd: "14:30" },
                        { date: "04/05/2017", timeStart: "08:00", timeEnd: "15:20" }
                    ]
                },
                {
                    userName: "Sara Catz", password: "sc12",
                    schedules: [
                        { date: "20/04/2017", timeStart: "09:10", timeEnd: "13:00" },
                        { date: "07/05/2017", timeStart: "09:30", timeEnd: "14:30" },
                        { date: "08/06/2017", timeStart: "09:50", timeEnd: "15:20" }
                    ]
                },
            ];

        };

        function getUsers() {
            return users;
        }
        /*****************************************************
        *                  EXECUTIONS                       *
        *****************************************************/
        init();

        
        return self;
    }


})();