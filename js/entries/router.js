var BootStrapAppRouter, MainChannel, MainRouter, Marionette, RequireController, Router,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Marionette = require('backbone.marionette');

BootStrapAppRouter = require('agate/src/bootstrap_router');

MainChannel = Backbone.Radio.channel('global');

MainRouter = (function(superClass) {
  extend(MainRouter, superClass);

  function MainRouter() {
    return MainRouter.__super__.constructor.apply(this, arguments);
  }

  null;

  return MainRouter;

})(Backbone.Router);

RequireController = (function(superClass) {
  extend(RequireController, superClass);

  function RequireController() {
    return RequireController.__super__.constructor.apply(this, arguments);
  }

  RequireController.prototype._route_applet = function(applet) {
    return MainChannel.request("applet:" + applet + ":route");
  };

  RequireController.prototype._handle_route = function(applet, suffix) {
    var chunk, config, handler;
    console.log("_handle_route", applet, suffix);
    config = MainChannel.request('main:app:config');
    if (!applet) {
      applet = 'frontdoor';
    }
    if (indexOf.call(Object.keys(config.appletRoutes), applet) >= 0) {
      applet = config.appletRoutes[applet];
      console.log("Using defined appletRoute", applet);
    }
    chunk = "applet-main-chunk-" + applet;
    handler = System["import"]("../applets/" + applet + "/main");
    console.log("system.import", applet);
    return handler.then((function(_this) {
      return function() {
        MainChannel.request("applet:" + applet + ":route");
        return Backbone.history.loadUrl();
      };
    })(this));
  };

  RequireController.prototype.routeApplet = function(applet, href) {
    return this._handle_route(applet, href);
  };

  RequireController.prototype.frontdoor = function() {
    return this._handle_route('frontdoor');
  };

  return RequireController;

})(Marionette.Object);

Router = (function(superClass) {
  extend(Router, superClass);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.appRoutes = {
    '': 'frontdoor',
    ':applet/*': 'routeApplet'
  };

  Router.prototype.onRoute = function(name, path, args) {
    return console.log("MainRouter.onRoute", name, path, args);
  };

  return Router;

})(Marionette.AppRouter);

