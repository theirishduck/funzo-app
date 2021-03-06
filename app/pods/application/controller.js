import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  modal: Ember.inject.service('bootstrap-modal'),
  nav: Ember.inject.service('nav'),

  navbarFixed: false,

  actions: {
    logout() {
      this.get('session').invalidate();
    },

    back() {
      if (this.get('nav.indexOnly')) {
        return this.transitionToRoute('/');
      }
      history.back();
    },
    refreshIndex(books) {
      this.store.pushPayload('book', books);
    },
    addBook() {
      this.set('modal.component', 'add-book');

      Ember.$('.modal').modal('show');
    }
  }
});
