var $, Backbone, BumblerLayout, BumblrChannel, Collections, Controller, MainController, Marionette, MiscViews, Models, SideBarView, Util, make_sidebar_template, side_bar_data, sidebar_template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Util = require('agate/src/apputil');

MainController = require('agate/src/controllers').MainController;

make_sidebar_template = require('agate/src/templates/layout').make_sidebar_template;

Models = require('./models');

Collections = require('./collections');

MiscViews = require('./views/misc');

SideBarView = require('./views/sidebar');

BumblrChannel = Backbone.Radio.channel('bumblr');

sidebar_template = make_sidebar_template();

side_bar_data = new Backbone.Model({
  entries: [
    {
      name: 'List Blogs',
      url: '#bumblr/listblogs'
    }, {
      name: 'Settings',
      url: '#bumblr/settings'
    }
  ]
});

BumblerLayout = (function(superClass) {
  extend(BumblerLayout, superClass);

  function BumblerLayout() {
    return BumblerLayout.__super__.constructor.apply(this, arguments);
  }

  BumblerLayout.prototype.template = sidebar_template;

  BumblerLayout.prototype.regions = {
    sidebar: '#sidebar',
    content: '#main-content'
  };

  return BumblerLayout;

})(Backbone.Marionette.View);

Controller = (function(superClass) {
  extend(Controller, superClass);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.layoutClass = BumblerLayout;

  Controller.prototype.sidebarclass = SideBarView;

  Controller.prototype.sidebar_model = side_bar_data;

  Controller.prototype._make_sidebar = function() {
    var sidebar, view;
    sidebar = this._empty_sidebar();
    view = new this.sidebarclass({
      model: this.sidebar_model
    });
    return sidebar.show(view);
  };

  Controller.prototype.set_header = function(title) {
    var header;
    header = $('#header');
    return header.text(title);
  };

  Controller.prototype.start = function() {
    this.setup_layout_if_needed();
    this.set_header('Bumblr');
    return this.list_blogs();
  };

  Controller.prototype.default_view = function() {
    return this.start();
  };

  Controller.prototype.show_mainview = function() {
    var view;
    this._make_sidebar();
    view = new MiscViews.MainBumblrView;
    this.layout.showChildView('content', view);
    return Util.scroll_top_fast();
  };

  Controller.prototype.show_dashboard = function() {
    var view;
    this._make_sidebar();
    view = new MiscViews.BumblrDashboardView;
    this.layout.showChildView('content', view);
    return Util.scroll_top_fast();
  };

  Controller.prototype.list_blogs = function() {
    this.setup_layout_if_needed();
    this._make_sidebar();
    return require.ensure([], (function(_this) {
      return function() {
        var SimpleBlogListView, blogs, view;
        blogs = BumblrChannel.request('get_local_blogs');
        SimpleBlogListView = require('./views/bloglist');
        view = new SimpleBlogListView({
          collection: blogs
        });
        return _this.layout.showChildView('content', view);
      };
    })(this), 'bumblr-view-list-blogs');
  };

  Controller.prototype.view_blog = function(blog_id) {
    this.setup_layout_if_needed();
    this._make_sidebar();
    return require.ensure([], (function(_this) {
      return function() {
        var BlogPostListView, collection, host, response;
        host = blog_id + '.tumblr.com';
        collection = BumblrChannel.request('make_blog_post_collection', host);
        BlogPostListView = require('./views/postlist');
        response = collection.fetch();
        return response.done(function() {
          var view;
          view = new BlogPostListView({
            collection: collection
          });
          _this.layout.showChildView('content', view);
          return Util.scroll_top_fast();
        });
      };
    })(this), 'bumblr-view-blog-view');
  };

  Controller.prototype.add_new_blog = function() {
    this.setup_layout_if_needed();
    this._make_sidebar();
    return require.ensure([], (function(_this) {
      return function() {
        var NewBlogFormView, view;
        NewBlogFormView = require('./views/newblog');
        view = new NewBlogFormView;
        _this.layout.showChildView('content', view);
        return Util.scroll_top_fast();
      };
    })(this), 'bumblr-view-add-blog');
  };

  Controller.prototype.settings_page = function() {
    this.setup_layout_if_needed();
    this._make_sidebar();
    return require.ensure([], (function(_this) {
      return function() {
        var ConsumerKeyFormView, settings, view;
        ConsumerKeyFormView = require('./views/settingsform');
        settings = BumblrChannel.request('get_app_settings');
        view = new ConsumerKeyFormView({
          model: settings
        });
        _this.layout.showChildView('content', view);
        return Util.scroll_top_fast();
      };
    })(this), 'bumblr-view-settings');
  };

  return Controller;

})(MainController);

