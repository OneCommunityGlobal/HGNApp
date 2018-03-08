import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('projects', function() {
    this.route('projectDetail',{path:'/:projectId'});
    this.route('newProject');

  });
  this.route('dashboard');
  this.route('timelog');
  this.route('login');
  this.route('myprofile');
  this.route('usermanagement');
  this.route('badges');

});

export default Router;
