import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', function() {
    this.route('pin', { path: '/pin/:user_id' });
  });
  this.route('register');
  this.route('course', function() {
    this.route('module', function() {
      this.route('lesson');
    });
  });
  this.route('settings');
});

export default Router;
