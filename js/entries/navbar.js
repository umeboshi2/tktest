var $, Backbone, BootstrapNavBarView, MainChannel, Marionette, MessageChannel, NavbarApp, NavbarEntriesView, NavbarEntry, NavbarEntryCollection, NavbarEntryCollectionView, NavbarEntryView, NavbarHeaderView, Toolkit, dropdown_entry, dropdown_toggle, nav_pt, nav_pt_content, navbar_collapse_button, navbar_entry_collection, single_entry, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

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

  NavbarEntryCollectionView.prototype.loadUrlOnClickEntry = function(cview, event) {
    var href, target;
    target = event.target;
    console.log("Here is the target", target);
    href = $(target).attr('href');
    return Backbone.history.loadUrl(href);
  };

  NavbarEntryCollectionView.prototype.navigateOnClickEntry = function(cview, event) {
    var href, r, target;
    target = event.target;
    href = $(target).attr('href');
    if (href.split('/')[0] === '') {
      return window.location = href;
    } else {
      r = new Backbone.Router;
      return r.navigate(href, {
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

  BootstrapNavBarView.prototype.onChildviewClickBrand = function(view) {
    var eview;
    eview = this.getChildView('entries');
    return eview.setAllInactive();
  };

  return BootstrapNavBarView;

})(Marionette.View);

NavbarApp = (function(superClass) {
  extend(NavbarApp, superClass);

  function NavbarApp() {
    return NavbarApp.__super__.constructor.apply(this, arguments);
  }

  NavbarApp.prototype.onBeforeStart = function() {
    var region;
    region = this.options.parentApp.getView().getRegion('navbar');
    return this.setRegion(region);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cmllcy9uYXZiYXIuanMiLCJzb3VyY2VzIjpbImVudHJpZXMvbmF2YmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDhVQUFBO0VBQUE7OztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYOzs7Ozs7O3dCQUNKLFFBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxXQUFQO0lBQ0EsR0FBQSxFQUFLLE1BREw7SUFFQSxhQUFBLEVBQWUsS0FGZjtJQUdBLE9BQUEsRUFBUyxFQUhUO0lBSUEsSUFBQSxFQUFNLEVBSk47Ozs7O0dBRnNCLFFBQVEsQ0FBQzs7QUFRN0I7Ozs7Ozs7a0NBQ0osS0FBQSxHQUFPOzs7O0dBRDJCLFFBQVEsQ0FBQzs7QUFHN0MsdUJBQUEsR0FBMEIsSUFBSTs7QUFDOUIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsZ0JBQWxCLEVBQW9DLFNBQUE7U0FDbEM7QUFEa0MsQ0FBcEM7O0FBR0EsV0FBVyxDQUFDLEtBQVosQ0FBa0Isa0JBQWxCLEVBQXNDLFNBQUE7U0FDcEMsSUFBSTtBQURnQyxDQUF0Qzs7QUFHQSxXQUFXLENBQUMsS0FBWixDQUFrQixrQkFBbEIsRUFBc0MsU0FBQyxJQUFEO1NBQ3BDLHVCQUF1QixDQUFDLEdBQXhCLENBQTRCLElBQTVCO0FBRG9DLENBQXRDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLG9CQUFsQixFQUF3QyxTQUFDLEtBQUQ7U0FDdEMsdUJBQXVCLENBQUMsR0FBeEIsQ0FBNEIsS0FBNUI7QUFEc0MsQ0FBeEM7O0FBUUEsc0JBQUEsR0FBMEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLE1BQUQ7U0FDdEMsRUFBRSxDQUFDLE1BQUgsQ0FBVSxnQkFBVixFQUE0QjtJQUFBLElBQUEsRUFBSyxRQUFMO0lBQWUsYUFBQSxFQUFjLFVBQTdCO0lBQzVCLGFBQUEsRUFBZSxHQUFBLEdBQUksTUFEUztHQUE1QixFQUM2QixTQUFBO0lBQ3pCLEVBQUUsQ0FBQyxJQUFILENBQVEsVUFBUixFQUFvQixtQkFBcEI7SUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7SUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7V0FDQSxFQUFFLENBQUMsSUFBSCxDQUFRLFdBQVI7RUFKeUIsQ0FEN0I7QUFEc0MsQ0FBZDs7QUFRMUIsZUFBQSxHQUFrQixFQUFFLENBQUMsU0FBSCxDQUFhLFNBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsY0FBbEI7U0FDN0IsRUFBRSxDQUFDLENBQUgsQ0FBUSxRQUFELEdBQVUsa0JBQWpCLEVBQW9DO0lBQUEsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQUFYO0lBQ3BDLGFBQUEsRUFBYyxVQURzQjtHQUFwQyxFQUMwQixjQUQxQjtBQUQ2QixDQUFiOztBQUlsQixjQUFBLEdBQWlCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxRQUFEO1NBQzdCLEVBQUUsQ0FBQyxHQUFILENBQU8sR0FBQSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVQsSUFBc0IsV0FBdkIsQ0FBVixFQUFnRCxTQUFBO0lBQzlDLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsU0FBQTtNQUN2QixzQkFBQSxDQUF1QixzQkFBdkI7YUFDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLGVBQUwsRUFBc0I7UUFBQSxJQUFBLEVBQUssR0FBTDtPQUF0QixFQUFnQyxRQUFoQztJQUZ1QixDQUF6QjtXQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0RBQVAsRUFBeUQsU0FBQTtNQUN2RCxFQUFFLENBQUMsRUFBSCxDQUFNLDJCQUFOLEVBQW1DLFNBQUEsR0FBQSxDQUFuQztNQUlBLEVBQUUsQ0FBQyxFQUFILENBQU0sd0NBQU47YUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLHdCQUFQO0lBTnVELENBQXpEO0VBSjhDLENBQWhEO0FBRDZCLENBQWQ7O0FBYWpCLE1BQUEsR0FBUyxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsUUFBRDtTQUNyQixFQUFFLENBQUMsR0FBSCxDQUFPLHNEQUFQLEVBQ0E7SUFBQSxLQUFBLEVBQU0sOEJBQU47SUFBc0MsVUFBQSxFQUFXLElBQWpEO0lBQ0EsSUFBQSxFQUFLLFlBREw7R0FEQSxFQUVtQixTQUFBO1dBQ2pCLEVBQUUsQ0FBQyxHQUFILENBQU8sWUFBUCxFQUFxQixTQUFBO01BQ25CLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsU0FBQTtRQUN2QixzQkFBQSxDQUF1QixzQkFBdkI7ZUFDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLGVBQUwsRUFBc0I7VUFBQSxJQUFBLEVBQUssR0FBTDtTQUF0QixFQUFnQyxRQUFoQztNQUZ1QixDQUF6QjthQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0RBQVA7SUFKbUIsQ0FBckI7RUFEaUIsQ0FGbkI7QUFEcUIsQ0FBZDs7QUFVVCxjQUFBLEdBQWlCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO0VBQzdCLEVBQUUsQ0FBQyxDQUFILENBQUssa0JBQUwsRUFBeUI7SUFBQSxJQUFBLEVBQUssUUFBTDtJQUFlLGFBQUEsRUFBYyxVQUE3QjtHQUF6QixFQUFrRSxTQUFBO0lBQ2hFLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBSyxDQUFDLEtBQWQ7V0FDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLFFBQUw7RUFGZ0UsQ0FBbEU7U0FHQSxFQUFFLENBQUMsRUFBSCxDQUFNLGdCQUFOLEVBQXdCLFNBQUE7QUFDdEIsUUFBQTtBQUFBO0FBQUE7U0FBQSxxQ0FBQTs7bUJBQ0UsRUFBRSxDQUFDLEVBQUgsQ0FBTSxTQUFBO2VBQ0osRUFBRSxDQUFDLENBQUgsQ0FBSyxlQUFMLEVBQXNCO1VBQUEsSUFBQSxFQUFLLElBQUksQ0FBQyxHQUFWO1NBQXRCLEVBQXFDLElBQUksQ0FBQyxLQUExQztNQURJLENBQU47QUFERjs7RUFEc0IsQ0FBeEI7QUFKNkIsQ0FBZDs7QUFTakIsWUFBQSxHQUFlLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1NBQzNCLEVBQUUsQ0FBQyxDQUFILENBQUssZUFBTCxFQUFzQjtJQUFBLElBQUEsRUFBSyxLQUFLLENBQUMsR0FBWDtHQUF0QixFQUFzQyxLQUFLLENBQUMsS0FBNUM7QUFEMkIsQ0FBZDs7QUFHVDs7Ozs7Ozs0QkFDSixLQUFBLEdBQU87OzRCQUNQLE9BQUEsR0FBUzs7NEJBQ1QsU0FBQSxHQUFXLFNBQUE7SUFDVCxJQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE1BQVgsQ0FBSDthQUEwQixXQUExQjtLQUFBLE1BQUE7YUFBMEMsT0FBMUM7O0VBRFM7OzRCQUVYLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtJQUN0QixvQkFBRyxLQUFLLENBQUUsYUFBVjthQUNFLGNBQUEsQ0FBZSxLQUFmLEVBREY7S0FBQSxNQUFBO2FBR0UsWUFBQSxDQUFhLEtBQWIsRUFIRjs7RUFEc0IsQ0FBZDs7NEJBS1YsRUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPLGVBQVA7Ozs0QkFDRixRQUFBLEdBQ0U7SUFBQSxpQkFBQSxFQUFtQixhQUFuQjs7OzRCQUNGLFVBQUEsR0FBWSxTQUFBO1dBQ1YsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsUUFBZDtFQURVOzs0QkFFWixZQUFBLEdBQWMsU0FBQTtJQUNaLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQjtXQUlBLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixNQUFqQjtFQUxZOzs7O0dBaEJjLFVBQVUsQ0FBQzs7QUF3Qm5DOzs7Ozs7O3NDQUNKLE9BQUEsR0FBUzs7c0NBQ1QsU0FBQSxHQUFXOztzQ0FDWCxTQUFBLEdBQVc7O3NDQUNYLGNBQUEsR0FBZ0IsU0FBQTtXQUNkLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLFNBQUMsSUFBRDthQUNiLElBQUksQ0FBQyxZQUFMLENBQUE7SUFEYSxDQUFmO0VBRGM7O3NDQUloQixxQkFBQSxHQUF1QixTQUFDLEtBQUQsRUFBUSxLQUFSO0lBRXJCLElBQUMsQ0FBQSxjQUFELENBQUE7SUFDQSxLQUFLLENBQUMsVUFBTixDQUFBO1dBRUEsSUFBQyxDQUFBLG9CQUFELENBQXNCLEtBQXRCLEVBQTZCLEtBQTdCO0VBTHFCOztzQ0FPdkIsbUJBQUEsR0FBcUIsU0FBQyxLQUFELEVBQVEsS0FBUjtBQUNuQixRQUFBO0lBQUEsTUFBQSxHQUFTLEtBQUssQ0FBQztJQUNmLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosRUFBa0MsTUFBbEM7SUFFQSxJQUFBLEdBQU8sQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxNQUFmO1dBQ1AsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFqQixDQUF5QixJQUF6QjtFQUxtQjs7c0NBT3JCLG9CQUFBLEdBQXNCLFNBQUMsS0FBRCxFQUFRLEtBQVI7QUFDcEIsUUFBQTtJQUFBLE1BQUEsR0FBUyxLQUFLLENBQUM7SUFFZixJQUFBLEdBQU8sQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxNQUFmO0lBQ1AsSUFBRyxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBZ0IsQ0FBQSxDQUFBLENBQWhCLEtBQXNCLEVBQXpCO2FBQ0UsTUFBTSxDQUFDLFFBQVAsR0FBa0IsS0FEcEI7S0FBQSxNQUFBO01BR0UsQ0FBQSxHQUFJLElBQUksUUFBUSxDQUFDO2FBQ2pCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBWCxFQUFpQjtRQUFBLE9BQUEsRUFBUyxJQUFUO09BQWpCLEVBSkY7O0VBSm9COzs7O0dBdEJnQixVQUFVLENBQUM7O0FBaUM3Qzs7Ozs7Ozs4QkFDSixPQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0saUJBQU47SUFDQSxRQUFBLEVBQVUsWUFEVjtJQUVBLE1BQUEsRUFBUSx3QkFGUjs7OzhCQUdGLFFBQUEsR0FBVSxTQUFBO0FBQ1IsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFJLHlCQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7S0FESztXQUVQLElBQUMsQ0FBQSxhQUFELENBQWUsTUFBZixFQUF1QixJQUF2QjtFQUhROzs4QkFJVixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxnREFBUCxFQUF5RCxTQUFBO01BQ3ZELEVBQUUsQ0FBQyxHQUFILENBQU8saUJBQVA7TUFDQSxFQUFFLENBQUMsRUFBSCxDQUFNLHdDQUFOO2FBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyx3QkFBUDtJQUh1RCxDQUF6RDtFQURzQixDQUFkOzs4QkFLVixjQUFBLEdBQWdCLFNBQUE7QUFDZCxRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxZQUFELENBQWMsTUFBZDtXQUNQLElBQUksQ0FBQyxjQUFMLENBQUE7RUFGYzs7OztHQWRjLFVBQVUsQ0FBQzs7QUFtQnJDOzs7Ozs7OzZCQUNKLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsS0FBRDtJQUN0QixzQkFBQSxDQUF1QixzQkFBdkI7V0FDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLGVBQUwsRUFBc0I7TUFBQSxJQUFBLEVBQUssS0FBSyxDQUFDLEdBQVg7S0FBdEIsRUFBc0MsS0FBSyxDQUFDLEtBQTVDO0VBRnNCLENBQWQ7OzZCQUdWLEVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxlQUFQOzs7NkJBQ0YsUUFBQSxHQUNFO0lBQUEsaUJBQUEsRUFBbUIsYUFBbkI7Ozs7O0dBUDJCLFVBQVUsQ0FBQzs7QUFVcEM7Ozs7Ozs7Z0NBQ0osUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sc0RBQVAsRUFDQTtNQUFBLEtBQUEsRUFBTSw4QkFBTjtNQUFzQyxVQUFBLEVBQVcsSUFBakQ7TUFDQSxJQUFBLEVBQUssWUFETDtLQURBLEVBRW1CLFNBQUE7YUFDakIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxZQUFQLEVBQXFCLFNBQUE7UUFDbkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxnQkFBUDtlQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8saUJBQVA7TUFGbUIsQ0FBckI7SUFEaUIsQ0FGbkI7RUFEc0IsQ0FBZDs7Z0NBT1YsT0FBQSxHQUNFO0lBQUEsTUFBQSxFQUFRLGdCQUFSO0lBQ0EsUUFBQSxFQUFVLFlBRFY7SUFFQSxRQUFBLEVBQVUsWUFGVjtJQUdBLE9BQUEsRUFBUyxpQkFIVDs7O2dDQUlGLFFBQUEsR0FBVSxTQUFBO0FBQ1IsUUFBQTtJQUFBLEtBQUEsR0FBUSxJQUFJLGlCQUFKLENBQ047TUFBQSxVQUFBLEVBQVksSUFBSSxRQUFRLENBQUMsVUFBYixDQUF3QixJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxlQUFYLENBQXhCLENBQVo7S0FETTtJQUVSLElBQUMsQ0FBQSxhQUFELENBQWUsU0FBZixFQUEwQixLQUExQjtJQUNBLEtBQUEsR0FBUSxJQUFJLGdCQUFKLENBQ047TUFBQSxLQUFBLEVBQU8sSUFBSSxRQUFRLENBQUMsS0FBYixDQUFtQixJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxPQUFYLENBQW5CLENBQVA7S0FETTtXQUVSLElBQUMsQ0FBQSxhQUFELENBQWUsUUFBZixFQUF5QixLQUF6QjtFQU5ROztnQ0FRVixxQkFBQSxHQUF1QixTQUFDLElBQUQ7QUFDckIsUUFBQTtJQUFBLEtBQUEsR0FBUSxJQUFDLENBQUEsWUFBRCxDQUFjLFNBQWQ7V0FDUixLQUFLLENBQUMsY0FBTixDQUFBO0VBRnFCOzs7O0dBckJTLFVBQVUsQ0FBQzs7QUF5QnZDOzs7Ozs7O3NCQUNKLGFBQUEsR0FBZSxTQUFBO0FBQ2IsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFuQixDQUFBLENBQTRCLENBQUMsU0FBN0IsQ0FBdUMsUUFBdkM7V0FDVCxJQUFDLENBQUEsU0FBRCxDQUFXLE1BQVg7RUFGYTs7c0JBSWYsT0FBQSxHQUFTLFNBQUE7V0FFUCxJQUFDLENBQUEsUUFBRCxDQUFBO0VBRk87O3NCQUlULFFBQUEsR0FBVSxTQUFBO0FBQ1IsUUFBQTtJQUFBLFNBQUEsR0FBWSxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDdkMsTUFBQSxHQUFTLElBQUksbUJBQUosQ0FDUDtNQUFBLEtBQUEsRUFBTyxJQUFJLFFBQVEsQ0FBQyxLQUFiLENBQW1CLFNBQW5CLENBQVA7S0FETztXQUVULElBQUMsQ0FBQSxRQUFELENBQVUsTUFBVjtFQUpROzs7O0dBVFksT0FBTyxDQUFDOztBQWVoQyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiQgPSByZXF1aXJlICdqcXVlcnknXG5CYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5Ub29sa2l0ID0gcmVxdWlyZSAnbWFyaW9uZXR0ZS50b29sa2l0J1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuY2xhc3MgTmF2YmFyRW50cnkgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBkZWZhdWx0czpcbiAgICBsYWJlbDogJ0FwcCBMYWJlbCdcbiAgICB1cmw6ICcjYXBwJ1xuICAgIHNpbmdsZV9hcHBsZXQ6IGZhbHNlXG4gICAgYXBwbGV0czogW11cbiAgICB1cmxzOiBbXVxuICAgIFxuY2xhc3MgTmF2YmFyRW50cnlDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogTmF2YmFyRW50cnlcblxubmF2YmFyX2VudHJ5X2NvbGxlY3Rpb24gPSBuZXcgTmF2YmFyRW50cnlDb2xsZWN0aW9uXG5NYWluQ2hhbm5lbC5yZXBseSAnbmF2YmFyLWVudHJpZXMnLCAtPlxuICBuYXZiYXJfZW50cnlfY29sbGVjdGlvblxuXG5NYWluQ2hhbm5lbC5yZXBseSAnbmV3LW5hdmJhci1lbnRyeScsIC0+XG4gIG5ldyBOYXZiYXJFbnRyeVxuXG5NYWluQ2hhbm5lbC5yZXBseSAnYWRkLW5hdmJhci1lbnRyeScsIChhdHRzKSAtPlxuICBuYXZiYXJfZW50cnlfY29sbGVjdGlvbi5hZGQgYXR0c1xuICBcbk1haW5DaGFubmVsLnJlcGx5ICdhZGQtbmF2YmFyLWVudHJpZXMnLCAob2xpc3QpIC0+XG4gIG5hdmJhcl9lbnRyeV9jb2xsZWN0aW9uLmFkZCBvbGlzdFxuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyB3ZSBtYXkgcmVtb3ZlIHRoZSBjaGFubmVsIHN0dWZmIGxhdGVyLCBvciB1c2UgaXRcbiMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4gIFxubmF2YmFyX2NvbGxhcHNlX2J1dHRvbiAgPSB0Yy5yZW5kZXJhYmxlICh0YXJnZXQpIC0+XG4gIHRjLmJ1dHRvbiAnLm5hdmJhci10b2dnbGUnLCB0eXBlOididXR0b24nLCAnZGF0YS10b2dnbGUnOidjb2xsYXBzZScsXG4gICdkYXRhLXRhcmdldCc6IFwiIyN7dGFyZ2V0fVwiLCAtPlxuICAgICAgdGMuc3BhbiAnLnNyLW9ubHknLCAnVG9nZ2xlIE5hdmlnYXRpb24nXG4gICAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG4gICAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG4gICAgICB0Yy5zcGFuICcuaWNvbi1iYXInXG5cbmRyb3Bkb3duX3RvZ2dsZSA9IHRjLmNvbXBvbmVudCAoc2VsZWN0b3IsIGF0dHJzLCByZW5kZXJDb250ZW50cykgLT5cbiAgdGMuYSBcIiN7c2VsZWN0b3J9LmRyb3Bkb3duLXRvZ2dsZVwiLCBocmVmOmF0dHJzLmhyZWYsXG4gICdkYXRhLXRvZ2dsZSc6J2Ryb3Bkb3duJywgcmVuZGVyQ29udGVudHNcblxubmF2X3B0X2NvbnRlbnQgPSB0Yy5yZW5kZXJhYmxlIChhcHBtb2RlbCkgLT5cbiAgdGMuZGl2IFwiLiN7YXBwbW9kZWwuY29udGFpbmVyIG9yICdjb250YWluZXInfVwiLCAtPlxuICAgIHRjLmRpdiAnLm5hdmJhci1oZWFkZXInLCAtPlxuICAgICAgbmF2YmFyX2NvbGxhcHNlX2J1dHRvbiAnbmF2YmFyLXZpZXctY29sbGFwc2UnXG4gICAgICB0Yy5hICcubmF2YmFyLWJyYW5kJywgaHJlZjonIycsICdUS1Rlc3QnXG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgIHRjLnVsICcubmF2Lm5hdmJhci1uYXYubmF2LXBpbGxzJywgLT5cbiAgICAgICAgI2ZvciBhcHBsZXQgaW4gYXBwbW9kZWwuYXBwbGV0c1xuICAgICAgICAjICB0Yy5saSBhcHBuYW1lOmFwcGxldC5hcHBuYW1lLCAtPlxuICAgICAgICAjICAgIHRjLmEgaHJlZjphcHBsZXQudXJsLCBhcHBsZXQubmFtZVxuICAgICAgdGMudWwgJyN1c2VyLW1lbnUubmF2Lm5hdmJhci1uYXYubmF2YmFyLXJpZ2h0J1xuICAgICAgdGMuZGl2ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuXG5uYXZfcHQgPSB0Yy5yZW5kZXJhYmxlIChhcHBtb2RlbCkgLT5cbiAgdGMubmF2ICcjbmF2YmFyLXZpZXcubmF2YmFyLm5hdmJhci1zdGF0aWMtdG9wLm5hdmJhci1kZWZhdWx0JyxcbiAgeG1sbnM6J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLCAneG1sOmxhbmcnOidlbicsXG4gIHJvbGU6J25hdmlnYXRpb24nLCAtPlxuICAgIHRjLmRpdiAnLmNvbnRhaW5lcicsIC0+XG4gICAgICB0Yy5kaXYgJy5uYXZiYXItaGVhZGVyJywgLT5cbiAgICAgICAgbmF2YmFyX2NvbGxhcHNlX2J1dHRvbiAnbmF2YmFyLXZpZXctY29sbGFwc2UnXG4gICAgICAgIHRjLmEgJy5uYXZiYXItYnJhbmQnLCBocmVmOicjJywgJ1RrVGVzdCdcbiAgICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbGxhcHNlLmNvbGxhcHNlLm5hdmJhci1jb2xsYXBzZSdcblxuZHJvcGRvd25fZW50cnkgPSB0Yy5yZW5kZXJhYmxlIChlbnRyeSkgLT5cbiAgdGMuYSAnLmRyb3Bkb3duLXRvZ2dsZScsIHJvbGU6J2J1dHRvbicsICdkYXRhLXRvZ2dsZSc6J2Ryb3Bkb3duJywgLT5cbiAgICB0Yy50ZXh0IGVudHJ5LmxhYmVsXG4gICAgdGMuYiAnLmNhcmV0J1xuICB0Yy51bCAnLmRyb3Bkb3duLW1lbnUnLCAtPlxuICAgIGZvciBsaW5rIGluIGVudHJ5Lm1lbnVcbiAgICAgIHRjLmxpIC0+XG4gICAgICAgIHRjLmEgJy5uYXZiYXItZW50cnknLCBocmVmOmxpbmsudXJsLCBsaW5rLmxhYmVsXG5cbnNpbmdsZV9lbnRyeSA9IHRjLnJlbmRlcmFibGUgKGVudHJ5KSAtPlxuICB0Yy5hICcubmF2YmFyLWVudHJ5JywgaHJlZjplbnRyeS51cmwsIGVudHJ5LmxhYmVsXG4gICAgICBcbmNsYXNzIE5hdmJhckVudHJ5VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICBtb2RlbDogTmF2YmFyRW50cnlcbiAgdGFnTmFtZTogJ2xpJ1xuICBjbGFzc05hbWU6IC0+XG4gICAgaWYgQG1vZGVsLmhhcyAnbWVudScgdGhlbiAnZHJvcGRvd24nIGVsc2UgdW5kZWZpbmVkXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpZiBtb2RlbD8ubWVudVxuICAgICAgZHJvcGRvd25fZW50cnkgbW9kZWxcbiAgICBlbHNlXG4gICAgICBzaW5nbGVfZW50cnkgbW9kZWxcbiAgdWk6XG4gICAgZW50cnk6ICcubmF2YmFyLWVudHJ5J1xuICB0cmlnZ2VyczpcbiAgICAnY2xpY2sgQHVpLmVudHJ5JzogJ2NsaWNrOmVudHJ5J1xuICBzZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgdW5zZXRfYWN0aXZlOiAtPlxuICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICAjIEZJWE1FIHRyaWdnZXJpbmcgY2xpY2s6ZW50cnlcbiAgICAjIHNlZW1zIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW5cbiAgICAjIHRoaXMgY2xvc2VzIHRoZSBuYXZiYXIgbWVudVxuICAgIEAkZWwucmVtb3ZlQ2xhc3MgJ29wZW4nXG4gICAgXG4gICAgXG5jbGFzcyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ25hdiBuYXZiYXItbmF2IG5hdi1waWxscydcbiAgY2hpbGRWaWV3OiBOYXZiYXJFbnRyeVZpZXdcbiAgc2V0QWxsSW5hY3RpdmU6IC0+XG4gICAgQGNoaWxkcmVuLmVhY2ggKHZpZXcpIC0+XG4gICAgICB2aWV3LnVuc2V0X2FjdGl2ZSgpXG4gICAgICBcbiAgb25DaGlsZHZpZXdDbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgICNjb25zb2xlLmxvZyBcIkhFUkUgSVMgTU9SRSBTVFVGRlwiLCBldmVudFxuICAgIEBzZXRBbGxJbmFjdGl2ZSgpXG4gICAgY3ZpZXcuc2V0X2FjdGl2ZSgpXG4gICAgI0Bsb2FkVXJsT25DbGlja0VudHJ5IGN2aWV3LCBldmVudFxuICAgIEBuYXZpZ2F0ZU9uQ2xpY2tFbnRyeSBjdmlldywgZXZlbnRcbiAgICBcbiAgbG9hZFVybE9uQ2xpY2tFbnRyeTogKGN2aWV3LCBldmVudCkgLT5cbiAgICB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgICBjb25zb2xlLmxvZyBcIkhlcmUgaXMgdGhlIHRhcmdldFwiLCB0YXJnZXRcbiAgICAjIGxvb2sgYXQgaHJlZiBhbmQgZ28gdGhlcmUgbWF5YmU/XG4gICAgaHJlZiA9ICQodGFyZ2V0KS5hdHRyICdocmVmJ1xuICAgIEJhY2tib25lLmhpc3RvcnkubG9hZFVybCBocmVmXG4gICAgXG4gIG5hdmlnYXRlT25DbGlja0VudHJ5OiAoY3ZpZXcsIGV2ZW50KSAtPlxuICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldFxuICAgICMgbG9vayBhdCBocmVmIGFuZCBnbyB0aGVyZSBtYXliZT9cbiAgICBocmVmID0gJCh0YXJnZXQpLmF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZi5zcGxpdCgnLycpWzBdID09ICcnXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmXG4gICAgZWxzZVxuICAgICAgciA9IG5ldyBCYWNrYm9uZS5Sb3V0ZXJcbiAgICAgIHIubmF2aWdhdGUgaHJlZiwgdHJpZ2dlcjogdHJ1ZVxuICAgICAgXG5cbmNsYXNzIE5hdmJhckVudHJpZXNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHJlZ2lvbnM6XG4gICAgbGlzdDogJyNuYXZiYXItZW50cmllcydcbiAgICB1c2VyTWVudTogJyN1c2VyLW1lbnUnXG4gICAgc2VhcmNoOiAnI2Zvcm0tc2VhcmNoLWNvbnRhaW5lcidcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBOYXZiYXJFbnRyeUNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIEBzaG93Q2hpbGRWaWV3ICdsaXN0Jywgdmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29sbGFwc2UuY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlJywgLT5cbiAgICAgIHRjLmRpdiAnI25hdmJhci1lbnRyaWVzJ1xuICAgICAgdGMudWwgJyN1c2VyLW1lbnUubmF2Lm5hdmJhci1uYXYubmF2YmFyLXJpZ2h0J1xuICAgICAgdGMuZGl2ICcjZm9ybS1zZWFyY2gtY29udGFpbmVyJ1xuICBzZXRBbGxJbmFjdGl2ZTogLT5cbiAgICB2aWV3ID0gQGdldENoaWxkVmlldyAnbGlzdCdcbiAgICB2aWV3LnNldEFsbEluYWN0aXZlKClcbiAgICBcbiAgICBcbmNsYXNzIE5hdmJhckhlYWRlclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIG5hdmJhcl9jb2xsYXBzZV9idXR0b24gJ25hdmJhci12aWV3LWNvbGxhcHNlJ1xuICAgIHRjLmEgJy5uYXZiYXItYnJhbmQnLCBocmVmOm1vZGVsLnVybCwgbW9kZWwubGFiZWxcbiAgdWk6XG4gICAgYnJhbmQ6ICcubmF2YmFyLWJyYW5kJ1xuICB0cmlnZ2VyczpcbiAgICAnY2xpY2sgQHVpLmJyYW5kJzogJ2NsaWNrOmJyYW5kJ1xuICAgIFxuICAgIFxuY2xhc3MgQm9vdHN0cmFwTmF2QmFyVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMubmF2ICcjbmF2YmFyLXZpZXcubmF2YmFyLm5hdmJhci1zdGF0aWMtdG9wLm5hdmJhci1kZWZhdWx0JyxcbiAgICB4bWxuczonaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsICd4bWw6bGFuZyc6J2VuJyxcbiAgICByb2xlOiduYXZpZ2F0aW9uJywgLT5cbiAgICAgIHRjLmRpdiAnLmNvbnRhaW5lcicsIC0+XG4gICAgICAgIHRjLmRpdiAnLm5hdmJhci1oZWFkZXInXG4gICAgICAgIHRjLmRpdiAnI25hdmJhci1lbnRyaWVzJ1xuICByZWdpb25zOlxuICAgIGhlYWRlcjogJy5uYXZiYXItaGVhZGVyJ1xuICAgIHVzZXJtZW51OiAnI3VzZXItbWVudSdcbiAgICBtYWlubWVudTogJyNtYWluLW1lbnUnXG4gICAgZW50cmllczogJyNuYXZiYXItZW50cmllcydcbiAgb25SZW5kZXI6IC0+XG4gICAgZXZpZXcgPSBuZXcgTmF2YmFyRW50cmllc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IG5ldyBCYWNrYm9uZS5Db2xsZWN0aW9uIEBtb2RlbC5nZXQgJ25hdmJhckVudHJpZXMnXG4gICAgQHNob3dDaGlsZFZpZXcgJ2VudHJpZXMnLCBldmlld1xuICAgIGh2aWV3ID0gbmV3IE5hdmJhckhlYWRlclZpZXdcbiAgICAgIG1vZGVsOiBuZXcgQmFja2JvbmUuTW9kZWwgQG1vZGVsLmdldCAnYnJhbmQnXG4gICAgQHNob3dDaGlsZFZpZXcgJ2hlYWRlcicsIGh2aWV3XG4gICAgXG4gIG9uQ2hpbGR2aWV3Q2xpY2tCcmFuZDogKHZpZXcpIC0+XG4gICAgZXZpZXcgPSBAZ2V0Q2hpbGRWaWV3ICdlbnRyaWVzJ1xuICAgIGV2aWV3LnNldEFsbEluYWN0aXZlKClcblxuY2xhc3MgTmF2YmFyQXBwIGV4dGVuZHMgVG9vbGtpdC5BcHBcbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICByZWdpb24gPSBAb3B0aW9ucy5wYXJlbnRBcHAuZ2V0VmlldygpLmdldFJlZ2lvbiAnbmF2YmFyJ1xuICAgIEBzZXRSZWdpb24gcmVnaW9uXG5cbiAgb25TdGFydDogLT5cbiAgICAjIGJ1aWxkIG1haW4gcGFnZSBsYXlvdXRcbiAgICBAaW5pdFBhZ2UoKVxuXG4gIGluaXRQYWdlOiAtPlxuICAgIGFwcENvbmZpZyA9IEBvcHRpb25zLnBhcmVudEFwcC5vcHRpb25zLmFwcENvbmZpZ1xuICAgIGxheW91dCA9IG5ldyBCb290c3RyYXBOYXZCYXJWaWV3XG4gICAgICBtb2RlbDogbmV3IEJhY2tib25lLk1vZGVsIGFwcENvbmZpZ1xuICAgIEBzaG93VmlldyBsYXlvdXRcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZiYXJBcHBcblxuXG4iXX0=
