
import config from './config/environment';
import EmberRouter from '@ember/routing/router';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('projects', function () {
    this.route('projectdetail', { path: '/:ProjectId' });
    this.route('newproject');

  });
  this.route('dashboard');
  this.route('timelog', { path: '/timelog/:userId' });
  this.route('login');
  this.route('usermanagement');
  this.route('badges');
  this.route('profile', { path: '/profile/:userId' });
});

export default Router;
