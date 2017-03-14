var Backbone, BlogPostListView, BumblrChannel, Marionette, Masonry, SimpleBlogPostView, imagesLoaded, navigate_to_url, simple_post_page_view, simple_post_view, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Masonry = require('masonry-layout');

imagesLoaded = require('imagesloaded');

tc = require('teacup');

navigate_to_url = require('agate/src/apputil').navigate_to_url;

BumblrChannel = Backbone.Radio.channel('bumblr');

simple_post_page_view = tc.renderable(function() {
  tc.div('.mytoolbar.row', function() {
    return tc.ul('.pager', function() {
      tc.li('.previous', function() {
        return tc.i('#prev-page-button.fa.fa-arrow-left.btn.btn-default');
      });
      tc.li(function() {
        return tc.i('#slideshow-button.fa.fa-play.btn.btn-default');
      });
      return tc.li('.next', function() {
        return tc.i('#next-page-button.fa.fa-arrow-right.btn.btn-default');
      });
    });
  });
  return tc.div('#posts-container.row');
});

simple_post_view = tc.renderable(function(post) {
  return tc.div('.listview-list-entry', function() {
    return tc.span(function() {
      var current_size, current_width, i, len, photo, ref, size;
      photo = post.photos[0];
      current_width = 0;
      current_size = null;
      ref = photo.alt_sizes;
      for (i = 0, len = ref.length; i < len; i++) {
        size = ref[i];
        if (size.width > current_width && size.width < 250) {
          current_size = size;
          current_width = size.width;
        }
      }
      size = current_size;
      return tc.a({
        href: post.post_url,
        target: '_blank'
      }, function() {
        return tc.img({
          src: size.url
        });
      });
    });
  });
});

SimpleBlogPostView = (function(superClass) {
  extend(SimpleBlogPostView, superClass);

  function SimpleBlogPostView() {
    return SimpleBlogPostView.__super__.constructor.apply(this, arguments);
  }

  SimpleBlogPostView.prototype.template = simple_post_view;

  SimpleBlogPostView.prototype.className = 'post';

  return SimpleBlogPostView;

})(Backbone.Marionette.View);

