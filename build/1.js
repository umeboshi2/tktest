webpackJsonp([1],{

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

var Applet, Controller, HubChannel, MainChannel, Marionette, Router, TkApplet,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = __webpack_require__(4);

TkApplet = __webpack_require__(140);

Controller = __webpack_require__(167);

__webpack_require__(136);

MainChannel = Backbone.Radio.channel('global');

HubChannel = Backbone.Radio.channel('hubby');

Router = (function(superClass) {
  extend(Router, superClass);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.appRoutes = {
    'hubby': 'mainview',
    'hubby/listmeetings': 'list_meetings',
    'hubby/viewmeeting/:id': 'view_meeting',
    'hubby/search': 'view_items'
  };

  return Router;

})(Marionette.AppRouter);

Applet = (function(superClass) {
  extend(Applet, superClass);

  function Applet() {
    return Applet.__super__.constructor.apply(this, arguments);
  }

  Applet.prototype.Controller = Controller;

  Applet.prototype.Router = Router;

  Applet.prototype.onBeforeStart = function(args) {
    var controller;
    Applet.__super__.onBeforeStart.call(this, args);
    controller = this.router.controller;
    HubChannel.reply('main-controller', function() {
      return controller;
    });
    HubChannel.reply('view-calendar', function(layout, region) {
      return controller.show_calendar(layout, region);
    });
    HubChannel.reply('view-meeting', function(layout, region, id) {
      return controller.show_meeting(layout, region, id);
    });
    return HubChannel.reply('view-items', function(layout, region, options) {
      return controller.list_items(layout, region, options);
    });
  };

  return Applet;

})(TkApplet);

MainChannel.reply('applet:hubby:route', function() {
  var controller, router;
  console.warn("Don't use applet:hubby:route");
  controller = new Controller(MainChannel);
  HubChannel.reply('main-controller', function() {
    return controller;
  });
  HubChannel.reply('view-calendar', function(layout, region) {
    return controller.show_calendar(layout, region);
  });
  HubChannel.reply('view-meeting', function(layout, region, id) {
    return controller.show_meeting(layout, region, id);
  });
  HubChannel.reply('view-items', function(layout, region, options) {
    return controller.list_items(layout, region, options);
  });
  return router = new Router({
    controller: controller
  });
});

module.exports = Applet;


/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

var $, Backbone, _, camel_to_kebab, capitalize, create_model, create_new_approuter, get_model, handle_newlines, make_field_input_ui, make_json_post, make_json_post_settings, navbar_color_handlers, navbar_set_active, navigate_to_url, newline_2_br, random_choice, remove_trailing_slashes, scroll_top_fast, scroll_top_fast_jquery, string_endswith, string_startswith;

$ = __webpack_require__(20);

_ = __webpack_require__(11);

Backbone = __webpack_require__(3);

camel_to_kebab = function(str) {
  return str.replace(/([A-Z])/g, function($1) {
    return "-" + ($1.toLowerCase());
  });
};

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

create_model = function(collection, options) {
  var key, model, value;
  model = collection.create();
  for (key in options) {
    value = options[key];
    model.set(key, value);
  }
  collection.add(model);
  return collection.save();
};

create_new_approuter = function(channel, Router, Controller) {
  var controller, router;
  controller = new Controller;
  channel.reply('main-controller', function() {
    return controller;
  });
  router = new Router({
    controller: controller
  });
  return router;
};

get_model = function(collection, id) {
  var model;
  model = collection.get(id);
  if (model === void 0) {
    return new collection.model({
      id: id
    });
  } else {
    return model;
  }
};

handle_newlines = function(str) {
  console.warn("handle_newlines being replaced by newline_2_br");
  return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
};

make_field_input_ui = function(fieldlist) {
  var field, i, len, uiobject;
  uiobject = {};
  for (i = 0, len = fieldlist.length; i < len; i++) {
    field = fieldlist[i];
    uiobject[field] = "input[name=\"" + field + "\"]";
  }
  return uiobject;
};

make_json_post_settings = function(url, data, type) {
  var settings;
  if (type == null) {
    type = 'POST';
  }
  settings = {
    type: type,
    url: url,
    data: JSON.stringify(data),
    accepts: 'application/json',
    contentType: 'application/json'
  };
  return settings;
};

make_json_post = function(url, data, type) {
  var settings;
  if (type == null) {
    type = 'POST';
  }
  settings = make_json_post_settings(url, data, type);
  return $.ajax(settings);
};

navbar_color_handlers = function(channel, selector) {
  channel.reply('get-navbar-color', function() {
    var navbar;
    navbar = $(selector);
    return navbar.css('color');
  });
  return channel.reply('get-navbar-bg-color', function() {
    var navbar;
    navbar = $(selector);
    return navbar.css('background-color');
  });
};

navbar_set_active = function(path) {
  var i, len, li, liq, path_top, ref, results;
  path_top = path.split('/')[0];
  ref = $('#navbar-view li');
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    li = ref[i];
    liq = $(li);
    liq.removeClass('active');
    if (path_top === liq.attr('appname')) {
      results.push(liq.addClass('active'));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

navigate_to_url = function(url) {
  var r;
  if (url.split('/')[0] === '') {
    return window.location = url;
  } else {
    r = new Backbone.Router;
    return r.navigate(url, {
      trigger: true
    });
  }
};

newline_2_br = function(str) {
  return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
};

random_choice = function(myArray) {
  var index;
  index = Math.floor(Math.random() * myArray.length);
  return myArray[index];
};

remove_trailing_slashes = function(path) {
  return path.replace(/\/$/, "");
};

scroll_top_fast = function() {
  return window.scrollTo(0, 0);
};

scroll_top_fast_jquery = function() {
  return $('html, body').animate({
    scrollTop: 0
  }, 'fast');
};

string_endswith = function(searchString, position) {
  var lastIndex, subjectString;
  subjectString = this.toString();
  if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
    position = subjectString.length;
  }
  position -= searchString.length;
  lastIndex = subjectString.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

string_startswith = function(searchString, position) {
  position = position || 0;
  return this.substr(position, searchString, position) === searchString;
};

module.exports = {
  camel_to_kebab: camel_to_kebab,
  capitalize: capitalize,
  create_model: create_model,
  create_new_approuter: create_new_approuter,
  get_model: get_model,
  handle_newlines: handle_newlines,
  make_field_input_ui: make_field_input_ui,
  make_json_post_settings: make_json_post_settings,
  make_json_post: make_json_post,
  navbar_color_handlers: navbar_color_handlers,
  navbar_set_active: navbar_set_active,
  navigate_to_url: navigate_to_url,
  random_choice: random_choice,
  remove_trailing_slashes: remove_trailing_slashes,
  scroll_top_fast: scroll_top_fast,
  scroll_top_fast_jquery: scroll_top_fast_jquery,
  string_endswith: string_endswith,
  string_startswith: string_startswith
};


/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, BootstrapModalRegion, MainChannel, Marionette, SlideDownRegion, show_modal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

MainChannel = Backbone.Radio.channel('global');

SlideDownRegion = (function(superClass) {
  extend(SlideDownRegion, superClass);

  function SlideDownRegion() {
    return SlideDownRegion.__super__.constructor.apply(this, arguments);
  }

  SlideDownRegion.prototype.attachHtml = function(view) {
    var speed;
    speed = this.slide_speed ? this.slide_speed : 'fast';
    this.$el.hide();
    this.$el.html(view.el);
    return this.$el.slideDown(speed);
  };

  return SlideDownRegion;

})(Backbone.Marionette.Region);

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

})(Backbone.Marionette.Region);

show_modal = function(view, backdrop) {
  var modal_region;
  if (backdrop == null) {
    backdrop = false;
  }
  modal_region = MainChannel.request('main:app:get-region', 'modal');
  modal_region.backdrop = backdrop;
  return modal_region.show(view);
};

module.exports = {
  BootstrapModalRegion: BootstrapModalRegion,
  show_modal: show_modal,
  SlideDownRegion: SlideDownRegion,
  modal: BootstrapModalRegion,
  slideDown: SlideDownRegion
};


/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

var BootstrapLayoutTemplate, BootstrapNoGridLayoutTemplate, MainContentTemplate, MainFluidLayoutTemplate, MainLayoutTemplate, _MainLayoutTemplate, make_sidebar_template, tc;

tc = __webpack_require__(6);

BootstrapLayoutTemplate = tc.renderable(function() {
  tc.div('#main-navbar.navbar.navbar-default.navbar-fixed-top', {
    role: 'navigation'
  });
  tc.div('.container-fluid', function() {
    return tc.div('.row', function() {
      tc.div('#sidebar.col-sm-2');
      return tc.div('#main-content.col-sm-9');
    });
  });
  tc.div('#footer');
  return tc.div('#modal');
});

BootstrapNoGridLayoutTemplate = tc.renderable(function() {
  tc.div('#main-navbar.navbar.navbar-default.navbar-fixed-top', {
    role: 'navigation'
  });
  tc.div('.main-layout', function() {
    tc.div('#sidebar');
    return tc.div('#main-content');
  });
  tc.div('#footer');
  return tc.div('#modal');
});

_MainLayoutTemplate = tc.renderable(function(container) {
  tc.div('#navbar-view-container');
  tc.div("." + container, function() {
    tc.div('.row', function() {
      return tc.div('.col-md-10', function() {
        return tc.div('#messages');
      });
    });
    return tc.div('#applet-content.row');
  });
  tc.div('#footer');
  return tc.div('#modal');
});

MainLayoutTemplate = function() {
  return _MainLayoutTemplate('container');
};

MainFluidLayoutTemplate = function() {
  return _MainLayoutTemplate('container-fluid');
};

MainContentTemplate = tc.renderable(function(doc) {
  var atts;
  atts = doc.data.attributes;
  return tc.article('.document-view.content', function() {
    tc.h1(atts.title);
    tc.p('.lead', atts.description);
    return tc.div('.body', function() {
      return tc.raw(atts.body);
    });
  });
});

make_sidebar_template = function(columns, size, position) {
  if (columns == null) {
    columns = 3;
  }
  if (size == null) {
    size = 'sm';
  }
  if (position == null) {
    position = 'left';
  }
  return tc.renderable(function() {
    if (position === 'left') {
      tc.div("#sidebar.col-" + size + "-" + columns + ".left-column");
    }
    tc.div("#main-content.col-" + size + "-" + (12 - columns));
    if (position === 'right') {
      return tc.div("#sidebar.col-" + size + "-" + columns + ".right-column");
    }
  });
};

module.exports = {
  BootstrapLayoutTemplate: BootstrapLayoutTemplate,
  BootstrapNoGridLayoutTemplate: BootstrapNoGridLayoutTemplate,
  MainLayoutTemplate: MainLayoutTemplate,
  MainFluidLayoutTemplate: MainFluidLayoutTemplate,
  MainContentTemplate: MainContentTemplate,
  make_sidebar_template: make_sidebar_template
};


/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, DefaultAppletLayout, LayoutTemplates, MainPageLayout, Marionette, Regions, ShowInitialEmptyContent, SidebarAppletLayout, ToolbarAppletLayout, ms, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

tc = __webpack_require__(6);

ms = __webpack_require__(135);

LayoutTemplates = __webpack_require__(133);

ShowInitialEmptyContent = __webpack_require__(137);

Regions = __webpack_require__(131);

MainPageLayout = (function(superClass) {
  extend(MainPageLayout, superClass);

  function MainPageLayout() {
    return MainPageLayout.__super__.constructor.apply(this, arguments);
  }

  MainPageLayout.prototype.template = LayoutTemplates.MainFluidLayoutTemplate;

  MainPageLayout.prototype.regions = {
    messages: '#messages',
    navbar: '#navbar-view-container',
    modal: Regions.BootstrapModalRegion,
    applet: '#applet-content',
    footer: '#footer'
  };

  return MainPageLayout;

})(Backbone.Marionette.View);

SidebarAppletLayout = (function(superClass) {
  extend(SidebarAppletLayout, superClass);

  function SidebarAppletLayout() {
    return SidebarAppletLayout.__super__.constructor.apply(this, arguments);
  }

  SidebarAppletLayout.prototype.template = LayoutTemplates.make_sidebar_template();

  SidebarAppletLayout.prototype.regions = {
    sidebar: '#sidebar',
    content: '#main-content'
  };

  return SidebarAppletLayout;

})(Backbone.Marionette.View);

ToolbarAppletLayout = (function(superClass) {
  extend(ToolbarAppletLayout, superClass);

  function ToolbarAppletLayout() {
    return ToolbarAppletLayout.__super__.constructor.apply(this, arguments);
  }

  ToolbarAppletLayout.prototype.behaviors = {
    ShowInitialEmptyContent: {
      behaviorClass: ShowInitialEmptyContent
    }
  };

  ToolbarAppletLayout.prototype.template = tc.renderable(function() {
    tc.div('.row', function() {
      return tc.div('#main-toolbar.col-sm-6.col-sm-offset-3');
    });
    return tc.div('.row', function() {
      return tc.div('#main-content.col-sm-10.col-sm-offset-1');
    });
  });

  ToolbarAppletLayout.prototype.regions = function() {
    var region;
    region = new Regions.SlideDownRegion({
      el: '#main-content'
    });
    region.slide_speed = ms('.01s');
    return {
      content: region,
      toolbar: '#main-toolbar'
    };
  };

  return ToolbarAppletLayout;

})(Backbone.Marionette.View);

DefaultAppletLayout = SidebarAppletLayout;

module.exports = {
  DefaultAppletLayout: DefaultAppletLayout,
  MainPageLayout: MainPageLayout,
  SidebarAppletLayout: SidebarAppletLayout,
  ToolbarAppletLayout: ToolbarAppletLayout
};


/***/ }),

