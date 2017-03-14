var Backbone, MainChannel, Marionette, MessagesApp, NavbarApp, Toolkit, TopApp, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

MessagesApp = require('./messages');

NavbarApp = require('./navbar');

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
    require('../applets/frontdoor/main');
    require('../applets/bumblr/main');
    require('../applets/hubby/main');
    this.initPage();
    if (this.getState('startHistory')) {
      ['frontdoor', 'bumblr', 'hubby'].forEach(function(applet) {
        return MainChannel.request("applet:" + applet + ":route");
      });
      if (!Backbone.history.started) {
        return Backbone.history.start();
      }
    }
  };

  return TopApp;

})(Toolkit.App);

module.exports = TopApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cmllcy9vbGR0b3AuanMiLCJzb3VyY2VzIjpbImVudHJpZXMvb2xkdG9wLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDhFQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLE9BQUEsR0FBVSxPQUFBLENBQVEsb0JBQVI7O0FBQ1YsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLFdBQUEsR0FBYyxPQUFBLENBQVEsWUFBUjs7QUFDZCxTQUFBLEdBQVksT0FBQSxDQUFRLFVBQVI7O0FBRVosV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDUjs7Ozs7OzttQkFDSixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxTQUFBLEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUVyQixJQUFDLENBQUEsU0FBRCxDQUFXLElBQUksVUFBVSxDQUFDLE1BQWYsQ0FBc0I7TUFBQSxFQUFBLEVBQUksU0FBUyxDQUFDLFNBQWQ7S0FBdEIsQ0FBWDtJQUNBLElBQUcsU0FBUyxDQUFDLFdBQWI7TUFDRSxXQUFBLEdBQWMsSUFBQyxDQUFBLFdBQUQsQ0FBYSxVQUFiLEVBQ1o7UUFBQSxRQUFBLEVBQVUsV0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFHQSxTQUFBLEVBQVcsSUFIWDtPQURZLEVBRGhCOztJQU1BLElBQUcsU0FBUyxDQUFDLFNBQWI7YUFDRSxTQUFBLEdBQVksSUFBQyxDQUFBLFdBQUQsQ0FBYSxRQUFiLEVBQ1Y7UUFBQSxRQUFBLEVBQVUsU0FBVjtRQUNBLGVBQUEsRUFBaUIsSUFEakI7UUFHQSxTQUFBLEVBQVcsSUFIWDtPQURVLEVBRGQ7O0VBVmE7O21CQWlCZixRQUFBLEdBQVUsU0FBQTtBQUNSLFFBQUE7SUFBQSxTQUFBLEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNyQixTQUFBLEdBQVksU0FBUyxDQUFDO0lBQ3RCLFVBQUEsR0FBYSxTQUFTLENBQUM7SUFDdkIsTUFBQSxHQUFTLElBQUksU0FBSixDQUFjLFNBQVMsQ0FBQyxhQUF4QjtXQUNULElBQUMsQ0FBQSxRQUFELENBQVUsTUFBVjtFQUxROzttQkFPVixPQUFBLEdBQVMsU0FBQTtJQUNQLE9BQUEsQ0FBUSwyQkFBUjtJQUNBLE9BQUEsQ0FBUSx3QkFBUjtJQUNBLE9BQUEsQ0FBUSx1QkFBUjtJQUVBLElBQUMsQ0FBQSxRQUFELENBQUE7SUFDQSxJQUFHLElBQUMsQ0FBQSxRQUFELENBQVUsY0FBVixDQUFIO01BRUUsQ0FBQyxXQUFELEVBQWMsUUFBZCxFQUF3QixPQUF4QixDQUFnQyxDQUFDLE9BQWpDLENBQXlDLFNBQUMsTUFBRDtlQUN2QyxXQUFXLENBQUMsT0FBWixDQUFvQixTQUFBLEdBQVUsTUFBVixHQUFpQixRQUFyQztNQUR1QyxDQUF6QztNQUVBLElBQUEsQ0FBZ0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFqRDtlQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBakIsQ0FBQSxFQUFBO09BSkY7O0VBTk87Ozs7R0F6QlUsT0FBTyxDQUFDOztBQXFDN0IsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5Ub29sa2l0ID0gcmVxdWlyZSAnbWFyaW9uZXR0ZS50b29sa2l0J1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbk1lc3NhZ2VzQXBwID0gcmVxdWlyZSAnLi9tZXNzYWdlcydcbk5hdmJhckFwcCA9IHJlcXVpcmUgJy4vbmF2YmFyJ1xuICBcbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuY2xhc3MgVG9wQXBwIGV4dGVuZHMgVG9vbGtpdC5BcHBcbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBhcHBDb25maWcgPSBAb3B0aW9ucy5hcHBDb25maWdcbiAgICAjIEZJWE1FIC0gdGVzdCBmb3IgcmVnaW9uIGNsYXNzXG4gICAgQHNldFJlZ2lvbiBuZXcgTWFyaW9uZXR0ZS5SZWdpb24gZWw6IGFwcENvbmZpZy5hcHBSZWdpb25cbiAgICBpZiBhcHBDb25maWcudXNlTWVzc2FnZXNcbiAgICAgIG1lc3NhZ2VzQXBwID0gQGFkZENoaWxkQXBwICdtZXNzYWdlcycsXG4gICAgICAgIEFwcENsYXNzOiBNZXNzYWdlc0FwcFxuICAgICAgICBzdGFydFdpdGhQYXJlbnQ6IHRydWVcbiAgICAgICAgLFxuICAgICAgICBwYXJlbnRBcHA6IEBcbiAgICBpZiBhcHBDb25maWcudXNlTmF2YmFyXG4gICAgICBuYXZiYXJBcHAgPSBAYWRkQ2hpbGRBcHAgJ25hdmJhcicsXG4gICAgICAgIEFwcENsYXNzOiBOYXZiYXJBcHBcbiAgICAgICAgc3RhcnRXaXRoUGFyZW50OiB0cnVlXG4gICAgICAgICxcbiAgICAgICAgcGFyZW50QXBwOiBAXG4gICAgICAgIFxuICBpbml0UGFnZTogLT5cbiAgICBhcHBDb25maWcgPSBAb3B0aW9ucy5hcHBDb25maWdcbiAgICBBcHBMYXlvdXQgPSBhcHBDb25maWcubGF5b3V0XG4gICAgbGF5b3V0T3B0cyA9IGFwcENvbmZpZy5sYXlvdXRPcHRpb25zXG4gICAgbGF5b3V0ID0gbmV3IEFwcExheW91dCBhcHBDb25maWcubGF5b3V0T3B0aW9uc1xuICAgIEBzaG93VmlldyBsYXlvdXQgICAgXG5cbiAgb25TdGFydDogLT5cbiAgICByZXF1aXJlICcuLi9hcHBsZXRzL2Zyb250ZG9vci9tYWluJ1xuICAgIHJlcXVpcmUgJy4uL2FwcGxldHMvYnVtYmxyL21haW4nXG4gICAgcmVxdWlyZSAnLi4vYXBwbGV0cy9odWJieS9tYWluJ1xuICAgICMgYnVpbGQgbWFpbiBwYWdlIGxheW91dFxuICAgIEBpbml0UGFnZSgpXG4gICAgaWYgQGdldFN0YXRlICdzdGFydEhpc3RvcnknXG4gICAgICAjIHJlZ2lzdGVyIHJvdXRlc1xuICAgICAgWydmcm9udGRvb3InLCAnYnVtYmxyJywgJ2h1YmJ5J10uZm9yRWFjaCAoYXBwbGV0KSAtPlxuICAgICAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0IFwiYXBwbGV0OiN7YXBwbGV0fTpyb3V0ZVwiXG4gICAgICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KCkgdW5sZXNzIEJhY2tib25lLmhpc3Rvcnkuc3RhcnRlZFxuICAgICAgXG5tb2R1bGUuZXhwb3J0cyA9IFRvcEFwcFxuXG5cbiJdfQ==
