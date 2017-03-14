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
    var applet, c, hash, location, url;
    this.initPage();
    if (this.getState('startHistory')) {
      location = window.location;
      hash = !location.hash ? '#' : location.hash;
      url = "" + location.hash;
      c = MainChannel.request('main-controller');
      applet = hash.split('/')[0];
      while (applet.startsWith('#')) {
        applet = applet.slice(1);
      }
      c.routeApplet(applet);
      if (!Backbone.history.started) {
        return Backbone.history.start(url);
      }
    }
  };

  return TopApp;

})(Toolkit.App);

module.exports = TopApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cmllcy90b3AtYXBwLmpzIiwic291cmNlcyI6WyJlbnRyaWVzL3RvcC1hcHAuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsOEVBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsT0FBQSxHQUFVLE9BQUEsQ0FBUSxvQkFBUjs7QUFDVixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUwsV0FBQSxHQUFjLE9BQUEsQ0FBUSxZQUFSOztBQUNkLFNBQUEsR0FBWSxPQUFBLENBQVEsVUFBUjs7QUFFWixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNSOzs7Ozs7O21CQUNKLGFBQUEsR0FBZSxTQUFBO0FBQ2IsUUFBQTtJQUFBLFNBQUEsR0FBWSxJQUFDLENBQUEsT0FBTyxDQUFDO0lBRXJCLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSSxVQUFVLENBQUMsTUFBZixDQUFzQjtNQUFBLEVBQUEsRUFBSSxTQUFTLENBQUMsU0FBZDtLQUF0QixDQUFYO0lBRUEsSUFBRyxTQUFTLENBQUMsV0FBYjtNQUNFLFdBQUEsR0FBYyxJQUFDLENBQUEsV0FBRCxDQUFhLFVBQWIsRUFDWjtRQUFBLFFBQUEsRUFBVSxXQUFWO1FBQ0EsZUFBQSxFQUFpQixJQURqQjtRQUdBLFNBQUEsRUFBVyxJQUhYO09BRFksRUFEaEI7O0lBTUEsSUFBRyxTQUFTLENBQUMsU0FBYjthQUNFLFNBQUEsR0FBWSxJQUFDLENBQUEsV0FBRCxDQUFhLFFBQWIsRUFDVjtRQUFBLFFBQUEsRUFBVSxTQUFWO1FBQ0EsZUFBQSxFQUFpQixJQURqQjtRQUdBLFNBQUEsRUFBVyxJQUhYO09BRFUsRUFEZDs7RUFYYTs7bUJBa0JmLFFBQUEsR0FBVSxTQUFBO0FBQ1IsUUFBQTtJQUFBLFNBQUEsR0FBWSxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ3JCLFNBQUEsR0FBWSxTQUFTLENBQUM7SUFDdEIsVUFBQSxHQUFhLFNBQVMsQ0FBQztJQUN2QixNQUFBLEdBQVMsSUFBSSxTQUFKLENBQWMsU0FBUyxDQUFDLGFBQXhCO1dBSVQsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO0VBUlE7O21CQVVWLE9BQUEsR0FBUyxTQUFBO0FBR1AsUUFBQTtJQUFBLElBQUMsQ0FBQSxRQUFELENBQUE7SUFDQSxJQUFHLElBQUMsQ0FBQSxRQUFELENBQVUsY0FBVixDQUFIO01BSUUsUUFBQSxHQUFXLE1BQU0sQ0FBQztNQUNsQixJQUFBLEdBQVUsQ0FBSSxRQUFRLENBQUMsSUFBaEIsR0FBMEIsR0FBMUIsR0FBbUMsUUFBUSxDQUFDO01BQ25ELEdBQUEsR0FBTSxFQUFBLEdBQUcsUUFBUSxDQUFDO01BR2xCLENBQUEsR0FBSSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7TUFDSixNQUFBLEdBQVMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYLENBQWdCLENBQUEsQ0FBQTtBQUN6QixhQUFNLE1BQU0sQ0FBQyxVQUFQLENBQWtCLEdBQWxCLENBQU47UUFDRSxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxDQUFiO01BRFg7TUFHQSxDQUFDLENBQUMsV0FBRixDQUFjLE1BQWQ7TUFDQSxJQUFBLENBQW1DLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBcEQ7ZUFBQSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQWpCLENBQXVCLEdBQXZCLEVBQUE7T0FmRjs7RUFKTzs7OztHQTdCVSxPQUFPLENBQUM7O0FBb0Q3QixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblRvb2xraXQgPSByZXF1aXJlICdtYXJpb25ldHRlLnRvb2xraXQnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuTWVzc2FnZXNBcHAgPSByZXF1aXJlICcuL21lc3NhZ2VzJ1xuTmF2YmFyQXBwID0gcmVxdWlyZSAnLi9uYXZiYXInXG4gIFxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5jbGFzcyBUb3BBcHAgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIGFwcENvbmZpZyA9IEBvcHRpb25zLmFwcENvbmZpZ1xuICAgICMgRklYTUUgLSB0ZXN0IGZvciByZWdpb24gY2xhc3NcbiAgICBAc2V0UmVnaW9uIG5ldyBNYXJpb25ldHRlLlJlZ2lvbiBlbDogYXBwQ29uZmlnLmFwcFJlZ2lvblxuICAgICNjb25zb2xlLmxvZyBcIlRvcEFwcCByZWdpb24gc2V0IHRvXCIsIEBnZXRSZWdpb24oKVxuICAgIGlmIGFwcENvbmZpZy51c2VNZXNzYWdlc1xuICAgICAgbWVzc2FnZXNBcHAgPSBAYWRkQ2hpbGRBcHAgJ21lc3NhZ2VzJyxcbiAgICAgICAgQXBwQ2xhc3M6IE1lc3NhZ2VzQXBwXG4gICAgICAgIHN0YXJ0V2l0aFBhcmVudDogdHJ1ZVxuICAgICAgICAsXG4gICAgICAgIHBhcmVudEFwcDogQFxuICAgIGlmIGFwcENvbmZpZy51c2VOYXZiYXJcbiAgICAgIG5hdmJhckFwcCA9IEBhZGRDaGlsZEFwcCAnbmF2YmFyJyxcbiAgICAgICAgQXBwQ2xhc3M6IE5hdmJhckFwcFxuICAgICAgICBzdGFydFdpdGhQYXJlbnQ6IHRydWVcbiAgICAgICAgLFxuICAgICAgICBwYXJlbnRBcHA6IEBcbiAgICAgICAgXG4gIGluaXRQYWdlOiAtPlxuICAgIGFwcENvbmZpZyA9IEBvcHRpb25zLmFwcENvbmZpZ1xuICAgIEFwcExheW91dCA9IGFwcENvbmZpZy5sYXlvdXRcbiAgICBsYXlvdXRPcHRzID0gYXBwQ29uZmlnLmxheW91dE9wdGlvbnNcbiAgICBsYXlvdXQgPSBuZXcgQXBwTGF5b3V0IGFwcENvbmZpZy5sYXlvdXRPcHRpb25zXG4gICAgI2xheW91dC5vbiAncmVuZGVyJywgPT5cbiAgICAjICBjb25zb2xlLmxvZyBcInJlbmRlciBjYWxsZWQgb24gbWFpbiBsYXlvdXRcIlxuICAgICMgIGNvbnNvbGUubG9nIFwiSSB1c2VkIHRvIGRvIHN0dWZmIGhlcmUsIGJ1dCBub3cgSSdtIHVzaW5nIGNoaWxkQXBwc1wiXG4gICAgQHNob3dWaWV3IGxheW91dCAgICBcblxuICBvblN0YXJ0OiAtPlxuICAgICNjb25zb2xlLmxvZyBcIihvblN0YXJ0KSBoZXJlIGlzIHdoZXJlIHdlIHdvdWxkIGJlIGNyZWF0aW5nIHRoZSBhcHByb3V0ZXJzXCJcbiAgICAjIGJ1aWxkIG1haW4gcGFnZSBsYXlvdXRcbiAgICBAaW5pdFBhZ2UoKVxuICAgIGlmIEBnZXRTdGF0ZSAnc3RhcnRIaXN0b3J5J1xuICAgICAgIyBGSVhNRSB3ZSBuZWVkIHNvbWV0aGluZyBiZXR0ZXJcbiAgICAgICMgXG4gICAgICAjY29uc29sZS5sb2cgXCJzdGFydEhpc3Rvcnkgb25TdGFydFwiXG4gICAgICBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvblxuICAgICAgaGFzaCA9IGlmIG5vdCBsb2NhdGlvbi5oYXNoIHRoZW4gJyMnIGVsc2UgbG9jYXRpb24uaGFzaFxuICAgICAgdXJsID0gXCIje2xvY2F0aW9uLmhhc2h9XCJcbiAgICAgICNjb25zb2xlLmxvZyBcIndpbmRvdy5sb2NhdGlvblwiLCBsb2NhdGlvblxuICAgICAgI2NvbnNvbGUubG9nIFwidXJsXCIsIHVybFxuICAgICAgYyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICAgIGFwcGxldCA9IGhhc2guc3BsaXQoJy8nKVswXVxuICAgICAgd2hpbGUgYXBwbGV0LnN0YXJ0c1dpdGggJyMnXG4gICAgICAgIGFwcGxldCA9IGFwcGxldC5zbGljZSAxXG4gICAgICAjY29uc29sZS5sb2cgXCJhcHBsZXRcIiwgYXBwbGV0LCBoYXNoXG4gICAgICBjLnJvdXRlQXBwbGV0IGFwcGxldFxuICAgICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCh1cmwpIHVubGVzcyBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0ZWRcbiAgICAgICNyID0gbmV3IEJhY2tib25lLlJvdXRlclxuICAgICAgI3IubmF2aWdhdGUgdXJsLCB0cmlnZ2VyOiB0cnVlXG4gICAgICBcbm1vZHVsZS5leHBvcnRzID0gVG9wQXBwXG5cblxuIl19
