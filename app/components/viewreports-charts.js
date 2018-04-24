import Component from '@ember/component';
//import { inject } from '@ember/service';

export default Component.extend({


data : [],
piedata: [],
totalTime: 0,
notContributed: [],
percentChange: 0,
setColor: false,
  init: function(){
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
  projectmembers: this.get('projectmembers');
  let members = this.get('projectmembers');

  let memberdata = timeentrydata.groupBy('personId');
  console.log(memberdata);
  let tempdata =[['Name','Hours']];
  let tempdataid = [];
  let tempContributed = [];
  $.each(memberdata, function(key,value){
    let temp = [];
    let total = 0;
    //console.log(value);
    for(var i=0; i<value.length; i++){
      total += value[i].totalSeconds;
    }
    total = total/3600;
    temp.push(key, total);
    //console.log(temp);
    //tempdataid.push(temp);
    tempdata.push(temp);

  });
console.log(members);
var tempmembers = JSON.parse(JSON.stringify(members));
for(var i=0; i<tempdata.length; i++){//Admin, Core
  //console.log(data[i][0]);
  for(var name in tempmembers){//Swathy, Jaem, Admin, Core
    //console.log(members[name]);
    if(tempmembers[name]._id == tempdata[i][0]){
      //console.log(data[i][0],members[name].firstName);
      tempdata[i][0] = tempmembers[name].firstName;
      console.log(name);
       tempmembers.splice(name, 1);
      //tempContributed.push(members[name]._id);
    }
    /*else {
      tempContributed.push(members[name].firstName);
      console.log(tempContributed);
      var unique = tempContributed.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
})
}*/

  }
}
this.set('notContributed',tempmembers);
console.log(tempmembers);
console.log(members);


//this.set('notContributed', unique);
//console.log(unique);
this.set('data', tempdata);
//console.log(this.get('data'));
//console.log(members.length);
//console.log(tempdata.length);
var temppie = [['Category','No. of Members']];
temppie.push(['Contributed',tempdata.length]);
temppie.push(['No Contribution', (members.length-tempdata.length)]);
this.set('piedata',temppie);
//console.log(this.get('piedata'));
//console.log(timeentrydata);
let count = 0;
for(var i =0 ; i< timeentrydata.length; i++){
  //console.log(timeentrydata[i].totalSeconds);
  count  = count +  timeentrydata[i].totalSeconds;
//console.log(count);
};
this.set('totalTime', (count/3600).toFixed(2));
count=0;
for(var i =0 ; i< previousweekdata.length; i++){
  //console.log(timeentrydata[i].totalSeconds);
  count  = count +  previousweekdata[i].totalSeconds;
//console.log(count);
};
let prevtotalTime = count/3600;
console.log(prevtotalTime);
console.log(this.get('totalTime'));
let change = (((this.get('totalTime'))-prevtotalTime)/prevtotalTime);
if(isFinite(change)){
  this.set('percentChange',(change.toFixed(2)));
}
else {
  this.set('percentChange',this.get('totalTime'));
}

if(change > 0){
  this.set('setColor',true);
}
  },

//Add code to integrate google charts in this life cycle hook
didInsertElement() {
  //load google chart packages

  google.charts.load('visualization', '1.1', {
  'packages': ['bar','corechart', 'controls']
    });
    var senddata = this.get('data');
  console.log(senddata);
    var piedata = this.get('piedata');

  //console.log(this.get('data'));
  //google.charts.setOnLoadCallback(drawBarChart);
  google.charts.setOnLoadCallback(function(){ drawLineChart(senddata); });
  google.charts.setOnLoadCallback(function() { drawPieChart(piedata); });

  //google.charts.setOnLoadCallback( drawDashboard);

//Set values for chart -- For now data is hard coded, will be pulled from DB and added dynamically
/*function drawBarChart() {
  /*var data = new google.visualization.arrayToDataTable([
    ['Days', 'Tangible', 'Intangible', 'Tangible', 'Intangible'],
    ['Task 1', 30, 40,30, 40],
    ['Task 2', 70, 60,30, 40],
    ['Task 3', 66, 20, 30, 40],
    ['Task 4', 30, 40,30, 40],
    ['Task 5', 30, 20,30, 40]
  ]);
//set chart options.
  var options = {
    isStacked: true,

    vAxis: {
      //viewWindow: {
        //max: 1100,
        //min: 0
      //}
    },
    //customized legend will be added later
    legend : { position:"none"},
    vAxes: {
      0: {
      },
      1: {
        gridlines: {
          color: 'transparent'
        },
        textStyle: {
          color: 'transparent'
        }
      },
    },
    series: {
      2: {
        targetAxisIndex: 1
      },
      3: {
        targetAxisIndex: 1
      },
    },
  };
// Instantiate and draw chart, passing in options.
  var chart = new google.charts.Bar(document.getElementById('BarChart'));
  chart.draw(data, google.charts.Bar.convertOptions(options));
}
*/
function drawLineChart(senddata){

  //console.log(senddata);
  var dataTable = new google.visualization.DataTable();
  var numRows = senddata.length;
          var numCols = senddata[0].length;
          dataTable.addColumn('string', senddata[0][0]);
          for (var i = 1; i < numCols; i++)
           dataTable.addColumn('number', senddata[0][i]);
           for (var i = 1; i < numRows; i++)
           dataTable.addRow(senddata[i]);
           dataTable.sort(([{column: 1, desc: true}]));
  /*var options2 = {
      width: 600,
      height: 500,
          title: '',
legend : { position:"none"},
      vAxis: {
        title: 'Total Hours'
      },
      hAxis: {
        title: 'Members'
      },
      series: {
      }
  };*
  //var chart2 = new google.visualization.ColumnChart(document.getElementById('LineChart'));
 //chart2.draw(dataTable, options2);*/
 var columnsTable = new google.visualization.DataTable();
     columnsTable.addColumn('number', 'colIndex');
     columnsTable.addColumn('string', 'colLabel');
     //console.log(columnsTable);
     var initState= {selectedValues: []};
     // put the columns into this data table (skip column 0)
     //console.log(dataTable.getNumberOfRows());
     for (var i = 0; i < dataTable.getNumberOfRows(); i++) {
         columnsTable.addRow([i, dataTable.getValue(i,0)]);
         console.log(dataTable.getValue(i,0));
         // you can comment out this next line if you want to have a default selection other than the whole list
        initState.selectedValues.push(dataTable.getValue(i,0));
     }
     //console.log(columnsTable);
  // you can set individual columns to be the default columns (instead of populating via the loop above) like this:
  // initState.selectedValues.push(data.getColumnLabel(4));

  var chart = new google.visualization.ChartWrapper({
      chartType: 'ColumnChart',
      containerId: 'LineChart',
      dataTable: dataTable,
      options: {
          title: '',
          width: 500,
          height: 400,
          bar: {groupWidth: "30%"},
          legend: { position: "none" },
          vAxis: {
            title: 'Total Hours'
          },
          hAxis: {
            title: 'Members'
          },

      }
  });

  var columnFilter = new google.visualization.ControlWrapper({
      controlType: 'CategoryFilter',
      containerId: 'colFilter_div',
      dataTable: columnsTable,
      options: {
          filterColumnLabel: 'colLabel',


          ui: {
              label: 'Members',
              allowTyping: false,
              allowMultiple: true,
              allowNone: false,
              selectedValuesLayout: 'below'
          }
      },
      state: initState
  });

  function setChartView () {
      var state = columnFilter.getState();
      var row;
      var view = {
          rows: [0]
      };
      for (var i = 1; i < state.selectedValues.length; i++) {
          row = columnsTable.getFilteredRows([{column: 1, value: state.selectedValues[i]}])[0];
          view.rows.push(columnsTable.getValue(row, 0));
      }
      console.log(view.rows);
      // sort the indices into their original order
      view.rows.sort(function (a, b) {
          return (a - b);
      });
      console.log(view);
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

          chartArea:{width:400,height:300}
        };

        var chart = new google.visualization.PieChart(document.getElementById('member_pie'));

        chart.draw(data, options);
      }

/*function drawLineChart2(){
  var data2 = google.visualization.arrayToDataTable([
    ['Days', 'Team1', 'Team2', 'Team3'],
    ['Monday', 30, 20, 10],
    ['Tuesday', 15, 25, 10],
    ['Wednesday', 10, 20, 30],
    ['Thursday', 13, 25, 36],
    ['Friday', 12, 22, 33]
  ]);
  // Set chart options
  var options2 = {
      width: 600,
      height: 500,

          title: 'Previous Week',

      vAxis: {
        title: 'Total hours'
      },
      series: {
      }
  };
  var chart2 = new google.visualization.LineChart(document.getElementById('LineChart2'));
 chart2.draw(data2, options2);*/


/*function drawChart () {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Foo');
    data.addColumn('number', 'Bar');
    data.addColumn('number', 'Baz');
    data.addColumn('number', 'Cad');

   data.addRows([
        ['2005',  45],
        ['2006',  155],
        ['2007',  35],
        ['2008',  105],
        ['2009',  120],
        ['2010',  65],
        ['2011',  80],
        ['2012',  70]
    ]);

    var columnsTable = new google.visualization.DataTable();
    columnsTable.addColumn('number', 'colIndex');
    columnsTable.addColumn('string', 'colLabel');
    var initState= {selectedValues: []};
    // put the columns into this data table (skip column 0)
    for (var i = 0; i < data.getNumberOfRows(); i++) {
      console.log(data.getValue(i,0));
        columnsTable.addRow([i, data.getValue(i,0)]);
        // you can comment out this next line if you want to have a default selection other than the whole list
      //  initState.selectedValues.push(data.getColumnLabel(i));
    }
    console.log(columnsTable);
    // you can set individual columns to be the default columns (instead of populating via the loop above) like this:
    // initState.selectedValues.push(data.getColumnLabel(4));

    var chart = new google.visualization.ChartWrapper({
        chartType: 'BarChart',
        containerId: 'LineChart',
        dataTable: data,
        options: {
            title: 'Foobar',
            width: 600,
            height: 400
        }
    });

    var columnFilter = new google.visualization.ControlWrapper({
        controlType: 'CategoryFilter',
        containerId: 'colFilter_div',
        dataTable: columnsTable,
        options: {
            filterColumnLabel: 'colLabel',
            ui: {
                label: 'Rows',
                allowTyping: false,
                allowMultiple: true,
                allowNone: false,
                selectedValuesLayout: 'belowStacked'
            }
        },
        state: initState
    });

    function setChartView () {
        var state = columnFilter.getState();
        console.log(state);
        var row;
        var view = {
            columns: [0]
        };
        for (var i = 0; i < state.selectedValues.length; i++) {
            row = columnsTable.getFilteredRows([{column: 1, value: state.selectedValues[i]}])[0];
            console.log(columnsTable.getValue(row,0));
            console.log(columnsTable);
            view.columns.push(columnsTable.getValue(row, 0));
        }
        // sort the indices into their original order
        view.columns.sort(function (a, b) {
            return (a - b);
        });
        chart.setView(view);
        chart.draw();
    }
    google.visualization.events.addListener(columnFilter, 'statechange', setChartView);

    setChartView();

    columnFilter.draw();
}*/

}

});