/***/ 135:
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var y = d * 365.25

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {}
  var type = typeof val
  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ?
			fmtLong(val) :
			fmtShort(val)
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)
  if (str.length > 10000) {
    return
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
  if (!match) {
    return
  }
  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'days':
    case 'day':
    case 'd':
      return n * d
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      return undefined
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd'
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h'
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm'
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's'
  }
  return ms + 'ms'
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name
  }
  return Math.ceil(ms / n) + ' ' + name + 's'
}


/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, HubChannel, ItemCollection, MainMeetingModel, MeetingCollection, SimpleItemModel, SimpleMeetingModel, apiroot, main_meeting_list, qs,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

qs = __webpack_require__(193);

HubChannel = Backbone.Radio.channel('hubby');

apiroot = 'https://infidel-frobozz.rhcloud.com/api/dev/lgr';

SimpleMeetingModel = (function(superClass) {
  extend(SimpleMeetingModel, superClass);

  function SimpleMeetingModel() {
    return SimpleMeetingModel.__super__.constructor.apply(this, arguments);
  }

  SimpleMeetingModel.prototype.url = function() {
    return apiroot + "/meetings/" + this.id;
  };

  return SimpleMeetingModel;

})(Backbone.Model);

MainMeetingModel = (function(superClass) {
  extend(MainMeetingModel, superClass);

  function MainMeetingModel() {
    return MainMeetingModel.__super__.constructor.apply(this, arguments);
  }

  MainMeetingModel.prototype.url = function() {
    return apiroot + "/meetings/" + this.id;
  };

  return MainMeetingModel;

})(Backbone.Model);

