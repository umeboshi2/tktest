var Backbone, BlogModal, BumblrChannel, Marionette, Masonry, SimpleBlogInfoView, SimpleBlogListView, blog_dialog_view, navigate_to_url, simple_blog_info, simple_blog_list, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Masonry = require('masonry-layout');

tc = require('teacup');

navigate_to_url = require('agate/src/apputil').navigate_to_url;

BumblrChannel = Backbone.Radio.channel('bumblr');

blog_dialog_view = tc.renderable(function(blog) {
  tc.div('.modal-header', function() {
    return tc.h2('This is a modal!');
  });
  tc.div('.modal-body', function() {
    return tc.p('here is some content');
  });
  return tc.div('.modal-footer', function() {
    tc.button('#modal-cancel-button.btn', 'cancel');
    return tc.button('#modal-ok-button.btn.btn-default', 'Ok');
  });
});

simple_blog_info = tc.renderable(function(blog) {
  return tc.div('.blog.listview-list-entry', function() {
    tc.a({
      href: '#bumblr/viewblog/' + blog.name
    }, blog.name);
    return tc.i(".delete-blog-button.fa.fa-close.btn.btn-default.btn-xs", {
      blog: blog.name
    });
  });
});

simple_blog_list = tc.renderable(function() {
  return tc.div(function() {
    tc.a('.btn.btn-default', {
      href: '#bumblr/addblog'
    }, "Add blog");
    return tc.div('#bloglist-container.listview-list');
  });
});

BlogModal = (function(superClass) {
  extend(BlogModal, superClass);

  function BlogModal() {
    return BlogModal.__super__.constructor.apply(this, arguments);
  }

  BlogModal.prototype.template = blog_dialog_view;

  return BlogModal;

})(Backbone.Marionette.View);

SimpleBlogInfoView = (function(superClass) {
  extend(SimpleBlogInfoView, superClass);

  function SimpleBlogInfoView() {
    return SimpleBlogInfoView.__super__.constructor.apply(this, arguments);
  }

  SimpleBlogInfoView.prototype.template = simple_blog_info;

  return SimpleBlogInfoView;

})(Backbone.Marionette.View);

SimpleBlogListView = (function(superClass) {
  extend(SimpleBlogListView, superClass);

  function SimpleBlogListView() {
    return SimpleBlogListView.__super__.constructor.apply(this, arguments);
  }

  SimpleBlogListView.prototype.childView = SimpleBlogInfoView;

  SimpleBlogListView.prototype.template = simple_blog_list;

  SimpleBlogListView.prototype.childViewContainer = '#bloglist-container';

  SimpleBlogListView.prototype.ui = {
    blogs: '#bloglist-container'
  };

  SimpleBlogListView.prototype.onDomRefresh = function() {
    var delete_buttons;
    console.log('onDomRefresh called on SimpleBlogListView');
    this.masonry = new Masonry("#bloglist-container", {
      gutter: 2,
      isInitLayout: false,
      itemSelector: '.blog',
      columnWidth: 100
    });
    delete_buttons = $('.delete-blog-button');
    delete_buttons.hide();
    delete_buttons.on('click', (function(_this) {
      return function(event) {
        var blog, id, model, target;
        target = $(event.currentTarget);
        blog = target.attr('blog');
        id = blog + ".tumblr.com";
        model = _this.collection.get(id);
        model.destroy();
        _this.masonry.reloadItems();
        return _this.masonry.layout();
      };
    })(this));
    return this.set_layout();
  };

  SimpleBlogListView.prototype.set_layout = function() {
    var blog, handlerIn, handlerOut;
    this.masonry.reloadItems();
    this.masonry.layout();
    blog = $('.blog');
    handlerIn = function(event) {
      var button;
      window.enterevent = event;
      button = $(event.target).find('.delete-blog-button');
      button.show();
      return setTimeout(function() {
        return button.hide();
      }, 2000);
    };
    handlerOut = function(event) {
      var button;
      window.leaveevent = event;
      button = $(event.target).find('.delete-blog-button');
      return button.hide();
    };
    return blog.hover(handlerIn, handlerOut);
  };

  return SimpleBlogListView;

})(Backbone.Marionette.CompositeView);