MainChannel.reply('app:main:route', function() {
  var controller, router;
  controller = new RequireController;
  router = new Router({
    controller: controller
  });
  MainChannel.reply('main-controller', function() {
    return controller;
  });
  return MainChannel.reply('main-router', function() {
    return router;
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cmllcy9yb3V0ZXIuanMiLCJzb3VyY2VzIjpbImVudHJpZXMvcm91dGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGtGQUFBO0VBQUE7Ozs7QUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSw0QkFBUjs7QUFFckIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFUjs7Ozs7OztFQUNKOzs7O0dBRHVCLFFBQVEsQ0FBQzs7QUFJNUI7Ozs7Ozs7OEJBQ0osYUFBQSxHQUFlLFNBQUMsTUFBRDtXQUNiLFdBQVcsQ0FBQyxPQUFaLENBQW9CLFNBQUEsR0FBVSxNQUFWLEdBQWlCLFFBQXJDO0VBRGE7OzhCQUdmLGFBQUEsR0FBZSxTQUFDLE1BQUQsRUFBUyxNQUFUO0FBQ2IsUUFBQTtJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWixFQUE2QixNQUE3QixFQUFxQyxNQUFyQztJQUNBLE1BQUEsR0FBUyxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7SUFDVCxJQUFHLENBQUksTUFBUDtNQUNFLE1BQUEsR0FBUyxZQURYOztJQUVBLElBQUcsYUFBVSxNQUFNLENBQUMsSUFBUCxDQUFZLE1BQU0sQ0FBQyxZQUFuQixDQUFWLEVBQUEsTUFBQSxNQUFIO01BQ0UsTUFBQSxHQUFTLE1BQU0sQ0FBQyxZQUFhLENBQUEsTUFBQTtNQUM3QixPQUFPLENBQUMsR0FBUixDQUFZLDJCQUFaLEVBQXlDLE1BQXpDLEVBRkY7O0lBR0EsS0FBQSxHQUFRLG9CQUFBLEdBQXFCO0lBQzdCLE9BQUEsR0FBVSxNQUFNLEVBQUMsTUFBRCxFQUFOLENBQWMsYUFBQSxHQUFjLE1BQWQsR0FBcUIsT0FBbkM7SUFDVixPQUFPLENBQUMsR0FBUixDQUFZLGVBQVosRUFBNkIsTUFBN0I7V0FDQSxPQUFPLENBQUMsSUFBUixDQUFhLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNYLFdBQVcsQ0FBQyxPQUFaLENBQW9CLFNBQUEsR0FBVSxNQUFWLEdBQWlCLFFBQXJDO2VBQ0EsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFqQixDQUFBO01BRlc7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWI7RUFYYTs7OEJBZWYsV0FBQSxHQUFhLFNBQUMsTUFBRCxFQUFTLElBQVQ7V0FDWCxJQUFDLENBQUEsYUFBRCxDQUFlLE1BQWYsRUFBdUIsSUFBdkI7RUFEVzs7OEJBR2IsU0FBQSxHQUFXLFNBQUE7V0FDVCxJQUFDLENBQUEsYUFBRCxDQUFlLFdBQWY7RUFEUzs7OztHQXRCbUIsVUFBVSxDQUFDOztBQXlCckM7Ozs7Ozs7bUJBQ0osU0FBQSxHQUNFO0lBQUEsRUFBQSxFQUFJLFdBQUo7SUFDQSxXQUFBLEVBQWEsYUFEYjs7O21CQUdGLE9BQUEsR0FBUyxTQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYjtXQUNQLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosRUFBa0MsSUFBbEMsRUFBd0MsSUFBeEMsRUFBOEMsSUFBOUM7RUFETzs7OztHQUxVLFVBQVUsQ0FBQzs7QUFRaEMsV0FBVyxDQUFDLEtBQVosQ0FBa0IsZ0JBQWxCLEVBQW9DLFNBQUE7QUFDbEMsTUFBQTtFQUFBLFVBQUEsR0FBYSxJQUFJO0VBQ2pCLE1BQUEsR0FBUyxJQUFJLE1BQUosQ0FDUDtJQUFBLFVBQUEsRUFBWSxVQUFaO0dBRE87RUFFVCxXQUFXLENBQUMsS0FBWixDQUFrQixpQkFBbEIsRUFBcUMsU0FBQTtXQUNuQztFQURtQyxDQUFyQztTQUVBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGFBQWxCLEVBQWlDLFNBQUE7V0FDL0I7RUFEK0IsQ0FBakM7QUFOa0MsQ0FBcEMiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuQm9vdFN0cmFwQXBwUm91dGVyID0gcmVxdWlyZSAnYWdhdGUvc3JjL2Jvb3RzdHJhcF9yb3V0ZXInXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBNYWluUm91dGVyIGV4dGVuZHMgQmFja2JvbmUuUm91dGVyXG4gIG51bGxcbiAgXG5cbmNsYXNzIFJlcXVpcmVDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5PYmplY3RcbiAgX3JvdXRlX2FwcGxldDogKGFwcGxldCkgLT5cbiAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0IFwiYXBwbGV0OiN7YXBwbGV0fTpyb3V0ZVwiXG5cbiAgX2hhbmRsZV9yb3V0ZTogKGFwcGxldCwgc3VmZml4KSAtPlxuICAgIGNvbnNvbGUubG9nIFwiX2hhbmRsZV9yb3V0ZVwiLCBhcHBsZXQsIHN1ZmZpeFxuICAgIGNvbmZpZyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmNvbmZpZydcbiAgICBpZiBub3QgYXBwbGV0XG4gICAgICBhcHBsZXQgPSAnZnJvbnRkb29yJ1xuICAgIGlmIGFwcGxldCBpbiBPYmplY3Qua2V5cyBjb25maWcuYXBwbGV0Um91dGVzXG4gICAgICBhcHBsZXQgPSBjb25maWcuYXBwbGV0Um91dGVzW2FwcGxldF1cbiAgICAgIGNvbnNvbGUubG9nIFwiVXNpbmcgZGVmaW5lZCBhcHBsZXRSb3V0ZVwiLCBhcHBsZXRcbiAgICBjaHVuayA9IFwiYXBwbGV0LW1haW4tY2h1bmstI3thcHBsZXR9XCJcbiAgICBoYW5kbGVyID0gU3lzdGVtLmltcG9ydCBcIi4uL2FwcGxldHMvI3thcHBsZXR9L21haW5cIlxuICAgIGNvbnNvbGUubG9nIFwic3lzdGVtLmltcG9ydFwiLCBhcHBsZXRcbiAgICBoYW5kbGVyLnRoZW4gPT5cbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgXCJhcHBsZXQ6I3thcHBsZXR9OnJvdXRlXCJcbiAgICAgIEJhY2tib25lLmhpc3RvcnkubG9hZFVybCgpXG4gICAgICBcbiAgcm91dGVBcHBsZXQ6IChhcHBsZXQsIGhyZWYpIC0+XG4gICAgQF9oYW5kbGVfcm91dGUgYXBwbGV0LCBocmVmXG5cbiAgZnJvbnRkb29yOiAtPlxuICAgIEBfaGFuZGxlX3JvdXRlICdmcm9udGRvb3InXG4gICAgXG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuICBhcHBSb3V0ZXM6XG4gICAgJyc6ICdmcm9udGRvb3InXG4gICAgJzphcHBsZXQvKic6ICdyb3V0ZUFwcGxldCdcbiAgICAgXG4gIG9uUm91dGU6IChuYW1lLCBwYXRoLCBhcmdzKSAtPlxuICAgIGNvbnNvbGUubG9nIFwiTWFpblJvdXRlci5vblJvdXRlXCIsIG5hbWUsIHBhdGgsIGFyZ3NcbiAgICBcbk1haW5DaGFubmVsLnJlcGx5ICdhcHA6bWFpbjpyb3V0ZScsICgpIC0+XG4gIGNvbnRyb2xsZXIgPSBuZXcgUmVxdWlyZUNvbnRyb2xsZXJcbiAgcm91dGVyID0gbmV3IFJvdXRlclxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgTWFpbkNoYW5uZWwucmVwbHkgJ21haW4tY29udHJvbGxlcicsIC0+XG4gICAgY29udHJvbGxlclxuICBNYWluQ2hhbm5lbC5yZXBseSAnbWFpbi1yb3V0ZXInLCAtPlxuICAgIHJvdXRlclxuICAgIFxuIl19
