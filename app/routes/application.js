import Ember from 'ember';

export default Ember.Route.extend( {

    model()
    {
        // return this.get('AuthService').getLoggedinUser()
        // .then(results => {this.loggedinUser = results;
        //  });  
    },

    setupController: function(controller, model){
     
       let user = this.get('loggedinUser');
        
      },

    
    
});