import Controller from '@ember/controller';


export default Controller.extend({
    needs: "view-reports",
  queryParams: ['project_id','projectName'],
    project_id: null,
    projectName: '',
    mytemp: false,
    //timeentrydata: this.get('timeentrydata'),

  actions : {
    /*chooseMember(name){
      this.set('selectedmember',name);
      //console.log('here');
      let selectedmemberEntry = [];
      let selectedmemberEntryprev = [];
      console.log(this.get('timeentrydata'));
      console.log(this.get('previuostimeentrydata'));
      console.log(name);

      this.get('timeentrydata').forEach(function(item){

        if(item.personId == name._id){
          selectedmemberEntry.push(item);
        };

      });
      this.get('previuostimeentrydata').forEach(function(item){

        if(item.personId == name._id){
          selectedmemberEntryprev.push(item);
        };

      });

      var typeArr = {};
      var final = {};
        console.log(selectedmemberEntry);
      //  selectedmemberEntry.forEach(function(item){
          //typeArr[item.dateofWork] = typeArr[item.dateofWork]||[];
          //typeArr[item.dateofWork].push(item);
        //});
        //console.log(typeArr);
        /*var dateArr = []; //Array where rest of the dates will be stored

        var prevDate = moment().subtract(7, 'days');//15 days back date from today(This is the from date)
        var nextDate = moment();//Date after 15 days from today (This is the end date)

    //extracting date from objects in MM-DD-YYYY format
        var prevDate = moment(prevDate._d).format('MM-DD-YYYY');
        var nextDate = moment(nextDate._d).format('MM-DD-YYYY');

        //creating JS date objects
        var start = new Date(prevDate);
        var end = new Date(nextDate);

        //Logic for getting rest of the dates between two dates("FromDate" to "EndDate")
        while(start < end){
          dateArr.push(moment(start).format('ddd DD/MM'));
          var newDate = start.setDate(start.getDate() + 1);
          start = new Date(newDate);
        }

        console.log(dateArr);

        $.each(typeArr, function(key,value){
          //console.log(key);
          var temp = 0;
          console.log(key);
          console.log(moment.utc(key).format('ddd DD/MM'));
          for(var i =0; i<value.length; i++){
            console.log(value[i].totalSeconds);
            temp += value[i].totalSeconds;
          };

          final[moment.utc(key).format('ddd DD/MM')] = (temp/3600);
        });
        console.log(final);

        for(var i=0; i<dateArr.length; i++){
          console.log(typeof(dateArr[i]));
          if(final.hasOwnProperty(dateArr[i]) == false){
            final[dateArr[i]] = 0;
          };

        }
        var finalarr = [  ['Day', 'Current Week'] ];
        $.each(final, function(key,value){
          finalarr.push([key,value]);

        });
        console.log(finalarr);
  this.set('data', finalarr);

  console.log(this.get("data"));
  this.set('mytemp', true);

},*/
},
});