MeetingCollection = (function(superClass) {
  extend(MeetingCollection, superClass);

  function MeetingCollection() {
    return MeetingCollection.__super__.constructor.apply(this, arguments);
  }

  MeetingCollection.prototype.model = SimpleMeetingModel;

  MeetingCollection.prototype.url = apiroot + "/meetings";

  return MeetingCollection;

})(Backbone.Collection);

SimpleItemModel = (function(superClass) {
  extend(SimpleItemModel, superClass);

  function SimpleItemModel() {
    return SimpleItemModel.__super__.constructor.apply(this, arguments);
  }

  SimpleItemModel.prototype.url = function() {
    return apiroot + "/items/" + this.id;
  };

  return SimpleItemModel;

})(Backbone.Model);

ItemCollection = (function(superClass) {
  extend(ItemCollection, superClass);

  function ItemCollection() {
    return ItemCollection.__super__.constructor.apply(this, arguments);
  }

  ItemCollection.prototype.model = SimpleItemModel;

  ItemCollection.prototype.url = function() {
    return apiroot + "/items/search?" + (qs.stringify(this.searchParams));
  };

  return ItemCollection;

})(Backbone.Collection);

main_meeting_list = new MeetingCollection;

HubChannel.reply('meetinglist', function() {
  return main_meeting_list;
});

