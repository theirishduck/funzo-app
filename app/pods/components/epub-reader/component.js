import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [],

  didInsertElement() {
    EPUBJS.cssPath = "css/";
    EPUBJS.Hooks.register('beforeChapterDisplay').videoJs = function(callback, renderer) {
      var style = renderer.doc.createElement("link");
      var script = renderer.doc.createElement("script");

      style.href = '/assets/videojs/video-js.css';
      style.rel = 'stylesheet';
      style.type = 'text/css';

      script.type = 'text/javascript';
      script.src = '/assets/videojs/video.js';

      renderer.doc.body.appendChild(style);
      renderer.doc.body.appendChild(script);
      if (callback) {
        callback();
      }
    };
    EPUBJS.Hooks.register('beforeChapterDisplay').pageAnimation = function(callback, renderer) {
      window.setTimeout(function() {
        var style = renderer.doc.createElement("style");
        style.innerHTML = "*{-webkit-transition: transform {t} ease;-moz-transition: tranform {t} ease;-o-transition: transform {t} ease;-ms-transition: transform {t} ease;transition: transform {t} ease;}";
        style.innerHTML = style.innerHTML.split("{t}").join("0.5s");
        renderer.doc.body.appendChild(style);
      }, 100);
      if (callback) {
        callback();
      }
    };

    EPUBJS.Render.Iframe.prototype.setLeft = function(leftPos) {
      this.docEl.style[this.transform] = 'translate(' + (-leftPos) + 'px, 0)';
    };

    let book = ePub({ bookPath: 'content/epubs/sample-epub/' });

    book.renderTo(this.$('.book-content-container')[0]);

    window.book = book;
    this.book = window.book = book;
  },

  scrollToNearestPage(direction) {
    if (direction === 'forward') {
      return this.book.nextPage();
    }
    return this.book.prevPage();
  },

  actions: {
    navNext() {
      this.book.nextPage();
    },

    navPrev() {
      this.book.prevPage();
    },

    /**
 * Touch started on component
 *
 * @param  {Object}
 * @return {void}
 */
    touchStart(e) {
      let start = e.originalEvent.touches[0].pageX;
      this.set('touchStartX', start);
      this.set('touchPrevX', start);
      this.set('touchCurrentX', start);
    },

    /**
     * Touch moved on component
     *
     * @param  {Object}
     * @return {void}
     */
    touchMove(e) {
      // e.preventDefault(); // prevent scrolling
      let current = e.originalEvent.touches[0].pageX;
      this.set('touchStarted', true);
      // let diff = this.get('touchPrevX') - current;

      this.set('touchPrevX', current);
      this.set('touchCurrentX', current);

      this.set('animateScroll', false);
      this.set('scrolling', true);
      // this.set('scrollLeft', this.get('scrollLeft') + diff);

      return false;
    },

    /**
     * Touch ended on component, check what direction the touch was and scroll
     * in that direction
     *
     * @param  {Object}
     * @return {void}
     */
    touchEnd() {
      let start = this.get('touchStartX');
      let current = this.get('touchCurrentX');

      let diff = start - current;

      if (this.get('touchStarted') && Math.abs(diff) > 10) {
        this.set('animateScroll', true);
        this.set('scrolling', true);
        this.scrollToNearestPage(start < current ? 'backward' : 'forward');
      }

      this.set('touchStarted', false);
    },
  }
});