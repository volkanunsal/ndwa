var { create: createRouter, HistoryLocation, HashLocation } = require('react-router'),
    routes = require('./routes');

var router;

module.exports = {
  makePath(to, params, query) {
    return router.makePath(to, params, query);
  },

  makeHref(to, params, query) {
    return router.makeHref(to, params, query);
  },

  transitionTo(to, params, query) {
    router.transitionTo(to, params, query);
  },

  replaceWith(to, params, query) {
    router.replaceWith(to, params, query);
  },

  goBack() {
    router.goBack();
  },

  run(render) {
    router.run(render);
  }
};

router = createRouter({
  // location: __PRERELEASE__ ? HashLocation : HistoryLocation,
  location: HistoryLocation,
  routes: routes
});