module.exports = {
  apiroot: apiroot,
  MeetingCollection: MeetingCollection,
  MainMeetingModel: MainMeetingModel,
  ItemCollection: ItemCollection
};


/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, EmptyView, MainChannel, Marionette, ShowInitialEmptyContent,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

MainChannel = Backbone.Radio.channel('global');

EmptyView = __webpack_require__(141);

ShowInitialEmptyContent = (function(superClass) {
  extend(ShowInitialEmptyContent, superClass);

  function ShowInitialEmptyContent() {
    return ShowInitialEmptyContent.__super__.constructor.apply(this, arguments);
  }

  ShowInitialEmptyContent.prototype.onDomRefresh = function() {
    var view;
    view = new EmptyView;
    return this.view.showChildView('content', view);
  };

  return ShowInitialEmptyContent;

})(Backbone.Marionette.Behavior);

module.exports = ShowInitialEmptyContent;


/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

var $, Backbone, BaseController, DefaultAppletLayout, MainChannel, MainController, Marionette, Util,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = __webpack_require__(20);

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

DefaultAppletLayout = __webpack_require__(134).DefaultAppletLayout;

Util = __webpack_require__(129);

MainChannel = Backbone.Radio.channel('global');

BaseController = (function(superClass) {
  extend(BaseController, superClass);

  function BaseController() {
    return BaseController.__super__.constructor.apply(this, arguments);
  }

  BaseController.prototype.init_page = function() {};

  BaseController.prototype.scroll_top = Util.scroll_top_fast;

  BaseController.prototype.navigate_to_url = Util.navigate_to_url;

  BaseController.prototype.navbar_set_active = Util.navbar_set_active;

  return BaseController;

})(Backbone.Marionette.Object);

