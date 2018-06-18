import Component from '@ember/component';

export default Component.extend({

  bardata: [],
  piedata: [],

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
      let projects = this.get('projectmembers');
      //Group the time entries project wise
      let projectdata = timeentrydata.groupBy('projectId');
      let prevprojectdata = previousweekdata.groupBy('projectId');

console.log('projectdata',projectdata);
console.log('prev',prevprojectdata);

//Data for bar chart
            let tempdata = [
                ['Name', 'Prior Week', 'Selected Period']
            ];
            let tempdataid = [];

            $.each(projectdata, function(key, value) {
                let temp = [];
                let total = 0;
                let prevtotal = 0;

                for (var i = 0; i < value.length; i++) {
                    total += parseInt(value[i].hours)+parseInt((value[i].minutes)/60);
                }

                for (var item in prevprojectdata) {

                    if (item == key) {
                        let total = 0;
                        for (var i = 0; i < prevprojectdata[item].length; i++) {
              prevtotal = prevtotal + parseInt(prevprojectdata[item][i].hours);
            }

                    }
                }
              
                var project = projects.find(function(element){
                  return element.projectId == key;
                });
                temp.push(project.projectName, prevtotal, total);
                tempdata.push(temp);

            });
console.log('tempdata',tempdata);
this.set('bardata',tempdata);
      //Weeekly total hours contributed by each member


      //Pie chart
console.log('temp',tempdata);
      var pie = [['Project','Prior Week Hours','Current Week Hours']];
      for(var i=1; i<tempdata.length; i++){
          pie.push(tempdata[i]);
      }
this.set('piedata',pie);
    },


  didInsertElement() {
      //load google chart packages

      let bardata = this.get('bardata');
      let piedata = this.get('piedata');

      google.charts.load('visualization', '1.1', {
          'packages': ['bar', 'corechart', 'controls']
      });

      google.charts.setOnLoadCallback(function() {
          drawPieChart(piedata);
      });
      google.charts.setOnLoadCallback(function() {
          drawBarChart(bardata);
      });
      console.log(piedata);



      function drawBarChart(bardata) {
          //console.log(senddata);
          var dataTable = new google.visualization.DataTable();
          var numRows = bardata.length;
          var numCols = bardata[0].length;
          dataTable.addColumn('string', bardata[0][0]);
          for (var i = 1; i < numCols; i++)
              dataTable.addColumn('number', bardata[0][i]);
          for (var i = 1; i < numRows; i++)
              dataTable.addRow(bardata[i]);
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
              containerId: 'barchart',
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
    console.log(data);
    var options = {

        chartArea: {
          width: '100%',
          height: '100%',
          top: '20%'

        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

}


});
