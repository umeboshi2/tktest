var Backbone, BootstrapModalRegion, MainChannel, MainPageLayout, Marionette, MessageChannel, MessagesApp, NavbarApp, Toolkit, TopApp, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

TopApp = require('./top-app');

MessagesApp = require('./messages');

NavbarApp = require('./navbar');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

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

MainPageLayout = (function(superClass) {
  extend(MainPageLayout, superClass);

  function MainPageLayout() {
    return MainPageLayout.__super__.constructor.apply(this, arguments);
  }

  MainPageLayout.prototype.template = tc.renderable(function() {
    tc.div('#navbar-view-container');
    tc.div(".container-fluid", function() {
      tc.div('.row', function() {
        return tc.div('.col-sm-10.col-sm-offset-1', function() {
          return tc.div('#messages');
        });
      });
      return tc.div('#applet-content.row');
    });
    tc.div('#footer');
    return tc.div('#modal');
  });

  MainPageLayout.prototype.regions = {
    messages: '#messages',
    navbar: '#navbar-view-container',
    modal: BootstrapModalRegion,
    applet: '#applet-content',
    footer: '#footer'
  };

  return MainPageLayout;

})(Backbone.Marionette.View);

module.exports = MainPageLayout;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cmllcy9sYXlvdXQuanMiLCJzb3VyY2VzIjpbImVudHJpZXMvbGF5b3V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLG9JQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLE9BQUEsR0FBVSxPQUFBLENBQVEsb0JBQVI7O0FBQ1YsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLE1BQUEsR0FBUyxPQUFBLENBQVEsV0FBUjs7QUFDVCxXQUFBLEdBQWMsT0FBQSxDQUFRLFlBQVI7O0FBQ2QsU0FBQSxHQUFZLE9BQUEsQ0FBUSxVQUFSOztBQUVaLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRVg7Ozs7Ozs7aUNBQ0osRUFBQSxHQUFJOztpQ0FDSixRQUFBLEdBQVU7O2lDQUVWLEtBQUEsR0FBTyxTQUFDLFFBQUQ7QUFDTCxRQUFBO0lBQUEsR0FBQSxHQUFNLENBQUEsQ0FBRSxRQUFGO0lBQ04sR0FBRyxDQUFDLElBQUosQ0FBUyxPQUFULEVBQWtCLE9BQWxCO1dBRUE7RUFKSzs7aUNBTVAsSUFBQSxHQUFNLFNBQUMsSUFBRDtJQUNKLCtDQUFNLElBQU47SUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FDRTtNQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsUUFBWDtLQURGO1dBRUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQVcsTUFBWDtFQUpJOzs7O0dBVjJCLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBaUJqRDs7Ozs7OzsyQkFDSixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sd0JBQVA7SUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQLEVBQTJCLFNBQUE7TUFDekIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFQLEVBQWUsU0FBQTtlQUNiLEVBQUUsQ0FBQyxHQUFILENBQU8sNEJBQVAsRUFBcUMsU0FBQTtpQkFDbkMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxXQUFQO1FBRG1DLENBQXJDO01BRGEsQ0FBZjthQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8scUJBQVA7SUFKeUIsQ0FBM0I7SUFLQSxFQUFFLENBQUMsR0FBSCxDQUFPLFNBQVA7V0FDQSxFQUFFLENBQUMsR0FBSCxDQUFPLFFBQVA7RUFSc0IsQ0FBZDs7MkJBVVYsT0FBQSxHQUNFO0lBQUEsUUFBQSxFQUFVLFdBQVY7SUFDQSxNQUFBLEVBQVEsd0JBRFI7SUFFQSxLQUFBLEVBQU8sb0JBRlA7SUFHQSxNQUFBLEVBQVEsaUJBSFI7SUFJQSxNQUFBLEVBQVEsU0FKUjs7Ozs7R0FaeUIsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFrQmpELE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuVG9vbGtpdCA9IHJlcXVpcmUgJ21hcmlvbmV0dGUudG9vbGtpdCdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5Ub3BBcHAgPSByZXF1aXJlICcuL3RvcC1hcHAnXG5NZXNzYWdlc0FwcCA9IHJlcXVpcmUgJy4vbWVzc2FnZXMnXG5OYXZiYXJBcHAgPSByZXF1aXJlICcuL25hdmJhcidcbiAgXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmNsYXNzIEJvb3RzdHJhcE1vZGFsUmVnaW9uIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5SZWdpb25cbiAgZWw6ICcjbW9kYWwnXG4gIGJhY2tkcm9wOiBmYWxzZVxuICBcbiAgZ2V0RWw6IChzZWxlY3RvcikgLT5cbiAgICAkZWwgPSAkIHNlbGVjdG9yXG4gICAgJGVsLmF0dHIgJ2NsYXNzJywgJ21vZGFsJ1xuICAgICMkZWwuYXR0ciAnY2xhc3MnLCAnbW9kYWwgZmFkZSdcbiAgICAkZWxcbiAgICBcbiAgc2hvdzogKHZpZXcpIC0+XG4gICAgc3VwZXIgdmlld1xuICAgIEAkZWwubW9kYWxcbiAgICAgIGJhY2tkcm9wOiBAYmFja2Ryb3BcbiAgICBAJGVsLm1vZGFsICdzaG93J1xuICAgICAgXG5cbmNsYXNzIE1haW5QYWdlTGF5b3V0IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlICgpIC0+IFxuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbnRhaW5lcidcbiAgICB0Yy5kaXYgXCIuY29udGFpbmVyLWZsdWlkXCIsIC0+XG4gICAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgICB0Yy5kaXYgJy5jb2wtc20tMTAuY29sLXNtLW9mZnNldC0xJywgLT5cbiAgICAgICAgICB0Yy5kaXYgJyNtZXNzYWdlcydcbiAgICAgIHRjLmRpdiAnI2FwcGxldC1jb250ZW50LnJvdydcbiAgICB0Yy5kaXYgJyNmb290ZXInXG4gICAgdGMuZGl2ICcjbW9kYWwnXG5cbiAgcmVnaW9uczpcbiAgICBtZXNzYWdlczogJyNtZXNzYWdlcydcbiAgICBuYXZiYXI6ICcjbmF2YmFyLXZpZXctY29udGFpbmVyJ1xuICAgIG1vZGFsOiBCb290c3RyYXBNb2RhbFJlZ2lvblxuICAgIGFwcGxldDogJyNhcHBsZXQtY29udGVudCdcbiAgICBmb290ZXI6ICcjZm9vdGVyJ1xuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBNYWluUGFnZUxheW91dFxuXG5cbiJdfQ==