MainController = (function(superClass) {
  extend(MainController, superClass);

  function MainController() {
    return MainController.__super__.constructor.apply(this, arguments);
  }

  MainController.prototype.layoutClass = DefaultAppletLayout;

  MainController.prototype._get_applet = function() {
    var app;
    app = MainChannel.request('main:app:object');
    return app.getView().getRegion('applet');
  };

  MainController.prototype.setup_layout = function() {
    var applet;
    this.layout = new this.layoutClass;
    applet = this._get_applet();
    if (applet.hasView()) {
      applet.empty();
    }
    return applet.show(this.layout);
  };

  MainController.prototype.setup_layout_if_needed = function() {
    if (this.layout === void 0) {
      return this.setup_layout();
    } else if (this.layout.isDestroyed()) {
      return this.setup_layout();
    }
  };

  MainController.prototype._get_region = function(region) {
    return this.layout.getRegion(region);
  };

  MainController.prototype._show_content = function(view) {
    var content;
    console.warn("_show_content is deprecated");
    content = this._get_region('content');
    return content.show(view);
  };

  MainController.prototype._empty_sidebar = function() {
    var sidebar;
    sidebar = this._get_region('sidebar');
    sidebar.empty();
    return sidebar;
  };

  MainController.prototype._make_sidebar = function() {
    var sidebar, view;
    console.warn("_make_sidebar is deprecated");
    sidebar = this._empty_sidebar();
    view = new this.sidebarclass({
      model: this.sidebar_model
    });
    return sidebar.show(view);
  };

  MainController.prototype._show_view = function(vclass, model) {
    var view;
    view = new vclass({
      model: model
    });
    return this.layout.showChildView('content', view);
  };

  MainController.prototype._load_view = function(vclass, model, objname) {
    var response;
    if (model.isEmpty() || Object.keys(model.attributes).length === 1) {
      response = model.fetch();
      response.done((function(_this) {
        return function() {
          return _this._show_view(vclass, model);
        };
      })(this));
      return response.fail((function(_this) {
        return function() {
          var msg;
          msg = "Failed to load " + objname + " data.";
          return MessageChannel.request('danger', msg);
        };
      })(this));
    } else {
      return this._show_view(vclass, model);
    }
  };

  return MainController;

})(BaseController);

