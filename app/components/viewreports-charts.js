import Component from '@ember/component';
import moment from 'moment';
import {
    sort
} from '@ember/object/computed';
export default Component.extend({
    data: [],
    linechartdata: [],
    piedata: [],
    totalTime: 0,
    notContributed: [],
    percentChange: 0,
    setColor: false,
    isweek: false,
    test: 1,
    sortMembersByName: ['firstName:asc'],
    sortedProjectMembers: Ember.computed.sort('projectmembers', 'sortMembersByName'),

    init: function() {

        this._super();
        Array.prototype.groupBy = function(prop) {
            return this.reduce(function(groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }
        let timeentrydata = this.get('timeentrydata');
        let previousweekdata = this.get('previousweekdata');
        let members = this.get('projectmembers');
        let memberdata = timeentrydata.groupBy('personId');
        let prevmemberdata = previousweekdata.groupBy('personId');
        //Weeekly total hours contributed by each member
        let weeks = this.get('weeks');
        if (weeks > 0) {
            this.set('isweek', true);
        }
        else {
          this.set('isweek', false);
        }
        let lastWeek = moment().clone().startOf('isoWeek').subtract(1, 'days').isoWeek();
        let daterange = [];
        let dates = [];
        for (var i = weeks; i > 0; i--) {
            let monday = moment().day("Monday").week(lastWeek).format('M/DD');
            let sunday = moment(monday).add('6', 'days').format('M/DD');
            dates.push(monday + '-' + sunday);
            daterange.push(lastWeek);
            lastWeek--;
        };
        dates.reverse();
        daterange.sort();
        let templinedata = {};
        $.each(memberdata, function(key, value) {

            let temphourdata = [];
            let hourdata = [];
            let finaltemphourdata = [];
            let totalHours = 0;
            let person = "";
            let temp = value.groupBy('dateofWork');
            for (var i in temp) {
                let hours = (temp[i].reduce(function(acc, obj) {
                    let x = acc + obj.totalSeconds;
                    return x;
                }, 0));
                let tempobj = {};
                tempobj['date'] = moment(temp[i][0].dateofWork).isoWeek();
                tempobj['hours'] = hours;
                temphourdata.push(tempobj);
            };

            finaltemphourdata = temphourdata.groupBy('date');
            for (var i in finaltemphourdata) {
                let temphours = (finaltemphourdata[i].reduce(function(acc, obj) {
                    let x = acc + obj.hours;
                    return x;
                }, 0));

                let finaltempobj = {};
                finaltempobj[finaltemphourdata[i][0].date] = (temphours / 3600).toFixed(2);
                hourdata.push(finaltempobj);

            };
            templinedata[key] = hourdata;
        });
        let tempchartdata = [];
        let sendlinedata = [
            ['Weeks']
        ];
        for (var i = 0; i < daterange.length; i++) {
            let temp = [daterange[i]];
            sendlinedata.push(temp);
        }

        var deletelinedata = Object.assign({}, templinedata);
        for (var item in deletelinedata) {
            sendlinedata[0].push(item);
            let tempdaterange = daterange;
            for (i = 1; i < sendlinedata.length; i++) {
                let count = 0;
                for (var x = 0; x < deletelinedata[item].length; x++) {
                    count = 1;
                    if (Object.keys(deletelinedata[item][x])[0] == sendlinedata[i][0]) {
                        sendlinedata[i].push(parseInt(deletelinedata[item][x][Object.keys(deletelinedata[item][x])[0]]));
                        deletelinedata[item].shift();
                        break;
                    } else {
                        sendlinedata[i].push(0);
                        break;
                    }

                }
                if (count == 0) {
                    sendlinedata[i].push(0);
                }

            }

        }

        //get name for id
        for (var i = 1; i < sendlinedata[0].length; i++) {
            for (name in members) {
                if (members[name]._id == sendlinedata[0][i]) {

                    sendlinedata[0][i] = members[name].firstName;
                };
            }
        }

        //get daterange for weeknumber
        for (i = 1; i < sendlinedata.length; i++) {
            sendlinedata[i][0] = dates[i - 1];

        }
        this.set('linechartdata', sendlinedata);




        let tempdata = [
            ['Name', 'Prior Week', 'Selected Period']
        ];
        let tempdataid = [];
        let tempContributed = [];
        $.each(memberdata, function(key, value) {
            let temp = [];
            let total = 0;
            let prevtotal = 0;
            for (var i = 0; i < value.length; i++) {
                total += value[i].totalSeconds;
            }
            total = total / 3600;

            for (var item in prevmemberdata) {
                if (item == key) {
                    let x = (prevmemberdata[item].reduce((a, b) => ({
                        totalSeconds: a.totalSeconds + b.totalSeconds
                    })));
                    prevtotal = (x.totalSeconds) / 3600;
                }
            }
            temp.push(key, prevtotal, total);
            tempdata.push(temp);

        });

        var tempmembers = JSON.parse(JSON.stringify(members));
        //console.log(tempmembers);
        let temparray = [];
        for (var i = 0; i < tempdata.length; i++) {
           //Admin, Core
            for (var name in tempmembers) { //Swathy, Jaem, Admin, Core
                if (tempmembers[name]._id == tempdata[i][0]) {
                    tempdata[i][0] = tempmembers[name].firstName;
                    tempmembers.splice(name, 1);

                }
            }
        }
        tempmembers.sort(function(a, b){
    var nameA=a.firstName.toLowerCase();
    var nameB=b.firstName.toLowerCase();
    if (nameA < nameB) //sort string ascending
        return -1
    if (nameA > nameB)
        return 1
    return 0 //default return value (no sorting)
});
        this.set('notContributed', tempmembers);


        if(this.get('weeks') > 0){
           tempdata.map(function(val){
    return val.splice(1, 1);
});
        }


        this.set('data', tempdata);
        var temppie = [
            ['Category', 'No. of Members']
        ];
        temppie.push(['Contributed', (tempdata.length - 1)]);
        temppie.push(['No Contribution', (members.length - (tempdata.length - 1))]);
        this.set('piedata', temppie);
        let count = 0;
        for (var i = 0; i < timeentrydata.length; i++) {
            count = count + timeentrydata[i].totalSeconds;
        };
        this.set('totalTime', (count / 3600).toFixed(2));
        count = 0;
        for (var i = 0; i < previousweekdata.length; i++) {
            count = count + previousweekdata[i].totalSeconds;
        };
        let prevtotalTime = count / 3600;
        let change = (((this.get('totalTime')) - prevtotalTime) / prevtotalTime);
        if (isFinite(change)) {
            this.set('percentChange', (change.toFixed(2)));
        } else {
            this.set('percentChange', this.get('totalTime'));
        }

        if (change > 0) {
            this.set('setColor', true);
        }
    },


    didUpdateAttrs(){
      //console.log('called');
      this.init();
      this.didInsertElement();
    },
    //Add code to integrate google charts in this life cycle hook
    didInsertElement() {
        //load google chart packages
        google.charts.load('visualization', '1.1', {
            'packages': ['bar', 'corechart', 'controls']
        });
        var senddata = this.get('data');

        var piedata = this.get('piedata');
        var sendlinedata = this.get('linechartdata');
        //console.log(this.get('data'));
        //google.charts.setOnLoadCallback(drawBarChart);
        google.charts.setOnLoadCallback(function() {
            drawBarChart(senddata);
        });

        google.charts.setOnLoadCallback(function() {
            drawPieChart(piedata);
        });
        //console.log('weeks', this.get('weeks'));
        if (this.get('weeks') > 0) {

            google.charts.setOnLoadCallback(function() {
                drawLineChart(sendlinedata);
            });
        }

        function drawBarChart(senddata) {
            var dataTable = new google.visualization.DataTable();
            var numRows = senddata.length;
            var numCols = senddata[0].length;
            dataTable.addColumn('string', senddata[0][0]);
            for (var i = 1; i < numCols; i++)
                dataTable.addColumn('number', senddata[0][i]);
            for (var i = 1; i < numRows; i++)
                dataTable.addRow(senddata[i]);
            dataTable.sort(([{
                column: 1,
                desc: true
            }]));
            if (dataTable.getNumberOfRows() === 0) {
                document.getElementById('colFilter_div').style.display = "none";
                document.getElementById('BarChart').style.display = "none";
                document.getElementById('noData').style.display = "block";
            }
            var columnsTable = new google.visualization.DataTable();
            columnsTable.addColumn('number', 'colIndex');
            columnsTable.addColumn('string', 'colLabel');
            var initState = {
                selectedValues: []
            };
            for (i = 0; i < dataTable.getNumberOfRows(); i++) {
                columnsTable.addRow([i, dataTable.getValue(i, 0)]);
                //console.log(dataTable.getValue(i,0));
                initState.selectedValues.push(dataTable.getValue(i, 0));
            }

            var chart = new google.visualization.ChartWrapper({
                chartType: 'ColumnChart',
                containerId: 'BarChart',
                dataTable: dataTable,
                options: {
                    title: 'Member Contribution for the Selected Period',
                    width: '100%',
                    height: 400,


                    vAxis: {
                        title: 'Total Hours'
                    },
                    hAxis: {
                        title: 'Members',

                        slantedText: true,
                        slantedTextAngle: 90
                    },

                    series: {
                        0: {
                            color: '#4169E1'
                        }
                    }

                }
            });

            var columnFilter = new google.visualization.ControlWrapper({
                controlType: 'CategoryFilter',
                containerId: 'colFilter_div',
                dataTable: columnsTable,
                options: {
                    filterColumnLabel: 'colLabel',


                    ui: {
                        label: 'Restore(If Deleted)',
                        allowTyping: false,
                        allowMultiple: true,
                        allowNone: false,
                        selectedValuesLayout: 'below'
                    }
                },
                state: initState
            });

            function setChartView() {
                var state = columnFilter.getState();
                var row;
                var view = {
                    rows: [0]
                };
                for (var i = 1; i < state.selectedValues.length; i++) {
                    row = columnsTable.getFilteredRows([{
                        column: 1,
                        value: state.selectedValues[i]
                    }])[0];
                    view.rows.push(columnsTable.getValue(row, 0));
                }
                //console.log(view.rows);
                // sort the indices into their original order
                view.rows.sort(function(a, b) {
                    return (a - b);
                });
                //console.log(view);
                chart.setView(view);
                chart.draw();
            }
            google.visualization.events.addListener(columnFilter, 'statechange', setChartView);

            setChartView();
            columnFilter.draw();
        }


        function drawPieChart(piedata) {

            var data = google.visualization.arrayToDataTable(piedata);
            var options = {

                chartArea: {
                    width: 300,
                    height: 100,
                    top: '5%'
                }
            };

            var chart = new google.visualization.PieChart(document.getElementById('member_pie'));

            chart.draw(data, options);
        }


        function drawLineChart(sendlinedata) {
            var dataTable = new google.visualization.DataTable();
            var numRows = sendlinedata.length;
            //console.log(sendlinedata);
            var numCols = sendlinedata[0].length;
            dataTable.addColumn('string', sendlinedata[0][0]);
            for (var i = 1; i < numCols; i++)
                dataTable.addColumn('number', sendlinedata[0][i]);
            for (var i = 1; i < numRows; i++)
                dataTable.addRow(sendlinedata[i]);
            var columnsTable = new google.visualization.DataTable();
            columnsTable.addColumn('number', 'colIndex');
            columnsTable.addColumn('string', 'colLabel');
            var initState = {
                selectedValues: []
            };
            for (var i = 1; i < dataTable.getNumberOfColumns(); i++) {
                columnsTable.addRow([i, dataTable.getColumnLabel(i)]);
                initState.selectedValues.push(dataTable.getColumnLabel(i));
            }

            //console.log(dataTable);
            var chart = new google.visualization.ChartWrapper({
                chartType: 'LineChart',
                containerId: 'WeeklyTrend',
                dataTable: dataTable,
                options: {
                    title: 'Weekly contribution trend',
                    width: '100%',
                    height: 400,

                }
            });

            var columnFilter = new google.visualization.ControlWrapper({
                controlType: 'CategoryFilter',
                containerId: 'colFilterWeek_div',
                dataTable: columnsTable,
                options: {
                    filterColumnLabel: 'colLabel',
                    ui: {
                        label: 'Restore(If Deleted)',
                        allowTyping: false,
                        allowMultiple: true,
                        allowNone: false,
                        selectedValuesLayout: 'below'
                    }
                },
                state: initState
            });

            function setChartView() {
                var state = columnFilter.getState();
                var row;
                var view = {
                    columns: [0]
                };
                for (var i = 0; i < state.selectedValues.length; i++) {
                    row = columnsTable.getFilteredRows([{
                        column: 1,
                        value: state.selectedValues[i]
                    }])[0];
                    view.columns.push(columnsTable.getValue(row, 0));
                }
                // sort the indices into their original order
                view.columns.sort(function(a, b) {
                    return (a - b);
                });
                chart.setView(view);
                chart.draw();
            }
            google.visualization.events.addListener(columnFilter, 'statechange', setChartView);

            setChartView();
            columnFilter.draw();
        }

    }

});