module.exports = SimpleBlogListView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvdmlld3MvYmxvZ2xpc3QuanMiLCJzb3VyY2VzIjpbImFwcGxldHMvYnVtYmxyL3ZpZXdzL2Jsb2dsaXN0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDBLQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLE9BQUEsR0FBVSxPQUFBLENBQVEsZ0JBQVI7O0FBQ1YsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUlILGtCQUFvQixPQUFBLENBQVEsbUJBQVI7O0FBRXRCLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUdoQixnQkFBQSxHQUFtQixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsSUFBRDtFQUMvQixFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0IsU0FBQTtXQUN0QixFQUFFLENBQUMsRUFBSCxDQUFNLGtCQUFOO0VBRHNCLENBQXhCO0VBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBQXNCLFNBQUE7V0FDcEIsRUFBRSxDQUFDLENBQUgsQ0FBSyxzQkFBTDtFQURvQixDQUF0QjtTQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixTQUFBO0lBQ3RCLEVBQUUsQ0FBQyxNQUFILENBQVUsMEJBQVYsRUFBc0MsUUFBdEM7V0FDQSxFQUFFLENBQUMsTUFBSCxDQUFVLGtDQUFWLEVBQThDLElBQTlDO0VBRnNCLENBQXhCO0FBTCtCLENBQWQ7O0FBU25CLGdCQUFBLEdBQW1CLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxJQUFEO1NBQy9CLEVBQUUsQ0FBQyxHQUFILENBQU8sMkJBQVAsRUFBb0MsU0FBQTtJQUNsQyxFQUFFLENBQUMsQ0FBSCxDQUFLO01BQUEsSUFBQSxFQUFLLG1CQUFBLEdBQXNCLElBQUksQ0FBQyxJQUFoQztLQUFMLEVB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QU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuTWFzb25yeSA9IHJlcXVpcmUgJ21hc29ucnktbGF5b3V0J1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbiNyZXF1aXJlICdqcXVlcnktdWknXG5cbnsgbmF2aWdhdGVfdG9fdXJsIH0gPSByZXF1aXJlICdhZ2F0ZS9zcmMvYXBwdXRpbCdcblxuQnVtYmxyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2J1bWJscidcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuYmxvZ19kaWFsb2dfdmlldyA9IHRjLnJlbmRlcmFibGUgKGJsb2cpIC0+XG4gIHRjLmRpdiAnLm1vZGFsLWhlYWRlcicsIC0+XG4gICAgdGMuaDIgJ1RoaXMgaXMgYSBtb2RhbCEnXG4gIHRjLmRpdiAnLm1vZGFsLWJvZHknLCAtPlxuICAgIHRjLnAgJ2hlcmUgaXMgc29tZSBjb250ZW50J1xuICB0Yy5kaXYgJy5tb2RhbC1mb290ZXInLCAtPlxuICAgIHRjLmJ1dHRvbiAnI21vZGFsLWNhbmNlbC1idXR0b24uYnRuJywgJ2NhbmNlbCdcbiAgICB0Yy5idXR0b24gJyNtb2RhbC1vay1idXR0b24uYnRuLmJ0bi1kZWZhdWx0JywgJ09rJ1xuXG5zaW1wbGVfYmxvZ19pbmZvID0gdGMucmVuZGVyYWJsZSAoYmxvZykgLT5cbiAgdGMuZGl2ICcuYmxvZy5saXN0dmlldy1saXN0LWVudHJ5JywgLT5cbiAgICB0Yy5hIGhyZWY6JyNidW1ibHIvdmlld2Jsb2cvJyArIGJsb2cubmFtZSwgYmxvZy5uYW1lXG4gICAgdGMuaSBcIi5kZWxldGUtYmxvZy1idXR0b24uZmEuZmEtY2xvc2UuYnRuLmJ0bi1kZWZhdWx0LmJ0bi14c1wiLFxuICAgIGJsb2c6YmxvZy5uYW1lXG5cbnNpbXBsZV9ibG9nX2xpc3QgPSB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gIHRjLmRpdiAtPlxuICAgIHRjLmEgJy5idG4uYnRuLWRlZmF1bHQnLCBocmVmOicjYnVtYmxyL2FkZGJsb2cnLCBcIkFkZCBibG9nXCJcbiAgICB0Yy5kaXYgJyNibG9nbGlzdC1jb250YWluZXIubGlzdHZpZXctbGlzdCdcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuY2xhc3MgQmxvZ01vZGFsIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBibG9nX2RpYWxvZ192aWV3XG5cbmNsYXNzIFNpbXBsZUJsb2dJbmZvVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogc2ltcGxlX2Jsb2dfaW5mb1xuXG5jbGFzcyBTaW1wbGVCbG9nTGlzdFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXdcbiAgY2hpbGRWaWV3OiBTaW1wbGVCbG9nSW5mb1ZpZXdcbiAgdGVtcGxhdGU6IHNpbXBsZV9ibG9nX2xpc3RcbiAgY2hpbGRWaWV3Q29udGFpbmVyOiAnI2Jsb2dsaXN0LWNvbnRhaW5lcidcbiAgdWk6XG4gICAgYmxvZ3M6ICcjYmxvZ2xpc3QtY29udGFpbmVyJ1xuXG4gIG9uRG9tUmVmcmVzaDogKCkgLT5cbiAgICBjb25zb2xlLmxvZyAnb25Eb21SZWZyZXNoIGNhbGxlZCBvbiBTaW1wbGVCbG9nTGlzdFZpZXcnXG4gICAgQG1hc29ucnkgPSBuZXcgTWFzb25yeSBcIiNibG9nbGlzdC1jb250YWluZXJcIixcbiAgICAgIGd1dHRlcjogMlxuICAgICAgaXNJbml0TGF5b3V0OiBmYWxzZVxuICAgICAgaXRlbVNlbGVjdG9yOiAnLmJsb2cnXG4gICAgICBjb2x1bW5XaWR0aDogMTAwXG4gICAgZGVsZXRlX2J1dHRvbnMgPSAkICcuZGVsZXRlLWJsb2ctYnV0dG9uJ1xuICAgIGRlbGV0ZV9idXR0b25zLmhpZGUoKVxuICAgIGRlbGV0ZV9idXR0b25zLm9uICdjbGljaycsIChldmVudCkgPT5cbiAgICAgIHRhcmdldCA9ICQgZXZlbnQuY3VycmVudFRhcmdldFxuICAgICAgYmxvZyA9IHRhcmdldC5hdHRyICdibG9nJ1xuICAgICAgaWQgPSBcIiN7YmxvZ30udHVtYmxyLmNvbVwiXG4gICAgICBtb2RlbCA9IEBjb2xsZWN0aW9uLmdldCBpZFxuICAgICAgbW9kZWwuZGVzdHJveSgpXG4gICAgICAjY29uc29sZS5sb2cgXCJEZWxldGUgI3tibG9nfVwiXG4gICAgICBAbWFzb25yeS5yZWxvYWRJdGVtcygpXG4gICAgICBAbWFzb25yeS5sYXlvdXQoKVxuICAgIEBzZXRfbGF5b3V0KClcblxuICBzZXRfbGF5b3V0OiAtPlxuICAgIEBtYXNvbnJ5LnJlbG9hZEl0ZW1zKClcbiAgICBAbWFzb25yeS5sYXlvdXQoKVxuICAgIGJsb2cgPSAkICcuYmxvZydcbiAgICBoYW5kbGVySW4gPSAoZXZlbnQpIC0+XG4gICAgICB3aW5kb3cuZW50ZXJldmVudCA9IGV2ZW50XG4gICAgICBidXR0b24gPSAkKGV2ZW50LnRhcmdldCkuZmluZCAnLmRlbGV0ZS1ibG9nLWJ1dHRvbidcbiAgICAgIGJ1dHRvbi5zaG93KClcbiAgICAgICMgc2V0IGJ1dHRvbiB0byBkaXNhcHBlYXIgYWZ0ZXIgdHdvIHNlY29uZHNcbiAgICAgICMgd2l0aG91dCB0aGlzLCBzb21lIGJ1dHRvbnMgYXBwZWFyIHRvIHN0aWNrXG4gICAgICAjIGFuZCBzdGF5IHdoZW4gdGhlIG1vdXNlIGp1bXBzIGJldHdlZW4gZW50cmllc1xuICAgICAgIyB0b28gcXVpY2tseS5cbiAgICAgICMgRklYTUUgY29uZmlndXJlIHRpbWUgZWxzZXdoZXJlP1xuICAgICAgc2V0VGltZW91dCAoKSAtPlxuICAgICAgICBidXR0b24uaGlkZSgpXG4gICAgICAsIDIwMDAgXG4gICAgaGFuZGxlck91dCA9IChldmVudCkgLT5cbiAgICAgIHdpbmRvdy5sZWF2ZWV2ZW50ID0gZXZlbnRcbiAgICAgIGJ1dHRvbiA9ICQoZXZlbnQudGFyZ2V0KS5maW5kICcuZGVsZXRlLWJsb2ctYnV0dG9uJ1xuICAgICAgYnV0dG9uLmhpZGUoKVxuICAgIGJsb2cuaG92ZXIgaGFuZGxlckluLCBoYW5kbGVyT3V0XG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlQmxvZ0xpc3RWaWV3XG4iXX0=
