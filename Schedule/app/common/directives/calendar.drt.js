'use strict';

angular.module('sch.directives').directive('calendar', ['moment', 'schData', function (moment, schData) {

    return {
        restrict: 'AE',
        scope: { name: '@' },
        link: function link(scope, elem, attrs) {
            var Calendar = React.createClass({
                displayName: 'Calendar',

                getInitialState: function getInitialState() {
                    return {
                        month: new Date()
                    };
                },

                previous: function previous() {
                    var month = this.state.month;
                    month.add(-1, "M");
                    this.setState({ month: month });
                },

                next: function next() {
                    var month = this.state.month;
                    month.add(1, "M");
                    this.setState({ month: month });
                },

                select: function select(day) {
                    this.props.selected = day.date;
                    this.forceUpdate();
                },

                render: function render() {
                    return '<div>' + '<div class="header">' + '<i class="fa fa-angle-left" onClick=' + this.previous + '></i>' + this.renderMonthLabel() + '<i class="fa fa-angle-right" onClick=' + this.next + '></i>' + '</div>' + '<DayNames />' + this.renderWeeks() + '</div>';
                },

                renderWeeks: function renderWeeks() {
                    var d = new Date(this.state.month);
                    var diff = d.getDay() - d.getDate() % 7;
                    if (diff < 0) diff += 7;
                    var weeks = [],
                        done = false,
                        date = moment(this.state.month).add(1 - diff - d.getDate(), 'day'),
                        monthIndex = date.month(),
                        count = 0;

                    while (!done) {
                        weeks.push(React.createElement('Week', { key: date.toString(), date: date.clone(), month: this.state.month, select: this.select, selected: this.props.selected }));
                        date.add(1, "w");
                        done = count++ > 2 && monthIndex !== date.month();
                        monthIndex = date.month();
                    }

                    return weeks;
                },

                renderMonthLabel: function renderMonthLabel() {
                    return '<span>' + this.state.month.format("MMMM, YYYY") + '</span>';
                }
            });

            var DayNames = React.createClass({
                displayName: 'DayNames',

                render: function render() {
                    return '<div className="week names">' + '<span class="day">Sun</span>' + '<span class="day">Mon</span>' + '<span class="day">Tue</span>' + '<span class="day">Wed</span>' + '<span class="day">Thu</span>' + '<span class="day">Fri</span>' + '<span class="day">Sat</span>' + '</div>';
                }
            });

            var Week = React.createClass({
                displayName: 'Week',

                render: function render() {
                    var days = [],
                        date = this.props.date,
                        month = moment(this.props.month);

                    for (var i = 0; i < 7; i++) {
                        var day = {
                            name: date.format("dd").substring(0, 1),
                            number: date.date(),
                            isCurrentMonth: date.month() === month.month(),
                            isToday: date.isSame(new Date(), "day"),
                            date: date
                        };
                        //schData.currentUser.schedules
                        ddays.push(React.createElement('span', { key: day.date.toString(), className: "day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : ""), onClick: this.props.select.bind(null, day) }, day.number));
                        date = date.clone();
                        date.add(1, "d");
                    }

                    return React.createElement(
                        'div',
                        { className: 'week', key: days[0].toString() },
                        days
                    );
                }
            });

            React.render(React.createElement(React.createFactory(Calendar)), elem[0]);

            //console.log(React.render(React.createElement(React.createFactory(Calendar), { data: scope })))

            //var GreetingSection = React.createClass({
            //    displayName: 'Greeting',
            //    render: function () {
            //        var message = "Good morning " + this.props.data.name + ", how are you?";
            //        return React.createElement('div', { className: "greeting" }, message);
            //    }
            //});
            //console.log(React.render(React.createElement(React.createFactory(GreetingSection), { data: scope })))
            //console.log(React.createFactory(GreetingSection)({ data: scope }))
            //elem[0].innerHTML = React.createFactory(GreetingSection)({ data: scope })

            //var React = require('react');
            //var MyComponent = React.createFactory(require('MyComponent'));

            //function render() {
            //    return MyComponent({ foo: 'bar' });
            //}
        }
    };
}]);

