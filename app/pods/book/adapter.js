import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  urlForFindAll() {
    let url = 'content/books/index.json';
    if (window.cordova) {
      url = window.cordova.file.dataDirectory + url;
    }
    return url;
  },

  urlForFindRecord(permalink) {
    let url = `content/books/${permalink}/book.json`;
    if (window.cordova) {
      url = window.cordova.file.dataDirectory + url;
    }
    return url;
  },

  urlForFindHasMany(id, modelName, snapshot) {
    this._super(id, modelName, snapshot);
  }
});