angular.module('sch.directives').directive('calendar', ['moment', function (moment) {

    return {
        restrict: 'AE',
        scope: { name: '@' },
        link: function (scope, elem, attrs) {
            var Calendar = React.createClass({
                displayName: 'Calendar',
                getInitialState: function () {
                    return {
                        //month: this.props.selected.clone()
                        month: Date()
                    };
                },
                state: { month: Date() },
                previous: function () {
                    var month = this.state.month;
                    month.add(-1, "M");
                    this.setState({ month: month });
                },

                next: function () {
                    var month = this.state.month;
                    month.add(1, "M");
                    this.setState({ month: month });
                },

                select: function (day) {
                    this.props.selected = day.date;
                    this.forceUpdate();
                },

                render: function () {
                    return React.createElement('div', {}, [
                    React.createElement('div', {}, [
                        React.createElement('i', { class: ['fa', 'fa-angle-right'], onclick: this.previous }),
                        React.createElement('span', {}, this.renderMonthLabel()),
                        React.createElement('i', { class: ['fa', 'fa-angle-right'], onclick: this.next }),
                    ]),
                    React.createElement('DayNames', {}),
                    React.createElement('span', {},this.renderWeeks)
                    ])


                    //    '<div>' +
                    //      '<div class="header">' +
                    //        '<i class="fa fa-angle-left" onClick=' + this.previous + '></i>' +
                    //    this.renderMonthLabel() +
                    //    '<i class="fa fa-angle-right" onClick=' + this.next + '></i>' +
                    //  '</div>' +
                    //  '<DayNames />' +
                    //  this.renderWeeks() +
                    //'</div>');
                },

                renderWeeks: function () {
                    var d = new Date(this.state.month);
                    var diff = d.getDay() - d.getDate() % 7;
                    if (diff < 0)
                        diff += 7;
                    var weeks = [],
                      done = false,
                      date = moment(this.state.month).add(1 - diff - d.getDate(), 'day'),
                      monthIndex = date.month(),
                      count = 0;

                    while (!done) {
                        weeks.push(React.createElement('Week', { key: date.toString(), date: Date(date), month: this.state.month, select: this.select, selected: this.props.selected }));
                        date.add(1, "week");
                        done = count++ > 2 && monthIndex !== date.month();
                        monthIndex = date.month();
                    }

                    return weeks;
                },

                renderMonthLabel: function () {
                    debugger;
                    return '<span>' + moment(this.state.month).format("MMMM, YYYY") + '</span>';
                }
            });

            var DayNames = React.createClass({
                displayName: 'DayNames',
                render: function () {
                    return '<div className="week names">' +
                      '<span class="day">Sun</span>' +
                      '<span class="day">Mon</span>' +
                      '<span class="day">Tue</span>' +
                      '<span class="day">Wed</span>' +
                      '<span class="day">Thu</span>' +
                      '<span class="day">Fri</span>' +
                      '<span class="day">Sat</span>' +
                    '</div>';
                }
            });

            var Week = React.createClass({
                displayName: 'Week',
                render: function () {
                    var days = [],
                      date = this.props.date,
                      month = this.props.month;

                    for (var i = 0; i < 7; i++) {
                        var day = {
                            name: moment(date).format("dd").substring(0, 1),
                            number: date.date(),
                            isCurrentMonth: date.month() === month.month(),
                            isToday: date.isSame(new Date(), "day"),
                            date: date
                        };
                        days.push(React.createElement('span', { key: day.date.toString(), className: "day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : ""), onClick: this.props.select.bind(null, day) }, day.number));
                        date = Date(date);
                        date.add(1, "d");

                    }

                    return React.createElement('div', { class: "week", key: days[0].toString() }, days)
                }
            });



            console.log(React.renderToString(React.createElement(React.createFactory(Calendar), { data: scope })))










            var GreetingSection = React.createClass({
                displayName: 'Greeting',
                render: function () {
                    var message = "Good morning " + this.props.data.name + ", how are you?";
                    return React.createElement('div', { className: "greeting" }, message);
                }
            });
            console.log(React.renderToString(React.createElement(React.createFactory(GreetingSection), { data: scope })))
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












//var Calendar = React.createClass({
//    getInitialState: function() {
//        return {
//            month: this.props.selected.clone()
//        };
//    },

//    previous: function() {
//        var month = this.state.month;
//        month.add(-1, "M");
//        this.setState({ month: month });
//    },

//    next: function() {
//        var month = this.state.month;
//        month.add(1, "M");
//        this.setState({ month: month });
//    },

//    select: function(day) {
//        this.props.selected = day.date;
//        this.forceUpdate();
//    },

//    render: function() {
//        return <div>
//          <div className="header">
//            <i className="fa fa-angle-left" onClick={this.previous}></i>
//        {this.renderMonthLabel()}
//        <i className="fa fa-angle-right" onClick={this.next}></i>
//      </div>
//      <DayNames />
//      {this.renderWeeks()}
//    </div>;
//    },

//    renderWeeks: function() {
//        var weeks = [],
//          done = false,
//          date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday"),
//          monthIndex = date.month(),
//          count = 0;

//        while (!done) {
//            weeks.push(<Week key={date.toString()} date={date.clone()} month={this.state.month} select=    {this.select} selected={this.props.selected} />);
//        date.add(1, "w");
//        done = count++ > 2 && monthIndex !== date.month();
//        monthIndex = date.month();
//    }

//    return weeks;
//},

//renderMonthLabel: function() {
//    return <span>{this.state.month.format("MMMM, YYYY")}</span>;
//}
//});

//var DayNames = React.createClass({
//    render: function() {
//        return <div className="week names">
//          <span className="day">Sun</span>
//          <span className="day">Mon</span>
//          <span className="day">Tue</span>
//          <span className="day">Wed</span>
//          <span className="day">Thu</span>
//            <span className="day">Fri</span>
//            <span className="day">Sat</span>
//        </div>;
//    }
//});

//var Week = React.createClass({
//    render: function() {
//        var days = [],
//          date = this.props.date,
//          month = this.props.month;

//        for (var i = 0; i < 7; i++) {
//            var day = {
//                name: date.format("dd").substring(0, 1),
//                number: date.date(),
//                isCurrentMonth: date.month() === month.month(),
//                isToday: date.isSame(new Date(), "day"),
//                date: date
//            };
//            days.push(<span key={day.date.toString()} className={"day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")} onClick={this.props.select.bind(null, day)}>{day.number}</span>);
//        date = date.clone();
//        date.add(1, "d");

//    }

//    return <div className="week" key={days[0].toString()}>
//      {days}
//    </div>
//}
//});