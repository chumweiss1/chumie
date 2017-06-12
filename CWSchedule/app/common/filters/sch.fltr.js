(function () {
    angular
        .module('sch.filter')
        .filter('monthFilter', function () {

            return function (items, date) {
                var filtered = [];
                var monthSelected = date.getMonth()+1;
                var monthS = monthSelected < 10 ? "0" + monthSelected : monthSelected
                angular.forEach(items, function (item) {
                    var month = item.date.split("/");
                    var onlyMonth = month[1];
                    if (onlyMonth == monthS) {
                        filtered.push(item)
                    }
                });
                return filtered;
            }
        });
})();