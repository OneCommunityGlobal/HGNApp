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
  this.route('timelog', { path: '/timelog/:userId' });
  this.route('login');
  this.route('usermanagement');
  this.route('badges');
  this.route('project', function () {
    this.route('viewproject', { path: '/:projectId' });
  });
  this.route('profile', { path: '/profile/:userId' });
});

export default Router;
