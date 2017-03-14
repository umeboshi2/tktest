var Controller, MainChannel, Marionette, Router,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = require('backbone.marionette');

Controller = require('./controller');

MainChannel = Backbone.Radio.channel('global');

Router = (function(superClass) {
  extend(Router, superClass);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.appRoutes = {
    '': 'frontdoor',
    'frontdoor': 'frontdoor',
    'frontdoor/view': 'frontdoor',
    'frontdoor/view/:name': 'view_page',
    'frontdoor/login': 'show_login',
    'pages/:name': 'view_page'
  };

  return Router;

})(Marionette.AppRouter);

MainChannel.reply('applet:frontdoor:route', function() {
  var controller, router;
  controller = new Controller(MainChannel);
  return router = new Router({
    controller: controller
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSwyQ0FBQTtFQUFBOzs7QUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLFVBQUEsR0FBYSxPQUFBLENBQVEsY0FBUjs7QUFHYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUdSOzs7Ozs7O21CQUNKLFNBQUEsR0FDRTtJQUFBLEVBQUEsRUFBSSxXQUFKO0lBQ0EsV0FBQSxFQUFhLFdBRGI7SUFFQSxnQkFBQSxFQUFrQixXQUZsQjtJQUdBLHNCQUFBLEVBQXdCLFdBSHhCO0lBSUEsaUJBQUEsRUFBbUIsWUFKbkI7SUFNQSxhQUFBLEVBQWUsV0FOZjs7Ozs7R0FGaUIsVUFBVSxDQUFDOztBQVVoQyxXQUFXLENBQUMsS0FBWixDQUFrQix3QkFBbEIsRUFBNEMsU0FBQTtBQUMxQyxNQUFBO0VBQUEsVUFBQSxHQUFhLElBQUksVUFBSixDQUFlLFdBQWY7U0FDYixNQUFBLEdBQVMsSUFBSSxNQUFKLENBQ1A7SUFBQSxVQUFBLEVBQVksVUFBWjtHQURPO0FBRmlDLENBQTVDIiwic291cmNlc0NvbnRlbnQiOlsiTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbkNvbnRyb2xsZXIgPSByZXF1aXJlICcuL2NvbnRyb2xsZXInXG5cblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cblxuY2xhc3MgUm91dGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBSb3V0ZXJcbiAgYXBwUm91dGVzOlxuICAgICcnOiAnZnJvbnRkb29yJ1xuICAgICdmcm9udGRvb3InOiAnZnJvbnRkb29yJ1xuICAgICdmcm9udGRvb3Ivdmlldyc6ICdmcm9udGRvb3InXG4gICAgJ2Zyb250ZG9vci92aWV3LzpuYW1lJzogJ3ZpZXdfcGFnZSdcbiAgICAnZnJvbnRkb29yL2xvZ2luJzogJ3Nob3dfbG9naW4nXG4gICAgI0ZJWE1FXG4gICAgJ3BhZ2VzLzpuYW1lJzogJ3ZpZXdfcGFnZSdcbiAgICBcbk1haW5DaGFubmVsLnJlcGx5ICdhcHBsZXQ6ZnJvbnRkb29yOnJvdXRlJywgKCkgLT5cbiAgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyIE1haW5DaGFubmVsXG4gIHJvdXRlciA9IG5ldyBSb3V0ZXJcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG5cbiJdfQ==
