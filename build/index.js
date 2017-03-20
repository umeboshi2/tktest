webpackJsonp([4],{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, MainAppConfig, MainChannel, Marionette, TkAppState, Toolkit, TopApp, app, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

Toolkit = __webpack_require__(7);

tc = __webpack_require__(6);

__webpack_require__(16);

__webpack_require__(22);

TopApp = __webpack_require__(23);

MainAppConfig = __webpack_require__(70);

MainChannel = Backbone.Radio.channel('global');

TkAppState = (function(superClass) {
  extend(TkAppState, superClass);

  function TkAppState() {
    return TkAppState.__super__.constructor.apply(this, arguments);
  }

  TkAppState.prototype.defaults = {
    AppRegion: new Marionette.Region({
      el: 'body'
    }),
    startHistory: true,
    NavBarClass: false,
    appConfig: {}
  };

  return TkAppState;

})(Backbone.Model);

app = new TopApp({
  StateModel: TkAppState,
  appConfig: MainAppConfig
});

if (true) {
  window.App = app;
}

MainChannel.reply('main:app:appmodel', function() {
  console.warn("main:app:appmodel needs to go.  Use main:app:config");
  return new Backbone.Model(MainAppConfig);
});

MainChannel.reply('main:app:object', function() {
  return app;
});

MainChannel.reply('main:app:config', function() {
  return app.options.appConfig;
});

MainChannel.request('main:app:route');

app.start();

module.exports = app;


/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

var config, misc_menu;

config = __webpack_require__(39);

config.brand.url = '#';

misc_menu = {
  label: 'Misc Applets',
  menu: [
    {
      label: 'Bumblr',
      url: '#bumblr'
    }, {
      label: 'Hubby',
      url: '#hubby'
    }
  ]
};

config.navbarEntries = [
  misc_menu, {
    label: 'Hubby',
    url: '#hubby'
  }, {
    label: 'Bumblr',
    url: '#bumblr'
  }, {
    label: 'Another',
    menu: [
      {
        label: 'New App',
        url: '/another'
      }, {
        label: 'Login',
        url: '#frontdoor/login'
      }
    ]
  }
];

module.exports = config;


/***/ })

},[124]);
//# sourceMappingURL=index.js.map