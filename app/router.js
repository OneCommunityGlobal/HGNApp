
import config from './config/environment';
import EmberRouter from '@ember/routing/router';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('projects', function () {
    this.route('newProject');
    this.route('viewProject', { path: '/:project_id' });
  });
  this.route('team', { path: 'team/:team_id'});
  this.route('timelog', { path: '/timelog/:user_id' });
  this.route('login');
  this.route('usermanagement');
  this.route('badges');
  this.route('profile', { path: '/profile/:user_id' });
  this.route('AllTimeEntries', { path: "/AllTimeEntries/:user_id" });
  this.route('updatepassword');
  this.route('reports');
  this.route('view-reports');
});

export default Router;
