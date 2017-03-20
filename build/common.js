webpackJsonp([3],{

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

var MainChannel, MainRouter, Marionette, MessageChannel, RequireController, registered_apps,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Marionette = __webpack_require__(4);

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

registered_apps = {};

MainChannel.reply('main:applet:unregister', function(appname) {
  return delete registered_apps[appname];
});

MainChannel.reply('main:applet:register', function(appname) {
  return registered_apps[appname] = true;
});

RequireController = (function(superClass) {
  extend(RequireController, superClass);

  function RequireController() {
    return RequireController.__super__.constructor.apply(this, arguments);
  }

  RequireController.prototype._route_applet = function(applet) {
    return MainChannel.request("applet:" + applet + ":route");
  };

  RequireController.prototype.loadFrontDoor = function() {
    var appname, config, handler;
    config = MainChannel.request('main:app:config');
    appname = (config != null ? config.frontdoorApplet : void 0) || 'frontdoor';
    handler = __webpack_require__(38)("./" + appname + "/main");
    if (true) {
      console.log("Frontdoor system.import", appname);
    }
    return handler.then((function(_this) {
      return function(Applet) {
        var applet, hash;
        applet = new Applet;
        MainChannel.request('main:applet:register', appname);
        applet.start();
        if (!Backbone.history.started) {
          Backbone.history.start();
        }
        if (true) {
          hash = window.location.hash;
          return console.log("History Started at", hash);
        }
      };
    })(this));
  };

  RequireController.prototype._handle_route = function(appname, suffix) {
    var config, handler;
    if (true) {
      console.log("_handle_route", appname, suffix);
    }
    config = MainChannel.request('main:app:config');
    if (!appname) {
      console.warn("No applet recognized", appname);
      appname = 'frontdoor';
    }
    if (indexOf.call(Object.keys(config.appletRoutes), appname) >= 0) {
      appname = config.appletRoutes[appname];
      console.log("Using defined appletRoute", appname);
    }
    if (indexOf.call(Object.keys(registered_apps), appname) >= 0) {
      throw new Error("Unhandled applet path #" + appname + "/" + suffix);
    }
    handler = __webpack_require__(38)("./" + appname + "/main");
    if (true) {
      console.log("system.import", appname);
    }
    return handler.then((function(_this) {
      return function(Applet) {
        var applet;
        applet = new Applet;
        MainChannel.request('main:applet:register', appname);
        applet.start();
        return Backbone.history.loadUrl();
      };
    })(this))["catch"](function(err) {
      if (err.message.startsWith('Cannot find module')) {
        return MessageChannel.request('warning', "Bad route " + appname + ", " + suffix + "!!");
      } else if (err.message.startsWith('Unhandled applet')) {
        return MessageChannel.request('warning', err.message);
      } else {
        throw err;
      }
    });
  };

  RequireController.prototype.routeApplet = function(applet, href) {
    var err;
    try {
      return this._handle_route(applet, href);
    } catch (error) {
      err = error;
      if (err.message.startsWith('Unhandled applet')) {
        return MessageChannel.request('warning', err.message);
      }
    }
  };

  return RequireController;

})(Marionette.Object);

MainRouter = (function(superClass) {
  extend(MainRouter, superClass);

  function MainRouter() {
    return MainRouter.__super__.constructor.apply(this, arguments);
  }

  MainRouter.prototype.appRoutes = {
    ':applet': 'routeApplet',
    ':applet/*path': 'routeApplet'
  };

  MainRouter.prototype.onRoute = function(name, path, args) {
    if (true) {
      return console.log("MainRouter.onRoute", name, path, args);
    }
  };

  return MainRouter;

})(Marionette.AppRouter);

MainChannel.reply('main:app:route', function() {
  var controller, router;
  controller = new RequireController;
  router = new MainRouter({
    controller: controller
  });
  MainChannel.reply('main-controller', function() {
    return controller;
  });
  return MainChannel.reply('main-router', function() {
    return router;
  });
});

module.exports = {
  RequireController: RequireController,
  MainRouter: MainRouter
};


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, MainChannel, Marionette, MessagesApp, NavbarApp, Toolkit, TopApp, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

Toolkit = __webpack_require__(7);

tc = __webpack_require__(6);

MessagesApp = __webpack_require__(87);

NavbarApp = __webpack_require__(88);

MainChannel = Backbone.Radio.channel('global');

TopApp = (function(superClass) {
  extend(TopApp, superClass);

  function TopApp() {
    return TopApp.__super__.constructor.apply(this, arguments);
  }

  TopApp.prototype.onBeforeStart = function() {
    var appConfig, messagesApp, navbarApp;
    appConfig = this.options.appConfig;
    this.setRegion(new Marionette.Region({
      el: appConfig.appRegion
    }));
    if (appConfig.useMessages) {
      messagesApp = this.addChildApp('messages', {
        AppClass: MessagesApp,
        startWithParent: true,
        parentApp: this
      });
    }
    if (appConfig.useNavbar) {
      return navbarApp = this.addChildApp('navbar', {
        AppClass: NavbarApp,
        startWithParent: true,
        appConfig: appConfig,
        parentApp: this
      });
    }
  };

  TopApp.prototype.initPage = function() {
    var AppLayout, appConfig, layout, layoutOpts;
    appConfig = this.options.appConfig;
    AppLayout = appConfig.layout;
    layoutOpts = appConfig.layoutOptions;
    layout = new AppLayout(appConfig.layoutOptions);
    return this.showView(layout);
  };

  TopApp.prototype.onStart = function() {
    var c;
    this.initPage();
    if (this.getState('startHistory')) {
      c = MainChannel.request('main-controller');
      return c.loadFrontDoor();
    }
  };

  return TopApp;

})(Toolkit.App);

module.exports = TopApp;


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bumblr/main": [
		126,
		2
	],
	"./frontdoor/main": [
		127,
		0
	],
	"./hubby/main": [
		128,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 38;


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

var MainPageLayout;

MainPageLayout = __webpack_require__(86);

module.exports = {
  appRegion: 'body',
  layout: MainPageLayout,
  layoutOptions: {},
  useMessages: true,
  useNavbar: true,
  brand: {
    label: 'Tk-Test',
    url: '#'
  },
  frontdoorApplet: 'frontdoor',
  hasUser: false,
  userMenuApp: void 0,
  needLogin: false,
  loginUrl: '/#frontdoor/login',
  guestUserName: 'Guest',
  navbarEntries: [],
  appletRoutes: {
    pages: 'frontdoor'
  }
};


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, BaseMessage, BaseMessageCollection, MainChannel, MessageChannel, add_message, fn, i, len, level, main_message_collection, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

BaseMessage = (function(superClass) {
  extend(BaseMessage, superClass);

  function BaseMessage() {
    return BaseMessage.__super__.constructor.apply(this, arguments);
  }

  BaseMessage.prototype.defaults = {
    level: 'info'
  };

  return BaseMessage;

})(Backbone.Model);

BaseMessageCollection = (function(superClass) {
  extend(BaseMessageCollection, superClass);

  function BaseMessageCollection() {
    return BaseMessageCollection.__super__.constructor.apply(this, arguments);
  }

  BaseMessageCollection.prototype.model = BaseMessage;

  return BaseMessageCollection;

})(Backbone.Collection);

main_message_collection = new BaseMessageCollection;

MessageChannel.reply('messages', function() {
  return main_message_collection;
});

add_message = (function(_this) {
  return function(msg, level, icon, delay) {
    var destroy, message;
    if (icon == null) {
      icon = false;
    }
    if (delay == null) {
      delay = 6000;
    }
    message = new BaseMessage({
      content: msg,
      level: level,
      icon: icon
    });
    if (level !== 'danger') {
      destroy = function() {
        return main_message_collection.remove(message);
      };
      setTimeout(destroy, delay);
    }
    return main_message_collection.add(message);
  };
})(this);

MessageChannel.reply('display-message', (function(_this) {
  return function(msg, lvl, icon) {
    if (lvl == null) {
      lvl = 'info';
    }
    if (icon == null) {
      icon = false;
    }
    console.warn('icon', icon);
    return add_message(msg, lvl, icon);
  };
})(this));

ref = ['success', 'info', 'warning', 'danger'];
fn = function(level) {
  return MessageChannel.reply(level, (function(_this) {
    return function(msg, icon) {
      if (icon == null) {
        icon = false;
      }
      return add_message(msg, level, icon);
    };
  })(this));
};
for (i = 0, len = ref.length; i < len; i++) {
  level = ref[i];
  fn(level);
}

MessageChannel.reply('delete-message', (function(_this) {
  return function(model) {
    return main_message_collection.remove(model);
  };
})(this));

module.exports = {
  BaseMessageCollection: BaseMessageCollection
};


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

var BootstrapModalRegion, MainPageLayout, Marionette, Toolkit, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = __webpack_require__(4);

Toolkit = __webpack_require__(7);

tc = __webpack_require__(6);

BootstrapModalRegion = (function(superClass) {
  extend(BootstrapModalRegion, superClass);

  function BootstrapModalRegion() {
    return BootstrapModalRegion.__super__.constructor.apply(this, arguments);
  }

  BootstrapModalRegion.prototype.el = '#modal';

  BootstrapModalRegion.prototype.backdrop = false;

  BootstrapModalRegion.prototype.getEl = function(selector) {
    var $el;
    $el = $(selector);
    $el.attr('class', 'modal');
    return $el;
  };

  BootstrapModalRegion.prototype.show = function(view) {
    BootstrapModalRegion.__super__.show.call(this, view);
    this.$el.modal({
      backdrop: this.backdrop
    });
    return this.$el.modal('show');
  };

  return BootstrapModalRegion;

})(Marionette.Region);

MainPageLayout = (function(superClass) {
  extend(MainPageLayout, superClass);

  function MainPageLayout() {
    return MainPageLayout.__super__.constructor.apply(this, arguments);
  }

  MainPageLayout.prototype.template = tc.renderable(function() {
    tc.div('#navbar-view-container');
    tc.div(".container-fluid", function() {
      tc.div('.row', function() {
        return tc.div('.col-sm-10.col-sm-offset-1', function() {
          return tc.div('#messages');
        });
      });
      return tc.div('#applet-content.row');
    });
    tc.div('#footer');
    return tc.div('#modal');
  });

  MainPageLayout.prototype.regions = {
    messages: '#messages',
    navbar: '#navbar-view-container',
    modal: BootstrapModalRegion,
    applet: '#applet-content',
    footer: '#footer'
  };

  return MainPageLayout;

})(Marionette.View);

module.exports = MainPageLayout;


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, MainChannel, Marionette, MessageChannel, MessageView, MessagesApp, MessagesView, Toolkit, message_box, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

Toolkit = __webpack_require__(7);

tc = __webpack_require__(6);

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

__webpack_require__(85);

message_box = tc.renderable(function(msg) {
  var lvl;
  lvl = msg.level;
  if (lvl === 'error') {
    lvl = 'danger';
  }
  return tc.div(".alert.alert-" + lvl, function() {
    tc.button('.close', {
      type: 'button',
      'aria-hidden': true
    }, function() {
      return tc.raw('&times;');
    });
    if (msg.icon) {
      tc.span(".glyphicon.glyphicon-" + msg.icon);
    }
    return tc.text(msg.content);
  });
});

MessageView = (function(superClass) {
  extend(MessageView, superClass);

  function MessageView() {
    return MessageView.__super__.constructor.apply(this, arguments);
  }

  MessageView.prototype.template = message_box;

  MessageView.prototype.ui = {
    close_button: 'button.close'
  };

  MessageView.prototype.events = {
    'click @ui.close_button': 'destroy_message'
  };

  MessageView.prototype.destroy_message = function() {
    return MessageChannel.request('delete-message', this.model);
  };

  return MessageView;

})(Marionette.View);

MessagesView = (function(superClass) {
  extend(MessagesView, superClass);

  function MessagesView() {
    return MessagesView.__super__.constructor.apply(this, arguments);
  }

  MessagesView.prototype.childView = MessageView;

  return MessagesView;

})(Marionette.CollectionView);

MessagesApp = (function(superClass) {
  extend(MessagesApp, superClass);

  function MessagesApp() {
    return MessagesApp.__super__.constructor.apply(this, arguments);
  }

  MessagesApp.prototype.onBeforeStart = function() {
    this.collection = MessageChannel.request('messages');
    return this.setRegion(this.options.parentApp.getView().getRegion('messages'));
  };

  MessagesApp.prototype.onStart = function() {
    return this.initPage();
  };

  MessagesApp.prototype.initPage = function() {
    var view;
    view = new MessagesView({
      collection: this.collection
    });
    return this.showView(view);
  };

  return MessagesApp;

})(Toolkit.App);

module.exports = MessagesApp;


/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

var $, Backbone, BootstrapNavBarView, MainChannel, Marionette, MessageChannel, NavbarApp, NavbarEntriesView, NavbarEntry, NavbarEntryCollection, NavbarEntryCollectionView, NavbarEntryView, NavbarHeaderView, Toolkit, dropdown_entry, dropdown_toggle, nav_pt, nav_pt_content, navbar_collapse_button, navbar_entry_collection, single_entry, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = __webpack_require__(20);

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

Toolkit = __webpack_require__(7);

tc = __webpack_require__(6);

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

NavbarEntry = (function(superClass) {
  extend(NavbarEntry, superClass);

  function NavbarEntry() {
    return NavbarEntry.__super__.constructor.apply(this, arguments);
  }

  NavbarEntry.prototype.defaults = {
    label: 'App Label',
    url: '#app',
    single_applet: false,
    applets: [],
    urls: []
  };

  return NavbarEntry;

})(Backbone.Model);

NavbarEntryCollection = (function(superClass) {
  extend(NavbarEntryCollection, superClass);

  function NavbarEntryCollection() {
    return NavbarEntryCollection.__super__.constructor.apply(this, arguments);
  }

  NavbarEntryCollection.prototype.model = NavbarEntry;

  return NavbarEntryCollection;

})(Backbone.Collection);

navbar_entry_collection = new NavbarEntryCollection;

MainChannel.reply('navbar-entries', function() {
  return navbar_entry_collection;
});

MainChannel.reply('new-navbar-entry', function() {
  return new NavbarEntry;
});

MainChannel.reply('add-navbar-entry', function(atts) {
  return navbar_entry_collection.add(atts);
});

MainChannel.reply('add-navbar-entries', function(olist) {
  return navbar_entry_collection.add(olist);
});

navbar_collapse_button = tc.renderable(function(target) {
  return tc.button('.navbar-toggle', {
    type: 'button',
    'data-toggle': 'collapse',
    'data-target': "#" + target
  }, function() {
    tc.span('.sr-only', 'Toggle Navigation');
    tc.span('.icon-bar');
    tc.span('.icon-bar');
    return tc.span('.icon-bar');
  });
});

dropdown_toggle = tc.component(function(selector, attrs, renderContents) {
  return tc.a(selector + ".dropdown-toggle", {
    href: attrs.href,
    'data-toggle': 'dropdown'
  }, renderContents);
});

nav_pt_content = tc.renderable(function(appmodel) {
  return tc.div("." + (appmodel.container || 'container'), function() {
    tc.div('.navbar-header', function() {
      navbar_collapse_button('navbar-view-collapse');
      return tc.a('.navbar-brand', {
        href: '#'
      }, 'TKTest');
    });
    return tc.div('#navbar-view-collapse.collapse.navbar-collapse', function() {
      tc.ul('.nav.navbar-nav.nav-pills', function() {});
      tc.ul('#user-menu.nav.navbar-nav.navbar-right');
      return tc.div('#form-search-container');
    });
  });
});

nav_pt = tc.renderable(function(appmodel) {
  return tc.nav('#navbar-view.navbar.navbar-static-top.navbar-default', {
    xmlns: 'http://www.w3.org/1999/xhtml',
    'xml:lang': 'en',
    role: 'navigation'
  }, function() {
    return tc.div('.container', function() {
      tc.div('.navbar-header', function() {
        navbar_collapse_button('navbar-view-collapse');
        return tc.a('.navbar-brand', {
          href: '#'
        }, 'TkTest');
      });
      return tc.div('#navbar-view-collapse.collapse.navbar-collapse');
    });
  });
});

dropdown_entry = tc.renderable(function(entry) {
  tc.a('.dropdown-toggle', {
    role: 'button',
    'data-toggle': 'dropdown'
  }, function() {
    tc.text(entry.label);
    return tc.b('.caret');
  });
  return tc.ul('.dropdown-menu', function() {
    var i, len, link, ref, results;
    ref = entry.menu;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      link = ref[i];
      results.push(tc.li(function() {
        return tc.a('.navbar-entry', {
          href: link.url
        }, link.label);
      }));
    }
    return results;
  });
});

single_entry = tc.renderable(function(entry) {
  return tc.a('.navbar-entry', {
    href: entry.url
  }, entry.label);
});

NavbarEntryView = (function(superClass) {
  extend(NavbarEntryView, superClass);

  function NavbarEntryView() {
    return NavbarEntryView.__super__.constructor.apply(this, arguments);
  }

  NavbarEntryView.prototype.model = NavbarEntry;

  NavbarEntryView.prototype.tagName = 'li';

  NavbarEntryView.prototype.className = function() {
    if (this.model.has('menu')) {
      return 'dropdown';
    } else {
      return void 0;
    }
  };

  NavbarEntryView.prototype.template = tc.renderable(function(model) {
    if (model != null ? model.menu : void 0) {
      return dropdown_entry(model);
    } else {
      return single_entry(model);
    }
  });

  NavbarEntryView.prototype.ui = {
    entry: '.navbar-entry'
  };

  NavbarEntryView.prototype.triggers = {
    'click @ui.entry': 'click:entry'
  };

  NavbarEntryView.prototype.set_active = function() {
    return this.$el.addClass('active');
  };

  NavbarEntryView.prototype.unset_active = function() {
    this.$el.removeClass('active');
    return this.$el.removeClass('open');
  };

  return NavbarEntryView;

})(Marionette.View);

NavbarEntryCollectionView = (function(superClass) {
  extend(NavbarEntryCollectionView, superClass);

  function NavbarEntryCollectionView() {
    return NavbarEntryCollectionView.__super__.constructor.apply(this, arguments);
  }

  NavbarEntryCollectionView.prototype.tagName = 'ul';

  NavbarEntryCollectionView.prototype.className = 'nav navbar-nav nav-pills';

  NavbarEntryCollectionView.prototype.childView = NavbarEntryView;

  NavbarEntryCollectionView.prototype.setAllInactive = function() {
    return this.children.each(function(view) {
      return view.unset_active();
    });
  };

  NavbarEntryCollectionView.prototype.onChildviewClickEntry = function(cview, event) {
    this.setAllInactive();
    cview.set_active();
    return this.navigateOnClickEntry(cview, event);
  };

  NavbarEntryCollectionView.prototype.navigateOnClickEntry = function(cview, event) {
    var href, router, target;
    target = event.target;
    href = $(target).attr('href');
    if (href.split('/')[0] === '') {
      return window.location = href;
    } else {
      router = MainChannel.request('main-router');
      return router.navigate(href, {
        trigger: true
      });
    }
  };

  return NavbarEntryCollectionView;

})(Marionette.CollectionView);

NavbarEntriesView = (function(superClass) {
  extend(NavbarEntriesView, superClass);

  function NavbarEntriesView() {
    return NavbarEntriesView.__super__.constructor.apply(this, arguments);
  }

  NavbarEntriesView.prototype.regions = {
    list: '#navbar-entries',
    userMenu: '#user-menu',
    search: '#form-search-container'
  };

  NavbarEntriesView.prototype.onRender = function() {
    var view;
    view = new NavbarEntryCollectionView({
      collection: this.collection
    });
    return this.showChildView('list', view);
  };

  NavbarEntriesView.prototype.template = tc.renderable(function(model) {
    return tc.div('#navbar-view-collapse.collapse.navbar-collapse', function() {
      tc.div('#navbar-entries');
      tc.ul('#user-menu.nav.navbar-nav.navbar-right');
      return tc.div('#form-search-container');
    });
  });

  NavbarEntriesView.prototype.setAllInactive = function() {
    var view;
    view = this.getChildView('list');
    return view.setAllInactive();
  };

  return NavbarEntriesView;

})(Marionette.View);

NavbarHeaderView = (function(superClass) {
  extend(NavbarHeaderView, superClass);

  function NavbarHeaderView() {
    return NavbarHeaderView.__super__.constructor.apply(this, arguments);
  }

  NavbarHeaderView.prototype.template = tc.renderable(function(model) {
    navbar_collapse_button('navbar-view-collapse');
    return tc.a('.navbar-brand', {
      href: model.url
    }, model.label);
  });

  NavbarHeaderView.prototype.ui = {
    brand: '.navbar-brand'
  };

  NavbarHeaderView.prototype.triggers = {
    'click @ui.brand': 'click:brand'
  };

  return NavbarHeaderView;

})(Marionette.View);

BootstrapNavBarView = (function(superClass) {
  extend(BootstrapNavBarView, superClass);

  function BootstrapNavBarView() {
    return BootstrapNavBarView.__super__.constructor.apply(this, arguments);
  }

  BootstrapNavBarView.prototype.template = tc.renderable(function(model) {
    return tc.nav('#navbar-view.navbar.navbar-static-top.navbar-default', {
      xmlns: 'http://www.w3.org/1999/xhtml',
      'xml:lang': 'en',
      role: 'navigation'
    }, function() {
      return tc.div('.container', function() {
        tc.div('.navbar-header');
        return tc.div('#navbar-entries');
      });
    });
  });

  BootstrapNavBarView.prototype.regions = {
    header: '.navbar-header',
    usermenu: '#user-menu',
    mainmenu: '#main-menu',
    entries: '#navbar-entries'
  };

  BootstrapNavBarView.prototype.onRender = function() {
    var eview, hview;
    eview = new NavbarEntriesView({
      collection: new Backbone.Collection(this.model.get('navbarEntries'))
    });
    this.showChildView('entries', eview);
    hview = new NavbarHeaderView({
      model: new Backbone.Model(this.model.get('brand'))
    });
    return this.showChildView('header', hview);
  };

  BootstrapNavBarView.prototype.onChildviewClickBrand = function(view, event) {
    var eview;
    eview = this.getChildView('entries');
    eview.setAllInactive();
    return this.navigateOnClickEntry(view, event);
  };

  BootstrapNavBarView.prototype.navigateOnClickEntry = function(cview, event) {
    var href, router, target;
    console.log("Brand clicked");
    target = event.target;
    console.log("Target", target);
    href = $(target).attr('href');
    if (href.split('/')[0] === '') {
      return window.location = href;
    } else {
      router = MainChannel.request('main-router');
      return router.navigate(href, {
        trigger: true
      });
    }
  };

  return BootstrapNavBarView;

})(Marionette.View);

NavbarApp = (function(superClass) {
  extend(NavbarApp, superClass);

  function NavbarApp() {
    return NavbarApp.__super__.constructor.apply(this, arguments);
  }

  NavbarApp.prototype.onBeforeStart = function() {
    var appConfig, region, userMenuApp;
    console.log('NavbarApp options', this.options);
    appConfig = this.options.appConfig;
    region = this.options.parentApp.getView().getRegion('navbar');
    this.setRegion(region);
    if (appConfig.hasUser) {
      return userMenuApp = this.addChildApp('user-menu', {
        AppClass: appConfig.userMenuApp,
        startWithParent: true,
        appConfig: appConfig,
        parentApp: this
      });
    }
  };

  NavbarApp.prototype.onStart = function() {
    return this.initPage();
  };

  NavbarApp.prototype.initPage = function() {
    var appConfig, layout;
    appConfig = this.options.parentApp.options.appConfig;
    layout = new BootstrapNavBarView({
      model: new Backbone.Model(appConfig)
    });
    return this.showView(layout);
  };

  return NavbarApp;

})(Toolkit.App);

module.exports = NavbarApp;


/***/ })

});
//# sourceMappingURL=common.js.map