var Backbone, MainAppConfig, MainChannel, Marionette, MessageChannel, MessagesApp, NavbarApp, TkAppState, Toolkit, TopApp, app, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

require('bootstrap');

TopApp = require('./oldtop');

MessagesApp = require('./messages');

NavbarApp = require('./navbar');

MainAppConfig = require('./index-config');

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

app.start();

module.exports = app;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cmllcy9pbmRleC5qcyIsInNvdXJjZXMiOlsiZW50cmllcy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw4SEFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFDTCxPQUFBLENBQVEsV0FBUjs7QUFFQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVI7O0FBQ1QsV0FBQSxHQUFjLE9BQUEsQ0FBUSxZQUFSOztBQUNkLFNBQUEsR0FBWSxPQUFBLENBQVEsVUFBUjs7QUFDWixhQUFBLEdBQWdCLE9BQUEsQ0FBUSxnQkFBUjs7QUFFaEIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFnQlg7Ozs7Ozs7dUJBQ0osUUFBQSxHQUNFO0lBQUEsU0FBQSxFQUFXLElBQUksVUFBVSxDQUFDLE1BQWYsQ0FBc0I7TUFBQSxFQUFBLEVBQUcsTUFBSDtLQUF0QixDQUFYO0lBQ0EsWUFBQSxFQUFjLElBRGQ7SUFFQSxXQUFBLEVBQWEsS0FGYjtJQUdBLFNBQUEsRUFBVyxFQUhYOzs7OztHQUZxQixRQUFRLENBQUM7O0FBT2xDLEdBQUEsR0FBTSxJQUFJLE1BQUosQ0FDSjtFQUFBLFVBQUEsRUFBWSxVQUFaO0VBQ0EsU0FBQSxFQUFXLGFBRFg7Q0FESTs7QUFJTixJQUFHLE9BQUg7RUFFRSxNQUFNLENBQUMsR0FBUCxHQUFhLElBRmY7OztBQUlBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLG1CQUFsQixFQUF1QyxTQUFBO1NBQ3JDLElBQUksUUFBUSxDQUFDLEtBQWIsQ0FBbUIsYUFBbkI7QUFEcUMsQ0FBdkM7O0FBR0EsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFNBQUE7U0FDbkM7QUFEbUMsQ0FBckM7O0FBR0EsV0FBVyxDQUFDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLFNBQUE7U0FDbkMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUR1QixDQUFyQzs7QUFLQSxHQUFHLENBQUMsS0FBSixDQUFBOztBQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuVG9vbGtpdCA9IHJlcXVpcmUgJ21hcmlvbmV0dGUudG9vbGtpdCdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xucmVxdWlyZSAnYm9vdHN0cmFwJ1xuXG5Ub3BBcHAgPSByZXF1aXJlICcuL29sZHRvcCdcbk1lc3NhZ2VzQXBwID0gcmVxdWlyZSAnLi9tZXNzYWdlcydcbk5hdmJhckFwcCA9IHJlcXVpcmUgJy4vbmF2YmFyJ1xuTWFpbkFwcENvbmZpZyA9IHJlcXVpcmUgJy4vaW5kZXgtY29uZmlnJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbiMgbWFpbiBjaGFubmVsIHJlcXVlc3RzXG4jIFxuIyAtIGFwcGxldDoje25hbWV9OnJvdXRlXG4jIHRoaXMgY3JlYXRlcyBhbiBBcHBSb3V0ZXIgYW5kIGEgQ29udHJvbGxlciwgc2V0dGluZ1xuIyByb3V0ZXMgdG8gYWNjZXNzIHRoZSBhcHBsZXQuICBUaGUgcmVwbHkgZnVuY3Rpb25cbiMgaXMgaW4gdGhlIFwibWFpblwiIG1vZHVsZVxuI1xuIyAtIG1haW5wYWdlOmluaXQgKGFwcG1vZGVsKVxuIyBUaGlzIHJlcXVlc3QgYnVpbGRzIHRoZSBtYWluIGxheW91dC5cbiNcbiMgXG4jIFxuI1xuXG5jbGFzcyBUa0FwcFN0YXRlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgZGVmYXVsdHM6XG4gICAgQXBwUmVnaW9uOiBuZXcgTWFyaW9uZXR0ZS5SZWdpb24gZWw6J2JvZHknXG4gICAgc3RhcnRIaXN0b3J5OiB0cnVlXG4gICAgTmF2QmFyQ2xhc3M6IGZhbHNlXG4gICAgYXBwQ29uZmlnOiB7fVxuICAgIFxuYXBwID0gbmV3IFRvcEFwcFxuICBTdGF0ZU1vZGVsOiBUa0FwcFN0YXRlXG4gIGFwcENvbmZpZzogTWFpbkFwcENvbmZpZ1xuICBcbmlmIF9fREVWX19cbiAgIyBERUJVRyBhdHRhY2ggYXBwIHRvIHdpbmRvd1xuICB3aW5kb3cuQXBwID0gYXBwXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDphcHBtb2RlbCcsIC0+XG4gIG5ldyBCYWNrYm9uZS5Nb2RlbCBNYWluQXBwQ29uZmlnXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpvYmplY3QnLCAtPlxuICBhcHBcblxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOmNvbmZpZycsIC0+XG4gIGFwcC5vcHRpb25zLmFwcENvbmZpZ1xuICBcblxuIyBzdGFydCB0aGUgYXBwXG5hcHAuc3RhcnQoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcFxuXG5cbiJdfQ==