module.exports = Controller;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9idW1ibHIvY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw0TEFBQTtFQUFBOzs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBRWIsSUFBQSxHQUFPLE9BQUEsQ0FBUSxtQkFBUjs7QUFDTCxpQkFBbUIsT0FBQSxDQUFRLHVCQUFSOztBQUNuQix3QkFBMEIsT0FBQSxDQUFRLDRCQUFSOztBQUU1QixNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVI7O0FBQ1QsV0FBQSxHQUFjLE9BQUEsQ0FBUSxlQUFSOztBQUVkLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUjs7QUFDWixXQUFBLEdBQWMsT0FBQSxDQUFRLGlCQUFSOztBQUdkLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVoQixnQkFBQSxHQUFtQixxQkFBQSxDQUFBOztBQUluQixhQUFBLEdBQWdCLElBQUksUUFBUSxDQUFDLEtBQWIsQ0FDZDtFQUFBLE9BQUEsRUFBUztJQUNQO01BQ0UsSUFBQSxFQUFNLFlBRFI7TUFFRSxHQUFBLEVBQUssbUJBRlA7S0FETyxFQUtQO01BQ0UsSUFBQSxFQUFNLFVBRFI7TUFFRSxHQUFBLEVBQUssa0JBRlA7S0FMTztHQUFUO0NBRGM7O0FBWVY7Ozs7Ozs7MEJBQ0osUUFBQSxHQUFVOzswQkFDVixPQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVMsVUFBVDtJQUNBLE9BQUEsRUFBUyxlQURUOzs7OztHQUh3QixRQUFRLENBQUMsVUFBVSxDQUFDOztBQU8xQzs7Ozs7Ozt1QkFDSixXQUFBLEdBQWE7O3VCQUNiLFlBQUEsR0FBYzs7dUJBQ2QsYUFBQSxHQUFlOzt1QkFDZixhQUFBLEdBQWUsU0FBQTtBQUNiLFFBQUE7SUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLGNBQUQsQ0FBQTtJQUNWLElBQUEsR0FBTyxJQUFJLElBQUMsQ0FBQSxZQUFMLENBQ0w7TUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLGFBQVI7S0FESztXQUVQLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBYjtFQUphOzt1QkFPZixVQUFBLEdBQVksU0FBQyxLQUFEO0FBQ1YsUUFBQTtJQUFBLE1BQUEsR0FBUyxDQUFBLENBQUUsU0FBRjtXQUNULE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBWjtFQUZVOzt1QkFJWixLQUFBLEdBQU8sU0FBQTtJQUVMLElBQUMsQ0FBQSxzQkFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLFVBQUQsQ0FBWSxRQUFaO1dBQ0EsSUFBQyxDQUFBLFVBQUQsQ0FBQTtFQUpLOzt1QkFNUCxZQUFBLEdBQWMsU0FBQTtXQUNaLElBQUMsQ0FBQSxLQUFELENBQUE7RUFEWTs7dUJBR2QsYUFBQSxHQUFlLFNBQUE7QUFDYixRQUFBO0lBQUEsSUFBQyxDQUFBLGFBQUQsQ0FBQTtJQUNBLElBQUEsR0FBTyxJQUFJLFNBQVMsQ0FBQztJQUNyQixJQUFDLENBQUEsTUFBTSxDQUFDLGFBQVIsQ0FBc0IsU0FBdEIsRUFBaUMsSUFBakM7V0FDQSxJQUFJLENBQUMsZUFBTCxDQUFBO0VBSmE7O3VCQU1mLGNBQUEsR0FBZ0IsU0FBQTtBQUNkLFFBQUE7SUFBQSxJQUFDLENBQUEsYUFBRCxDQUFBO0lBQ0EsSUFBQSxHQUFPLElBQUksU0FBUyxDQUFDO0lBQ3JCLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixTQUF0QixFQUFpQyxJQUFqQztXQUNBLElBQUksQ0FBQyxlQUFMLENBQUE7RUFKYzs7dUJBTWhCLFVBQUEsR0FBWSxTQUFBO0lBQ1YsSUFBQyxDQUFBLHNCQUFELENBQUE7SUFDQSxJQUFDLENBQUEsYUFBRCxDQUFBO1dBQ0EsT0FBTyxDQUFDLE1BQVIsQ0FBZSxFQUFmLEVBQW1CLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtBQUNqQixZQUFBO1FBQUEsS0FBQSxHQUFRLGFBQWEsQ0FBQyxPQUFkLENBQXNCLGlCQUF0QjtRQUNSLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSxrQkFBUjtRQUNyQixJQUFBLEdBQU8sSUFBSSxrQkFBSixDQUNMO1VBQUEsVUFBQSxFQUFZLEtBQVo7U0FESztlQUVQLEtBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixTQUF0QixFQUFpQyxJQUFqQztNQUxpQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkIsRUFPRSx3QkFQRjtFQUhVOzt1QkFZWixTQUFBLEdBQVcsU0FBQyxPQUFEO0lBRVQsSUFBQyxDQUFBLHNCQUFELENBQUE7SUFDQSxJQUFDLENBQUEsYUFBRCxDQUFBO1dBQ0EsT0FBTyxDQUFDLE1BQVIsQ0FBZSxFQUFmLEVBQW1CLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtBQUNqQixZQUFBO1FBQUEsSUFBQSxHQUFPLE9BQUEsR0FBVTtRQUNqQixVQUFBLEdBQWEsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsMkJBQXRCLEVBQW1ELElBQW5EO1FBQ2IsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLGtCQUFSO1FBQ25CLFFBQUEsR0FBVyxVQUFVLENBQUMsS0FBWCxDQUFBO2VBQ1gsUUFBUSxDQUFDLElBQVQsQ0FBYyxTQUFBO0FBQ1osY0FBQTtVQUFBLElBQUEsR0FBTyxJQUFJLGdCQUFKLENBQ0w7WUFBQSxVQUFBLEVBQVksVUFBWjtXQURLO1VBRVAsS0FBQyxDQUFBLE1BQU0sQ0FBQyxhQUFSLENBQXNCLFNBQXRCLEVBQWlDLElBQWpDO2lCQUNBLElBQUksQ0FBQyxlQUFMLENBQUE7UUFKWSxDQUFkO01BTGlCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQixFQVdFLHVCQVhGO0VBSlM7O3VCQWlCWCxZQUFBLEdBQWMsU0FBQTtJQUNaLElBQUMsQ0FBQSxzQkFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBQTtXQUNBLE9BQU8sQ0FBQyxNQUFSLENBQWUsRUFBZixFQUFtQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7QUFDakIsWUFBQTtRQUFBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLGlCQUFSO1FBQ2xCLElBQUEsR0FBTyxJQUFJO1FBQ1gsS0FBQyxDQUFBLE1BQU0sQ0FBQyxhQUFSLENBQXNCLFNBQXRCLEVBQWlDLElBQWpDO2VBQ0EsSUFBSSxDQUFDLGVBQUwsQ0FBQTtNQUppQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkIsRUFNRSxzQkFORjtFQUhZOzt1QkFZZCxhQUFBLEdBQWUsU0FBQTtJQUNiLElBQUMsQ0FBQSxzQkFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBQTtXQUNBLE9BQU8sQ0FBQyxNQUFSLENBQWUsRUFBZixFQUFtQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7QUFDakIsWUFBQTtRQUFBLG1CQUFBLEdBQXNCLE9BQUEsQ0FBUSxzQkFBUjtRQUN0QixRQUFBLEdBQVcsYUFBYSxDQUFDLE9BQWQsQ0FBc0Isa0JBQXRCO1FBQ1gsSUFBQSxHQUFPLElBQUksbUJBQUosQ0FBd0I7VUFBQSxLQUFBLEVBQU0sUUFBTjtTQUF4QjtRQUNQLEtBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixTQUF0QixFQUFpQyxJQUFqQztlQUNBLElBQUksQ0FBQyxlQUFMLENBQUE7TUFMaUI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CLEVBT0Usc0JBUEY7RUFIYTs7OztHQTdFUTs7QUF5RnpCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuVXRpbCA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9hcHB1dGlsJ1xueyBNYWluQ29udHJvbGxlciB9ID0gcmVxdWlyZSAnYWdhdGUvc3JjL2NvbnRyb2xsZXJzJ1xueyBtYWtlX3NpZGViYXJfdGVtcGxhdGUgfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy90ZW1wbGF0ZXMvbGF5b3V0J1xuXG5Nb2RlbHMgPSByZXF1aXJlICcuL21vZGVscydcbkNvbGxlY3Rpb25zID0gcmVxdWlyZSAnLi9jb2xsZWN0aW9ucydcblxuTWlzY1ZpZXdzID0gcmVxdWlyZSAnLi92aWV3cy9taXNjJ1xuU2lkZUJhclZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL3NpZGViYXInXG5cblxuQnVtYmxyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2J1bWJscidcblxuc2lkZWJhcl90ZW1wbGF0ZSA9IG1ha2Vfc2lkZWJhcl90ZW1wbGF0ZSgpXG4gIFxuXG5cbnNpZGVfYmFyX2RhdGEgPSBuZXcgQmFja2JvbmUuTW9kZWxcbiAgZW50cmllczogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdMaXN0IEJsb2dzJ1xuICAgICAgdXJsOiAnI2J1bWJsci9saXN0YmxvZ3MnXG4gICAgfVxuICAgIHtcbiAgICAgIG5hbWU6ICdTZXR0aW5ncydcbiAgICAgIHVybDogJyNidW1ibHIvc2V0dGluZ3MnXG4gICAgfVxuICAgIF1cblxuY2xhc3MgQnVtYmxlckxheW91dCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogc2lkZWJhcl90ZW1wbGF0ZVxuICByZWdpb25zOlxuICAgIHNpZGViYXI6ICcjc2lkZWJhcidcbiAgICBjb250ZW50OiAnI21haW4tY29udGVudCdcbiAgICBcbiAgXG5jbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWFpbkNvbnRyb2xsZXJcbiAgbGF5b3V0Q2xhc3M6IEJ1bWJsZXJMYXlvdXRcbiAgc2lkZWJhcmNsYXNzOiBTaWRlQmFyVmlld1xuICBzaWRlYmFyX21vZGVsOiBzaWRlX2Jhcl9kYXRhXG4gIF9tYWtlX3NpZGViYXI6IC0+XG4gICAgc2lkZWJhciA9IEBfZW1wdHlfc2lkZWJhcigpXG4gICAgdmlldyA9IG5ldyBAc2lkZWJhcmNsYXNzXG4gICAgICBtb2RlbDogQHNpZGViYXJfbW9kZWxcbiAgICBzaWRlYmFyLnNob3cgdmlld1xuICAgIFxuICBcbiAgc2V0X2hlYWRlcjogKHRpdGxlKSAtPlxuICAgIGhlYWRlciA9ICQgJyNoZWFkZXInXG4gICAgaGVhZGVyLnRleHQgdGl0bGVcbiAgICBcbiAgc3RhcnQ6IC0+XG4gICAgI2NvbnNvbGUubG9nICdidW1ibHIgc3RhcnQgY2FsbGVkJ1xuICAgIEBzZXR1cF9sYXlvdXRfaWZfbmVlZGVkKClcbiAgICBAc2V0X2hlYWRlciAnQnVtYmxyJ1xuICAgIEBsaXN0X2Jsb2dzKClcblxuICBkZWZhdWx0X3ZpZXc6IC0+XG4gICAgQHN0YXJ0KClcbiAgICBcbiAgc2hvd19tYWludmlldzogKCkgLT5cbiAgICBAX21ha2Vfc2lkZWJhcigpXG4gICAgdmlldyA9IG5ldyBNaXNjVmlld3MuTWFpbkJ1bWJsclZpZXdcbiAgICBAbGF5b3V0LnNob3dDaGlsZFZpZXcgJ2NvbnRlbnQnLCB2aWV3XG4gICAgVXRpbC5zY3JvbGxfdG9wX2Zhc3QoKVxuICAgIFxuICBzaG93X2Rhc2hib2FyZDogKCkgLT5cbiAgICBAX21ha2Vfc2lkZWJhcigpXG4gICAgdmlldyA9IG5ldyBNaXNjVmlld3MuQnVtYmxyRGFzaGJvYXJkVmlld1xuICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiAgICBVdGlsLnNjcm9sbF90b3BfZmFzdCgpXG4gICAgICBcbiAgbGlzdF9ibG9nczogKCkgLT5cbiAgICBAc2V0dXBfbGF5b3V0X2lmX25lZWRlZCgpXG4gICAgQF9tYWtlX3NpZGViYXIoKVxuICAgIHJlcXVpcmUuZW5zdXJlIFtdLCAoKSA9PlxuICAgICAgYmxvZ3MgPSBCdW1ibHJDaGFubmVsLnJlcXVlc3QgJ2dldF9sb2NhbF9ibG9ncydcbiAgICAgIFNpbXBsZUJsb2dMaXN0VmlldyA9IHJlcXVpcmUgJy4vdmlld3MvYmxvZ2xpc3QnXG4gICAgICB2aWV3ID0gbmV3IFNpbXBsZUJsb2dMaXN0Vmlld1xuICAgICAgICBjb2xsZWN0aW9uOiBibG9nc1xuICAgICAgQGxheW91dC5zaG93Q2hpbGRWaWV3ICdjb250ZW50Jywgdmlld1xuICAgICMgbmFtZSB0aGUgY2h1bmtcbiAgICAsICdidW1ibHItdmlldy1saXN0LWJsb2dzJ1xuICAgIFxuICB2aWV3X2Jsb2c6IChibG9nX2lkKSAtPlxuICAgICNjb25zb2xlLmxvZyAndmlldyBibG9nIGNhbGxlZCBmb3IgJyArIGJsb2dfaWRcbiAgICBAc2V0dXBfbGF5b3V0X2lmX25lZWRlZCgpXG4gICAgQF9tYWtlX3NpZGViYXIoKVxuICAgIHJlcXVpcmUuZW5zdXJlIFtdLCAoKSA9PlxuICAgICAgaG9zdCA9IGJsb2dfaWQgKyAnLnR1bWJsci5jb20nXG4gICAgICBjb2xsZWN0aW9uID0gQnVtYmxyQ2hhbm5lbC5yZXF1ZXN0ICdtYWtlX2Jsb2dfcG9zdF9jb2xsZWN0aW9uJywgaG9zdFxuICAgICAgQmxvZ1Bvc3RMaXN0VmlldyA9IHJlcXVpcmUgJy4vdmlld3MvcG9zdGxpc3QnXG4gICAgICByZXNwb25zZSA9IGNvbGxlY3Rpb24uZmV0Y2goKVxuICAgICAgcmVzcG9uc2UuZG9uZSA9PlxuICAgICAgICB2aWV3ID0gbmV3IEJsb2dQb3N0TGlzdFZpZXdcbiAgICAgICAgICBjb2xsZWN0aW9uOiBjb2xsZWN0aW9uXG4gICAgICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiAgICAgICAgVXRpbC5zY3JvbGxfdG9wX2Zhc3QoKVxuICAgICMgbmFtZSB0aGUgY2h1bmtcbiAgICAsICdidW1ibHItdmlldy1ibG9nLXZpZXcnXG4gICAgXG4gIGFkZF9uZXdfYmxvZzogKCkgLT5cbiAgICBAc2V0dXBfbGF5b3V0X2lmX25lZWRlZCgpXG4gICAgQF9tYWtlX3NpZGViYXIoKVxuICAgIHJlcXVpcmUuZW5zdXJlIFtdLCAoKSA9PlxuICAgICAgTmV3QmxvZ0Zvcm1WaWV3ID0gcmVxdWlyZSAnLi92aWV3cy9uZXdibG9nJ1xuICAgICAgdmlldyA9IG5ldyBOZXdCbG9nRm9ybVZpZXdcbiAgICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcbiAgICAgIFV0aWwuc2Nyb2xsX3RvcF9mYXN0KClcbiAgICAjIG5hbWUgdGhlIGNodW5rXG4gICAgLCAnYnVtYmxyLXZpZXctYWRkLWJsb2cnXG4gICAgXG4gICAgICAgICAgXG4gIHNldHRpbmdzX3BhZ2U6ICgpIC0+XG4gICAgQHNldHVwX2xheW91dF9pZl9uZWVkZWQoKVxuICAgIEBfbWFrZV9zaWRlYmFyKClcbiAgICByZXF1aXJlLmVuc3VyZSBbXSwgKCkgPT5cbiAgICAgIENvbnN1bWVyS2V5Rm9ybVZpZXcgPSByZXF1aXJlICcuL3ZpZXdzL3NldHRpbmdzZm9ybSdcbiAgICAgIHNldHRpbmdzID0gQnVtYmxyQ2hhbm5lbC5yZXF1ZXN0ICdnZXRfYXBwX3NldHRpbmdzJ1xuICAgICAgdmlldyA9IG5ldyBDb25zdW1lcktleUZvcm1WaWV3IG1vZGVsOnNldHRpbmdzXG4gICAgICBAbGF5b3V0LnNob3dDaGlsZFZpZXcgJ2NvbnRlbnQnLCB2aWV3XG4gICAgICBVdGlsLnNjcm9sbF90b3BfZmFzdCgpXG4gICAgIyBuYW1lIHRoZSBjaHVua1xuICAgICwgJ2J1bWJsci12aWV3LXNldHRpbmdzJ1xuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sbGVyXG5cbiJdfQ==
