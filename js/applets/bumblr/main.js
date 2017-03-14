var BumblrChannel, Controller, MainChannel, Marionette, Router,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = require('backbone.marionette');

Controller = require('./controller');

MainChannel = Backbone.Radio.channel('global');

BumblrChannel = Backbone.Radio.channel('bumblr');

Router = (function(superClass) {
  extend(Router, superClass);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.appRoutes = {
    'bumblr': 'start',
    'bumblr/settings': 'settings_page',
    'bumblr/dashboard': 'show_dashboard',
    'bumblr/listblogs': 'list_blogs',
    'bumblr/viewblog/:id': 'view_blog',
    'bumblr/addblog': 'add_new_blog'
  };

  return Router;

})(Marionette.AppRouter);

MainChannel.reply('applet:bumblr:route', function() {
  var blog_collection, controller, router;
  controller = new Controller(MainChannel);
  blog_collection = BumblrChannel.request('get_local_blogs');
  blog_collection.fetch();
  return router = new Router({
    controller: controller
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvbWFpbi5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9idW1ibHIvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSwwREFBQTtFQUFBOzs7QUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLFVBQUEsR0FBYSxPQUFBLENBQVEsY0FBUjs7QUFFYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUlWOzs7Ozs7O21CQUNKLFNBQUEsR0FDRTtJQUFBLFFBQUEsRUFBVSxPQUFWO0lBQ0EsaUJBQUEsRUFBbUIsZUFEbkI7SUFFQSxrQkFBQSxFQUFvQixnQkFGcEI7SUFHQSxrQkFBQSxFQUFvQixZQUhwQjtJQUlBLHFCQUFBLEVBQXVCLFdBSnZCO0lBS0EsZ0JBQUEsRUFBbUIsY0FMbkI7Ozs7O0dBRmlCLFVBQVUsQ0FBQzs7QUFVaEMsV0FBVyxDQUFDLEtBQVosQ0FBa0IscUJBQWxCLEVBQXlDLFNBQUE7QUFDdkMsTUFBQTtFQUFBLFVBQUEsR0FBYSxJQUFJLFVBQUosQ0FBZSxXQUFmO0VBQ2IsZUFBQSxHQUFrQixhQUFhLENBQUMsT0FBZCxDQUFzQixpQkFBdEI7RUFFbEIsZUFBZSxDQUFDLEtBQWhCLENBQUE7U0FDQSxNQUFBLEdBQVMsSUFBSSxNQUFKLENBQ1A7SUFBQSxVQUFBLEVBQVksVUFBWjtHQURPO0FBTDhCLENBQXpDIiwic291cmNlc0NvbnRlbnQiOlsiTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbkNvbnRyb2xsZXIgPSByZXF1aXJlICcuL2NvbnRyb2xsZXInXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuQnVtYmxyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2J1bWJscidcblxuXG5cbmNsYXNzIFJvdXRlciBleHRlbmRzIE1hcmlvbmV0dGUuQXBwUm91dGVyXG4gIGFwcFJvdXRlczpcbiAgICAnYnVtYmxyJzogJ3N0YXJ0J1xuICAgICdidW1ibHIvc2V0dGluZ3MnOiAnc2V0dGluZ3NfcGFnZSdcbiAgICAnYnVtYmxyL2Rhc2hib2FyZCc6ICdzaG93X2Rhc2hib2FyZCdcbiAgICAnYnVtYmxyL2xpc3RibG9ncyc6ICdsaXN0X2Jsb2dzJ1xuICAgICdidW1ibHIvdmlld2Jsb2cvOmlkJzogJ3ZpZXdfYmxvZydcbiAgICAnYnVtYmxyL2FkZGJsb2cnIDogJ2FkZF9uZXdfYmxvZydcblxuICAgIFxuTWFpbkNoYW5uZWwucmVwbHkgJ2FwcGxldDpidW1ibHI6cm91dGUnLCAoKSAtPlxuICBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIgTWFpbkNoYW5uZWxcbiAgYmxvZ19jb2xsZWN0aW9uID0gQnVtYmxyQ2hhbm5lbC5yZXF1ZXN0ICdnZXRfbG9jYWxfYmxvZ3MnXG4gICMgRklYTUUgdXNlIGJldHRlciBsc2NvbGxlY3Rpb25cbiAgYmxvZ19jb2xsZWN0aW9uLmZldGNoKClcbiAgcm91dGVyID0gbmV3IFJvdXRlclxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgICBcbiJdfQ==