module.exports = {
  BaseController: BaseController,
  MainController: MainController
};


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

var MainChannel, Marionette, TkApplet, Toolkit,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = __webpack_require__(4);

Toolkit = __webpack_require__(7);

MainChannel = Backbone.Radio.channel('global');

TkApplet = (function(superClass) {
  extend(TkApplet, superClass);

  function TkApplet() {
    return TkApplet.__super__.constructor.apply(this, arguments);
  }

  TkApplet.prototype.onBeforeStart = function() {
    var controller;
    controller = new this.Controller;
    controller.applet = this;
    return this.router = new this.Router({
      controller: controller
    });
  };

  TkApplet.prototype.onStop = function() {
    return console.log("Stopping TkApplet", this.isRunning());
  };

  return TkApplet;

})(Toolkit.App);

module.exports = TkApplet;


/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, EmptyView, Marionette, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

tc = __webpack_require__(6);

EmptyView = (function(superClass) {
  extend(EmptyView, superClass);

  function EmptyView() {
    return EmptyView.__super__.constructor.apply(this, arguments);
  }

  EmptyView.prototype.template = tc.renderable(function() {
    return tc.div('.jumbotron', function() {
      return tc.h1(function() {
        tc.text('Loading ...');
        return tc.i('.fa.fa-spinner.fa-spin');
      });
    });
  });

  return EmptyView;

})(Backbone.Marionette.View);

module.exports = EmptyView;


/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]; // eslint-disable-line max-len
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, Controller, HubChannel, MainChannel, MainController, Marionette, MessageChannel, SlideDownRegion, ToolbarAppletLayout, ToolbarView, Util, ms, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

tc = __webpack_require__(6);

ms = __webpack_require__(135);

MainController = __webpack_require__(139).MainController;

SlideDownRegion = __webpack_require__(131).SlideDownRegion;

ToolbarAppletLayout = __webpack_require__(134).ToolbarAppletLayout;

Util = __webpack_require__(129);

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

HubChannel = Backbone.Radio.channel('hubby');

ToolbarView = (function(superClass) {
  extend(ToolbarView, superClass);

  function ToolbarView() {
    return ToolbarView.__super__.constructor.apply(this, arguments);
  }

  ToolbarView.prototype.template = tc.renderable(function() {
    tc.div('.btn-group.btn-group-justified', function() {
      tc.div('#show-calendar-button.btn.btn-default', function() {
        return tc.i('.fa.fa-calendar', ' Calendar');
      });
      return tc.div('#list-meetings-button.btn.btn-default', function() {
        return tc.i('.fa.fa-list', ' List Meetings');
      });
    });
    return tc.div('.input-group', function() {
      tc.input('.form-control', {
        type: 'text',
        placeholder: 'search',
        name: 'search'
      });
      return tc.span('.input-group-btn', function() {
        return tc.button('#search-button.btn.btn-default', function() {
          return tc.i('.fa.fa-search', 'Search');
        });
      });
    });
  });

  ToolbarView.prototype.ui = {
    search_bth: '#search-button',
    show_cal_btn: '#show-calendar-button',
    list_btn: '#list-meetings-button',
    search_entry: '.form-control'
  };

  ToolbarView.prototype.events = {
    'click @ui.show_cal_btn': 'show_calendar',
    'click @ui.list_btn': 'list_meetings',
    'click @ui.search_bth': 'search_hubby'
  };

  ToolbarView.prototype.show_calendar = function() {
    var controller, hash;
    hash = '#hubby';
    if (window.location.hash === hash) {
      controller = HubChannel.request('main-controller');
      return controller.mainview();
    } else {
      if (true) {
        console.log("current url", window.location);
      }
      return Util.navigate_to_url('#hubby');
    }
  };

  ToolbarView.prototype.list_meetings = function() {
    return Util.navigate_to_url('#hubby/listmeetings');
  };

  ToolbarView.prototype.search_hubby = function() {
    var controller, options;
    controller = HubChannel.request('main-controller');
    options = {
      searchParams: {
        title: this.ui.search_entry.val()
      }
    };
    console.log("search for", options);
    return controller.view_items(options);
  };

  return ToolbarView;

})(Backbone.Marionette.View);

