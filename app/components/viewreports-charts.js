import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
timeEntryService : inject('time-entry-service'),
datastoreservice: inject('datastore-service'),
//fromDate: Date.now(),
//todate: Date.now(),
  init: function(){
    this._super();

    let projectid = this.get('option');
    //this.get('projects').forEach(function(item){
      //if(item._id === selectedProject){
        //console.log(item.tasks);
      //}
    //});
    //console.log(selectedProject);

    let start = moment().startOf("week");

    let FromDate = start.clone().format('X');
    let ToDate = start.clone().add(7, 'days').format('X');
    //Call service to get all relevant time entries for the specific project id
    this.get('timeEntryService').getTimeEntriesForProject(projectid, FromDate, ToDate)
        .then(results => { console.log(results); });
      /*let relativePath ="/TimeEntry/projects";
      let data = null;
      let method = "get";
      this.get('datastoreservice').createEmberrequestObject(relativePath, data, method).then(results => {console.log(results);});
*/
  },

//Add code to integrate google charts in this life cycle hook
didInsertElement() {
  //load google chart packages
  google.charts.load('visualization', '1.1', {
  'packages': ['bar','corechart']
    });
  google.charts.setOnLoadCallback(drawBarChart);
  google.charts.setOnLoadCallback(drawLineChart);
  google.charts.setOnLoadCallback(drawLineChart2);

//Set values for chart -- For now data is hard coded, will be pulled from DB and added dynamically
function drawBarChart() {
  var data = new google.visualization.arrayToDataTable([
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

function drawLineChart(){
  var data2 = google.visualization.arrayToDataTable([
    ['Days', 'Team1', 'Team2', 'Team3'],
    ['Monday', 10, 20, 30],
    ['Tuesday', 15, 25, 10],
    ['Wednesday', 10, 20, 30],
    ['Thursday', 13, 25, 36],
    ['Friday', 12, 22, 33]
  ]);
  // Set chart options
  var options2 = {
      width: 600,
      height: 500,
          title: 'Current Week',

      vAxis: {
        title: 'Total hours'
      },
      series: {
      }
  };
  var chart2 = new google.visualization.LineChart(document.getElementById('LineChart'));
 chart2.draw(data2, options2);
}


function drawLineChart2(){
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
 chart2.draw(data2, options2);
}
}

});
