var Controller, HubChannel, MainChannel, Marionette, Router, current_calendar_date,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = require('backbone.marionette');

Controller = require('./controller');

require('./collections');

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

current_calendar_date = void 0;

current_calendar_date = new Date('2016-10-15');

HubChannel.reply('maincalendar:set-date', function() {
  var cal;
  cal = $('#maincalendar');
  return current_calendar_date = cal.fullCalendar('getDate');
});

HubChannel.reply('maincalendar:get-date', function() {
  return current_calendar_date;
});

MainChannel.reply('applet:hubby:route', function() {
  var controller, router;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9odWJieS9tYWluLmpzIiwic291cmNlcyI6WyJhcHBsZXRzL2h1YmJ5L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsOEVBQUE7RUFBQTs7O0FBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixVQUFBLEdBQWEsT0FBQSxDQUFRLGNBQVI7O0FBQ2IsT0FBQSxDQUFRLGVBQVI7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxVQUFBLEdBQWEsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLE9BQXZCOztBQUVQOzs7Ozs7O21CQUNKLFNBQUEsR0FDRTtJQUFBLE9BQUEsRUFBUyxVQUFUO0lBQ0Esb0JBQUEsRUFBc0IsZUFEdEI7SUFFQSx1QkFBQSxFQUF5QixjQUZ6QjtJQUdBLGNBQUEsRUFBZ0IsWUFIaEI7Ozs7O0dBRmlCLFVBQVUsQ0FBQzs7QUFRaEMscUJBQUEsR0FBd0I7O0FBQ3hCLHFCQUFBLEdBQXdCLElBQUksSUFBSixDQUFTLFlBQVQ7O0FBQ3hCLFVBQVUsQ0FBQyxLQUFYLENBQWlCLHVCQUFqQixFQUEwQyxTQUFBO0FBQ3hDLE1BQUE7RUFBQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLGVBQUY7U0FDTixxQkFBQSxHQUF3QixHQUFHLENBQUMsWUFBSixDQUFpQixTQUFqQjtBQUZnQixDQUExQzs7QUFJQSxVQUFVLENBQUMsS0FBWCxDQUFpQix1QkFBakIsRUFBMEMsU0FBQTtTQUN4QztBQUR3QyxDQUExQzs7QUFHQSxXQUFXLENBQUMsS0FBWixDQUFrQixvQkFBbEIsRUFBd0MsU0FBQTtBQUN0QyxNQUFBO0VBQUEsVUFBQSxHQUFhLElBQUksVUFBSixDQUFlLFdBQWY7RUFDYixVQUFVLENBQUMsS0FBWCxDQUFpQixpQkFBakIsRUFBb0MsU0FBQTtXQUNsQztFQURrQyxDQUFwQztFQUVBLFVBQVUsQ0FBQyxLQUFYLENBQWlCLGVBQWpCLEVBQWtDLFNBQUMsTUFBRCxFQUFTLE1BQVQ7V0FDaEMsVUFBVSxDQUFDLGFBQVgsQ0FBeUIsTUFBekIsRUFBaUMsTUFBakM7RUFEZ0MsQ0FBbEM7RUFFQSxVQUFVLENBQUMsS0FBWCxDQUFpQixjQUFqQixFQUFpQyxTQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLEVBQWpCO1dBQy9CLFVBQVUsQ0FBQyxZQUFYLENBQXdCLE1BQXhCLEVBQWdDLE1BQWhDLEVBQXdDLEVBQXhDO0VBRCtCLENBQWpDO0VBRUEsVUFBVSxDQUFDLEtBQVgsQ0FBaUIsWUFBakIsRUFBK0IsU0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixPQUFqQjtXQUM3QixVQUFVLENBQUMsVUFBWCxDQUFzQixNQUF0QixFQUE4QixNQUE5QixFQUFzQyxPQUF0QztFQUQ2QixDQUEvQjtTQUVBLE1BQUEsR0FBUyxJQUFJLE1BQUosQ0FDUDtJQUFBLFVBQUEsRUFBWSxVQUFaO0dBRE87QUFWNkIsQ0FBeEMiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuQ29udHJvbGxlciA9IHJlcXVpcmUgJy4vY29udHJvbGxlcidcbnJlcXVpcmUgJy4vY29sbGVjdGlvbnMnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuSHViQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2h1YmJ5J1xuXG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuICBhcHBSb3V0ZXM6XG4gICAgJ2h1YmJ5JzogJ21haW52aWV3J1xuICAgICdodWJieS9saXN0bWVldGluZ3MnOiAnbGlzdF9tZWV0aW5ncydcbiAgICAnaHViYnkvdmlld21lZXRpbmcvOmlkJzogJ3ZpZXdfbWVldGluZydcbiAgICAnaHViYnkvc2VhcmNoJzogJ3ZpZXdfaXRlbXMnXG4gICAgXG4gICAgXG5jdXJyZW50X2NhbGVuZGFyX2RhdGUgPSB1bmRlZmluZWRcbmN1cnJlbnRfY2FsZW5kYXJfZGF0ZSA9IG5ldyBEYXRlICcyMDE2LTEwLTE1J1xuSHViQ2hhbm5lbC5yZXBseSAnbWFpbmNhbGVuZGFyOnNldC1kYXRlJywgKCkgLT5cbiAgY2FsID0gJCAnI21haW5jYWxlbmRhcidcbiAgY3VycmVudF9jYWxlbmRhcl9kYXRlID0gY2FsLmZ1bGxDYWxlbmRhciAnZ2V0RGF0ZSdcblxuSHViQ2hhbm5lbC5yZXBseSAnbWFpbmNhbGVuZGFyOmdldC1kYXRlJywgKCkgLT5cbiAgY3VycmVudF9jYWxlbmRhcl9kYXRlXG4gIFxuTWFpbkNoYW5uZWwucmVwbHkgJ2FwcGxldDpodWJieTpyb3V0ZScsICgpIC0+XG4gIGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlciBNYWluQ2hhbm5lbFxuICBIdWJDaGFubmVsLnJlcGx5ICdtYWluLWNvbnRyb2xsZXInLCAtPlxuICAgIGNvbnRyb2xsZXJcbiAgSHViQ2hhbm5lbC5yZXBseSAndmlldy1jYWxlbmRhcicsIChsYXlvdXQsIHJlZ2lvbikgLT5cbiAgICBjb250cm9sbGVyLnNob3dfY2FsZW5kYXIgbGF5b3V0LCByZWdpb25cbiAgSHViQ2hhbm5lbC5yZXBseSAndmlldy1tZWV0aW5nJywgKGxheW91dCwgcmVnaW9uLCBpZCkgLT5cbiAgICBjb250cm9sbGVyLnNob3dfbWVldGluZyBsYXlvdXQsIHJlZ2lvbiwgaWRcbiAgSHViQ2hhbm5lbC5yZXBseSAndmlldy1pdGVtcycsIChsYXlvdXQsIHJlZ2lvbiwgb3B0aW9ucykgLT5cbiAgICBjb250cm9sbGVyLmxpc3RfaXRlbXMgbGF5b3V0LCByZWdpb24sIG9wdGlvbnNcbiAgcm91dGVyID0gbmV3IFJvdXRlclxuICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcblxuIl19