Controller = (function(superClass) {
  extend(Controller, superClass);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.layoutClass = ToolbarAppletLayout;

  Controller.prototype.setup_layout_if_needed = function() {
    Controller.__super__.setup_layout_if_needed.call(this);
    return this.layout.showChildView('toolbar', new ToolbarView);
  };

  Controller.prototype.show_calendar = function(layout, region) {
    return __webpack_require__.e/* require.ensure */(9).then(((function(_this) {
      return function() {
        var MeetingCalendarView, options, view;
        MeetingCalendarView = __webpack_require__(166);
        options = {};
        if (region === 'minicalendar') {
          options.minicalendar = true;
          options.layout = layout;
        }
        view = new MeetingCalendarView(options);
        return layout.showChildView(region, view);
      };
    })(this)).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  };

  Controller.prototype.mainview = function() {
    this.setup_layout_if_needed();
    return this.show_calendar(this.layout, 'content');
  };

  Controller.prototype.list_meetings = function() {
    this.setup_layout_if_needed();
    return __webpack_require__.e/* require.ensure */(10).then(((function(_this) {
      return function() {
        var ListMeetingsView, MainMeetingModel, meetings, response;
        MainMeetingModel = __webpack_require__(136).MainMeetingModel;
        meetings = HubChannel.request('meetinglist');
        ListMeetingsView = __webpack_require__(168);
        response = meetings.fetch();
        response.done(function() {
          var view;
          view = new ListMeetingsView({
            collection: meetings
          });
          return _this.layout.showChildView('content', view);
        });
        return response.fail(function() {
          return MessageChannel.request('danger', 'Failed to load meeting list');
        });
      };
    })(this)).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  };

  Controller.prototype.show_meeting = function(layout, region, meeting_id) {
    return __webpack_require__.e/* require.ensure */(8).then(((function(_this) {
      return function() {
        var MainMeetingModel, ShowMeetingView, meeting, response;
        MainMeetingModel = __webpack_require__(136).MainMeetingModel;
        ShowMeetingView = __webpack_require__(169);
        meeting = new MainMeetingModel({
          id: meeting_id
        });
        response = meeting.fetch();
        response.done(function() {
          var view;
          view = new ShowMeetingView({
            model: meeting
          });
          return layout.showChildView(region, view);
        });
        return response.fail(function() {
          return MessageChannel.request('danger', 'Failed to load meeting');
        });
      };
    })(this)).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  };

  Controller.prototype.view_meeting = function(meeting_id) {
    this.setup_layout_if_needed();
    return this.show_meeting(this.layout, 'content', meeting_id);
  };

  Controller.prototype.view_items = function(options) {
    this.setup_layout_if_needed();
    return this.list_items(this.layout, 'content', options);
  };

  Controller.prototype.list_items = function(layout, region, options) {
    return __webpack_require__.e/* require.ensure */(6).then(((function(_this) {
      return function() {
        var ItemCollection, ListItemsView, items, response;
        ItemCollection = __webpack_require__(136).ItemCollection;
        ListItemsView = __webpack_require__(170);
        items = new ItemCollection([]);
        items.searchParams = options.searchParams;
        console.log('ItemCollection', items);
        response = items.fetch();
        return response.done(function() {
          var view;
          view = new ListItemsView({
            collection: items
          });
          return layout.showChildView(region, view);
        });
      };
    })(this)).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  };

  return Controller;

})(MainController);

module.exports = Controller;


/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(195);
var parse = __webpack_require__(194);
var formats = __webpack_require__(150);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(151);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(151);
var formats = __webpack_require__(150);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix);
            return [formatter(keyValue) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    return keys.join(delimiter);
};


/***/ })

});
//# sourceMappingURL=1.js.map