BlogPostListView = (function(superClass) {
  extend(BlogPostListView, superClass);

  function BlogPostListView() {
    this.keydownHandler = bind(this.keydownHandler, this);
    return BlogPostListView.__super__.constructor.apply(this, arguments);
  }

  BlogPostListView.prototype.template = simple_post_page_view;

  BlogPostListView.prototype.childView = SimpleBlogPostView;

  BlogPostListView.prototype.childViewContainer = '#posts-container';

  BlogPostListView.prototype.ui = {
    posts: '#posts-container',
    slideshow_button: '#slideshow-button',
    next_button: '#next-page-button',
    prev_putton: '#prev-page-button'
  };

  BlogPostListView.prototype.events = {
    'click @ui.prev_putton': 'get_prev_page',
    'click @ui.next_button': 'get_next_page',
    'click @ui.slideshow_button': 'manage_slideshow'
  };

  BlogPostListView.prototype.keycommands = {
    prev: 65,
    next: 90
  };

  BlogPostListView.prototype.manage_slideshow = function() {
    var button;
    button = this.ui.slideshow_button;
    if (button.hasClass('fa-play')) {
      return this.start_slideshow();
    } else {
      return this.stop_slideshow();
    }
  };

  BlogPostListView.prototype.start_slideshow = function() {
    console.log("start slideshow");
    this.slideshow_handler = setInterval((function(_this) {
      return function() {
        console.log("getting next page");
        return _this.get_next_page();
      };
    })(this), 6000);
    this.ui.slideshow_button.removeClass('fa-play');
    return this.ui.slideshow_button.addClass('fa-stop');
  };

  BlogPostListView.prototype.stop_slideshow = function() {
    clearInterval(this.slideshow_handler);
    this.ui.slideshow_button.removeClass('fa-stop');
    return this.ui.slideshow_button.addClass('fa-play');
  };

  BlogPostListView.prototype.get_next_page = function() {
    var response;
    this.ui.posts.hide();
    response = this.collection.getNextPage();
    return response.done((function(_this) {
      return function() {
        return _this.set_image_layout();
      };
    })(this));
  };

  BlogPostListView.prototype.get_prev_page = function() {
    var response;
    response = this.collection.getPreviousPage();
    return response.done((function(_this) {
      return function() {
        return _this.set_image_layout();
      };
    })(this));
  };

  BlogPostListView.prototype.get_another_page = function(direction) {
    var response;
    this.ui.posts.hide();
    switch (direction) {
      case 'prev':
        response = this.collection.getPreviousPage();
        break;
      case 'next':
        response = this.collection.getNextPage();
        break;
      default:
        response = null;
    }
    if (response) {
      return response.done((function(_this) {
        return function() {
          return _this.set_image_layout();
        };
      })(this));
    }
  };

  BlogPostListView.prototype.handle_key_command = function(command) {
    if (command === 'prev' || command === 'next') {
      return this.get_another_page(command);
    }
  };

  BlogPostListView.prototype.keydownHandler = function(event_object) {
    var key, ref, results, value;
    ref = this.keycommands;
    results = [];
    for (key in ref) {
      value = ref[key];
      if (event_object.keyCode === value) {
        results.push(this.handle_key_command(key));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  BlogPostListView.prototype.set_image_layout = function() {
    var items;
    items = $('.post');
    return imagesLoaded(items, (function(_this) {
      return function() {
        _this.ui.posts.show();
        _this.masonry.reloadItems();
        return _this.masonry.layout();
      };
    })(this));
  };

  BlogPostListView.prototype.onDomRefresh = function() {
    $('html').keydown(this.keydownHandler);
    this.masonry = new Masonry("#posts-container", {
      gutter: 2,
      isInitLayout: false,
      itemSelector: '.post'
    });
    return this.set_image_layout();
  };

  BlogPostListView.prototype.onBeforeDestroy = function() {
    $('html').unbind('keydown', this.keydownHandler);
    return this.stop_slideshow();
  };

  return BlogPostListView;

})(Backbone.Marionette.CompositeView);

module.exports = BlogPostListView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvdmlld3MvcG9zdGxpc3QuanMiLCJzb3VyY2VzIjpbImFwcGxldHMvYnVtYmxyL3ZpZXdzL3Bvc3RsaXN0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDhKQUFBO0VBQUE7Ozs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLGdCQUFSOztBQUNWLFlBQUEsR0FBZSxPQUFBLENBQVEsY0FBUjs7QUFDZixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBS0gsa0JBQW9CLE9BQUEsQ0FBUSxtQkFBUjs7QUFFdEIsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBR2hCLHFCQUFBLEdBQXdCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQTtFQUNwQyxFQUFFLENBQUMsR0FBSCxDQUFPLGdCQUFQLEVBQXlCLFNBQUE7V0FDdkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFOLEVBQWdCLFNBQUE7TUFDZCxFQUFFLENBQUMsRUFBSCxDQUFNLFdBQU4sRUFBbUIsU0FBQTtlQUNqQixFQUFFLENBQUMsQ0FBSCxDQUFLLG9EQUFMO01BRGlCLENBQW5CO01BRUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxTQUFBO2VBQ0osRUFBRSxDQUFDLENBQUgsQ0FBSyw4Q0FBTDtNQURJLENBQU47YUFFQSxFQUFFLENBQUMsRUFBSCxDQUFNLE9BQU4sRUFBZSxTQUFBO2VBQ2IsRUFBRSxDQUFDLENBQUgsQ0FBSyxxREFBTDtNQURhLENBQWY7SUFMYyxDQUFoQjtFQUR1QixDQUF6QjtTQVVBLEVBQUUsQ0FBQyxHQUFILENBQU8sc0JBQVA7QUFYb0MsQ0FBZDs7QUFheEIsZ0JBQUEsR0FBbUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLElBQUQ7U0FDL0IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxz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QixnQkFBQSxHQUFrQixTQUFBO0FBQ2hCLFFBQUE7SUFBQSxLQUFBLEdBQVEsQ0FBQSxDQUFFLE9BQUY7V0FDUixZQUFBLENBQWEsS0FBYixFQUFvQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDbEIsS0FBQyxDQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBVixDQUFBO1FBRUEsS0FBQyxDQUFBLE9BQU8sQ0FBQyxXQUFULENBQUE7ZUFDQSxLQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FBQTtNQUprQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEI7RUFGZ0I7OzZCQVFsQixZQUFBLEdBQWMsU0FBQTtJQUNaLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxPQUFWLENBQWtCLElBQUMsQ0FBQSxjQUFuQjtJQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBSSxPQUFKLENBQVksa0JBQVosRUFDVDtNQUFBLE1BQUEsRUFBUSxDQUFSO01BQ0EsWUFBQSxFQUFjLEtBRGQ7TUFFQSxZQUFBLEVBQWMsT0FGZDtLQURTO1dBSVgsSUFBQyxDQUFBLGdCQUFELENBQUE7RUFOWTs7NkJBUWQsZUFBQSxHQUFpQixTQUFBO0lBRWYsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQVYsQ0FBaUIsU0FBakIsRUFBNEIsSUFBQyxDQUFBLGNBQTdCO1dBQ0EsSUFBQyxDQUFBLGNBQUQsQ0FBQTtFQUhlOzs7O0dBeEZZLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBK0ZuRCxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbk1hc29ucnkgPSByZXF1aXJlICdtYXNvbnJ5LWxheW91dCdcbmltYWdlc0xvYWRlZCA9IHJlcXVpcmUgJ2ltYWdlc2xvYWRlZCdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5cbiNyZXF1aXJlICdqcXVlcnktdWknXG5cbnsgbmF2aWdhdGVfdG9fdXJsIH0gPSByZXF1aXJlICdhZ2F0ZS9zcmMvYXBwdXRpbCdcblxuQnVtYmxyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2J1bWJscidcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuc2ltcGxlX3Bvc3RfcGFnZV92aWV3ID0gdGMucmVuZGVyYWJsZSAoKSAtPlxuICB0Yy5kaXYgJy5teXRvb2xiYXIucm93JywgLT5cbiAgICB0Yy51bCAnLnBhZ2VyJywgLT5cbiAgICAgIHRjLmxpICcucHJldmlvdXMnLCAtPlxuICAgICAgICB0Yy5pICcjcHJldi1wYWdlLWJ1dHRvbi5mYS5mYS1hcnJvdy1sZWZ0LmJ0bi5idG4tZGVmYXVsdCdcbiAgICAgIHRjLmxpIC0+XG4gICAgICAgIHRjLmkgJyNzbGlkZXNob3ctYnV0dG9uLmZhLmZhLXBsYXkuYnRuLmJ0bi1kZWZhdWx0J1xuICAgICAgdGMubGkgJy5uZXh0JywgLT5cbiAgICAgICAgdGMuaSAnI25leHQtcGFnZS1idXR0b24uZmEuZmEtYXJyb3ctcmlnaHQuYnRuLmJ0bi1kZWZhdWx0J1xuICAgICNpY29uICcjcHJldi1wYWdlLWJ1dHRvbi5mYS5mYS1hcnJvdy1sZWZ0LmJ0bi5idG4tZGVmYXVsdC5wdWxsLWxlZnQnXG4gICAgI2ljb24gJyNzbGlkZXNob3ctYnV0dG9uLmZhLmZhLXBsYXkuYnRuLmJ0bi1kZWZhdWx0J1xuICB0Yy5kaXYgJyNwb3N0cy1jb250YWluZXIucm93J1xuXG5zaW1wbGVfcG9zdF92aWV3ID0gdGMucmVuZGVyYWJsZSAocG9zdCkgLT5cbiAgdGMuZGl2ICcubGlzdHZpZXctbGlzdC1lbnRyeScsIC0+XG4gICAgI3AgLT5cbiAgICAjIGEgaHJlZjpwb3N0LnBvc3RfdXJsLCB0YXJnZXQ6J19ibGFuaycsIHBvc3QuYmxvZ19uYW1lXG4gICAgdGMuc3BhbiAtPlxuICAgICAgI2ZvciBwaG90byBpbiBwb3N0LnBob3Rvc1xuICAgICAgcGhvdG8gPSBwb3N0LnBob3Rvc1swXVxuICAgICAgY3VycmVudF93aWR0aCA9IDBcbiAgICAgIGN1cnJlbnRfc2l6ZSA9IG51bGxcbiAgICAgIGZvciBzaXplIGluIHBob3RvLmFsdF9zaXplc1xuICAgICAgICBpZiBzaXplLndpZHRoID4gY3VycmVudF93aWR0aCBhbmQgc2l6ZS53aWR0aCA8IDI1MFxuICAgICAgICAgIGN1cnJlbnRfc2l6ZSA9IHNpemVcbiAgICAgICAgICBjdXJyZW50X3dpZHRoID0gc2l6ZS53aWR0aFxuICAgICAgc2l6ZSA9IGN1cnJlbnRfc2l6ZSBcbiAgICAgIHRjLmEgaHJlZjpwb3N0LnBvc3RfdXJsLCB0YXJnZXQ6J19ibGFuaycsIC0+XG4gICAgICAgIHRjLmltZyBzcmM6c2l6ZS51cmxcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuY2xhc3MgU2ltcGxlQmxvZ1Bvc3RWaWV3IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBzaW1wbGVfcG9zdF92aWV3XG4gIGNsYXNzTmFtZTogJ3Bvc3QnXG5cblxuXG5cbmNsYXNzIEJsb2dQb3N0TGlzdFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXdcbiAgdGVtcGxhdGU6IHNpbXBsZV9wb3N0X3BhZ2Vfdmlld1xuICBjaGlsZFZpZXc6IFNpbXBsZUJsb2dQb3N0Vmlld1xuICBjaGlsZFZpZXdDb250YWluZXI6ICcjcG9zdHMtY29udGFpbmVyJ1xuICB1aTpcbiAgICBwb3N0czogJyNwb3N0cy1jb250YWluZXInXG4gICAgc2xpZGVzaG93X2J1dHRvbjogJyNzbGlkZXNob3ctYnV0dG9uJ1xuICAgIG5leHRfYnV0dG9uOiAnI25leHQtcGFnZS1idXR0b24nXG4gICAgcHJldl9wdXR0b246ICcjcHJldi1wYWdlLWJ1dHRvbidcbiAgICBcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkucHJldl9wdXR0b24nOiAnZ2V0X3ByZXZfcGFnZSdcbiAgICAnY2xpY2sgQHVpLm5leHRfYnV0dG9uJzogJ2dldF9uZXh0X3BhZ2UnXG4gICAgJ2NsaWNrIEB1aS5zbGlkZXNob3dfYnV0dG9uJzogJ21hbmFnZV9zbGlkZXNob3cnXG5cbiAga2V5Y29tbWFuZHM6XG4gICAgcHJldjogNjVcbiAgICBuZXh0OiA5MFxuXG4gIG1hbmFnZV9zbGlkZXNob3c6ICgpIC0+XG4gICAgYnV0dG9uID0gQHVpLnNsaWRlc2hvd19idXR0b25cbiAgICBpZiBidXR0b24uaGFzQ2xhc3MgJ2ZhLXBsYXknXG4gICAgICBAc3RhcnRfc2xpZGVzaG93KClcbiAgICBlbHNlXG4gICAgICBAc3RvcF9zbGlkZXNob3coKVxuXG5cbiAgc3RhcnRfc2xpZGVzaG93OiAoKSAtPlxuICAgIGNvbnNvbGUubG9nIFwic3RhcnQgc2xpZGVzaG93XCJcbiAgICBAc2xpZGVzaG93X2hhbmRsZXIgPSBzZXRJbnRlcnZhbCA9PlxuICAgICAgY29uc29sZS5sb2cgXCJnZXR0aW5nIG5leHQgcGFnZVwiXG4gICAgICBAZ2V0X25leHRfcGFnZSgpXG4gICAgLCA2MDAwXG4gICAgQHVpLnNsaWRlc2hvd19idXR0b24ucmVtb3ZlQ2xhc3MgJ2ZhLXBsYXknXG4gICAgQHVpLnNsaWRlc2hvd19idXR0b24uYWRkQ2xhc3MgJ2ZhLXN0b3AnXG5cbiAgc3RvcF9zbGlkZXNob3c6ICgpIC0+XG4gICAgY2xlYXJJbnRlcnZhbCBAc2xpZGVzaG93X2hhbmRsZXJcbiAgICBAdWkuc2xpZGVzaG93X2J1dHRvbi5yZW1vdmVDbGFzcyAnZmEtc3RvcCdcbiAgICBAdWkuc2xpZGVzaG93X2J1dHRvbi5hZGRDbGFzcyAnZmEtcGxheSdcblxuICBnZXRfbmV4dF9wYWdlOiAoKSAtPlxuICAgIEB1aS5wb3N0cy5oaWRlKClcbiAgICByZXNwb25zZSA9IEBjb2xsZWN0aW9uLmdldE5leHRQYWdlKClcbiAgICByZXNwb25zZS5kb25lID0+XG4gICAgICBAc2V0X2ltYWdlX2xheW91dCgpXG5cbiAgZ2V0X3ByZXZfcGFnZTogKCkgLT5cbiAgICByZXNwb25zZSA9IEBjb2xsZWN0aW9uLmdldFByZXZpb3VzUGFnZSgpXG4gICAgcmVzcG9uc2UuZG9uZSA9PlxuICAgICAgQHNldF9pbWFnZV9sYXlvdXQoKVxuXG4gIGdldF9hbm90aGVyX3BhZ2U6IChkaXJlY3Rpb24pIC0+XG4gICAgQHVpLnBvc3RzLmhpZGUoKVxuICAgIHN3aXRjaCBkaXJlY3Rpb25cbiAgICAgIHdoZW4gJ3ByZXYnIHRoZW4gcmVzcG9uc2UgPSBAY29sbGVjdGlvbi5nZXRQcmV2aW91c1BhZ2UoKVxuICAgICAgd2hlbiAnbmV4dCcgdGhlbiByZXNwb25zZSA9IEBjb2xsZWN0aW9uLmdldE5leHRQYWdlKClcbiAgICAgIGVsc2UgcmVzcG9uc2UgPSBudWxsXG4gICAgaWYgcmVzcG9uc2VcbiAgICAgIHJlc3BvbnNlLmRvbmUgPT5cbiAgICAgICAgQHNldF9pbWFnZV9sYXlvdXQoKVxuXG4gIGhhbmRsZV9rZXlfY29tbWFuZDogKGNvbW1hbmQpIC0+XG4gICAgaWYgY29tbWFuZCBpbiBbJ3ByZXYnLCAnbmV4dCddXG4gICAgICBAZ2V0X2Fub3RoZXJfcGFnZSBjb21tYW5kXG5cbiAga2V5ZG93bkhhbmRsZXI6IChldmVudF9vYmplY3QpID0+XG4gICAgI2NvbnNvbGUubG9nICdrZXlkb3duSGFuZGxlciAnICsgZXZlbnRfb2JqZWN0XG4gICAgZm9yIGtleSwgdmFsdWUgb2YgQGtleWNvbW1hbmRzXG4gICAgICBpZiBldmVudF9vYmplY3Qua2V5Q29kZSA9PSB2YWx1ZVxuICAgICAgICBAaGFuZGxlX2tleV9jb21tYW5kIGtleVxuXG4gIHNldF9pbWFnZV9sYXlvdXQ6IC0+XG4gICAgaXRlbXMgPSAkICcucG9zdCdcbiAgICBpbWFnZXNMb2FkZWQgaXRlbXMsID0+XG4gICAgICBAdWkucG9zdHMuc2hvdygpXG4gICAgICAjY29uc29sZS5sb2cgXCJJbWFnZXMgTG9hZGVkPi4uXCJcbiAgICAgIEBtYXNvbnJ5LnJlbG9hZEl0ZW1zKClcbiAgICAgIEBtYXNvbnJ5LmxheW91dCgpICAgICAgXG5cbiAgb25Eb21SZWZyZXNoOiAoKSAtPlxuICAgICQoJ2h0bWwnKS5rZXlkb3duIEBrZXlkb3duSGFuZGxlclxuICAgIEBtYXNvbnJ5ID0gbmV3IE1hc29ucnkgXCIjcG9zdHMtY29udGFpbmVyXCIsXG4gICAgICBndXR0ZXI6IDJcbiAgICAgIGlzSW5pdExheW91dDogZmFsc2VcbiAgICAgIGl0ZW1TZWxlY3RvcjogJy5wb3N0J1xuICAgIEBzZXRfaW1hZ2VfbGF5b3V0KClcblxuICBvbkJlZm9yZURlc3Ryb3k6ICgpIC0+XG4gICAgI2NvbnNvbGUubG9nIFwiUmVtb3ZlIEBrZXlkb3duSGFuZGxlclwiICsgQGtleWRvd25IYW5kbGVyXG4gICAgJCgnaHRtbCcpLnVuYmluZCAna2V5ZG93bicsIEBrZXlkb3duSGFuZGxlclxuICAgIEBzdG9wX3NsaWRlc2hvdygpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJsb2dQb3N0TGlzdFZpZXdcbiJdfQ==
