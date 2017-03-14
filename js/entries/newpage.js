var Backbone, MainAppConfig, MainChannel, Marionette, MessageChannel, MessagesApp, NavbarApp, TkAppState, Toolkit, TopApp, app, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

require('bootstrap');

TopApp = require('./top-app');

MessagesApp = require('./messages');

NavbarApp = require('./navbar');

MainAppConfig = require('./newpage-config');

require('./router');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

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

if (__DEV__) {
  window.App = app;
}

MainChannel.reply('main:app:appmodel', function() {
  return new Backbone.Model(MainAppConfig);
});

MainChannel.reply('main:app:object', function() {
  return app;
});

MainChannel.reply('main:app:config', function() {
  return app.options.appConfig;
});

MainChannel.request('app:main:route');

app.start();

module.exports = app;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cmllcy9uZXdwYWdlLmpzIiwic291cmNlcyI6WyJlbnRyaWVzL25ld3BhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsOEhBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsT0FBQSxHQUFVLE9BQUEsQ0FBUSxvQkFBUjs7QUFDVixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBQ0wsT0FBQSxDQUFRLFdBQVI7O0FBRUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxXQUFSOztBQUNULFdBQUEsR0FBYyxPQUFBLENBQVEsWUFBUjs7QUFDZCxTQUFBLEdBQVksT0FBQSxDQUFRLFVBQVI7O0FBQ1osYUFBQSxHQUFnQixPQUFBLENBQVEsa0JBQVI7O0FBQ2hCLE9BQUEsQ0FBUSxVQUFSOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBZ0JYOzs7Ozs7O3VCQUNKLFFBQUEsR0FDRTtJQUFBLFNBQUEsRUFBVyxJQUFJLFVBQVUsQ0FBQyxNQUFmLENBQXNCO01BQUEsRUFBQSxFQUFHLE1BQUg7S0FBdEIsQ0FBWDtJQUNBLFlBQUEsRUFBYyxJQURkO0lBRUEsV0FBQSxFQUFhLEtBRmI7SUFHQSxTQUFBLEVBQVcsRUFIWDs7Ozs7R0FGcUIsUUFBUSxDQUFDOztBQU9sQyxHQUFBLEdBQU0sSUFBSSxNQUFKLENBQ0o7RUFBQSxVQUFBLEVBQVksVUFBWjtFQUNBLFNBQUEsRUFBVyxhQURYO0NBREk7O0FBSU4sSUFBRyxPQUFIO0VBRUUsTUFBTSxDQUFDLEdBQVAsR0FBYSxJQUZmOzs7QUFJQSxXQUFXLENBQUMsS0FBWixDQUFrQixtQkFBbEIsRUFBdUMsU0FBQTtTQUNyQyxJQUFJLFFBQVEsQ0FBQyxLQUFiLENBQW1CLGFBQW5CO0FBRHFDLENBQXZDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxTQUFBO1NBQ25DO0FBRG1DLENBQXJDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLGlCQUFsQixFQUFxQyxTQUFBO1NBQ25DLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFEdUIsQ0FBckM7O0FBSUEsV0FBVyxDQUFDLE9BQVosQ0FBb0IsZ0JBQXBCOztBQUdBLEdBQUcsQ0FBQyxLQUFKLENBQUE7O0FBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5Ub29sa2l0ID0gcmVxdWlyZSAnbWFyaW9uZXR0ZS50b29sa2l0J1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5yZXF1aXJlICdib290c3RyYXAnXG5cblRvcEFwcCA9IHJlcXVpcmUgJy4vdG9wLWFwcCdcbk1lc3NhZ2VzQXBwID0gcmVxdWlyZSAnLi9tZXNzYWdlcydcbk5hdmJhckFwcCA9IHJlcXVpcmUgJy4vbmF2YmFyJ1xuTWFpbkFwcENvbmZpZyA9IHJlcXVpcmUgJy4vbmV3cGFnZS1jb25maWcnXG5yZXF1aXJlICcuL3JvdXRlcidcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIG1haW4gY2hhbm5lbCByZXF1ZXN0c1xuIyBcbiMgLSBhcHBsZXQ6I3tuYW1lfTpyb3V0ZVxuIyB0aGlzIGNyZWF0ZXMgYW4gQXBwUm91dGVyIGFuZCBhIENvbnRyb2xsZXIsIHNldHRpbmdcbiMgcm91dGVzIHRvIGFjY2VzcyB0aGUgYXBwbGV0LiAgVGhlIHJlcGx5IGZ1bmN0aW9uXG4jIGlzIGluIHRoZSBcIm1haW5cIiBtb2R1bGVcbiNcbiMgLSBtYWlucGFnZTppbml0IChhcHBtb2RlbClcbiMgVGhpcyByZXF1ZXN0IGJ1aWxkcyB0aGUgbWFpbiBsYXlvdXQuXG4jXG4jIFxuIyBcbiNcblxuY2xhc3MgVGtBcHBTdGF0ZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIEFwcFJlZ2lvbjogbmV3IE1hcmlvbmV0dGUuUmVnaW9uIGVsOidib2R5J1xuICAgIHN0YXJ0SGlzdG9yeTogdHJ1ZVxuICAgIE5hdkJhckNsYXNzOiBmYWxzZVxuICAgIGFwcENvbmZpZzoge31cbiAgICBcbmFwcCA9IG5ldyBUb3BBcHBcbiAgU3RhdGVNb2RlbDogVGtBcHBTdGF0ZVxuICBhcHBDb25maWc6IE1haW5BcHBDb25maWdcbiAgXG5pZiBfX0RFVl9fXG4gICMgREVCVUcgYXR0YWNoIGFwcCB0byB3aW5kb3dcbiAgd2luZG93LkFwcCA9IGFwcFxuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6YXBwbW9kZWwnLCAtPlxuICBuZXcgQmFja2JvbmUuTW9kZWwgTWFpbkFwcENvbmZpZ1xuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6b2JqZWN0JywgLT5cbiAgYXBwXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpjb25maWcnLCAtPlxuICBhcHAub3B0aW9ucy5hcHBDb25maWdcbiAgXG4jIHJlZ2lzdGVyIHRoZSBtYWluIHJvdXRlclxuTWFpbkNoYW5uZWwucmVxdWVzdCAnYXBwOm1haW46cm91dGUnXG5cbiMgc3RhcnQgdGhlIGFwcFxuYXBwLnN0YXJ0KClcblxubW9kdWxlLmV4cG9ydHMgPSBhcHBcblxuXG4iXX0=
