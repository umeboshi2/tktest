var Backbone, BaseSideBarView, BumblrChannel, Marionette, navigate_to_url, sidebar_template, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

navigate_to_url = require('agate/src/apputil').navigate_to_url;

BumblrChannel = Backbone.Radio.channel('bumblr');

sidebar_template = tc.renderable(function(model) {
  return tc.div('.sidebar-menu.btn-group-vertical', function() {
    var entry, i, len, ref, results;
    ref = model.entries;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      entry = ref[i];
      results.push(tc.button('.sidebar-entry-button.btn.btn-default', {
        'button-url': entry.url
      }, function() {
        return tc.text(entry.name);
      }));
    }
    return results;
  });
});

BaseSideBarView = (function(superClass) {
  extend(BaseSideBarView, superClass);

  function BaseSideBarView() {
    return BaseSideBarView.__super__.constructor.apply(this, arguments);
  }

  BaseSideBarView.prototype.template = sidebar_template;

  BaseSideBarView.prototype.events = {
    'click .sidebar-entry-button': 'sidebar_button_pressed'
  };

  BaseSideBarView.prototype.sidebar_button_pressed = function(event) {
    var url;
    url = event.currentTarget.getAttribute('button-url');
    return navigate_to_url(url);
  };

  return BaseSideBarView;

})(Backbone.Marionette.View);

module.exports = BaseSideBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvdmlld3Mvc2lkZWJhci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9idW1ibHIvdmlld3Mvc2lkZWJhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSwyRkFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUgsa0JBQW9CLE9BQUEsQ0FBUSxtQkFBUjs7QUFFdEIsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBR2hCLGdCQUFBLEdBQW1CLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1NBQy9CLEVBQUUsQ0FBQyxHQUFILENBQU8sa0NBQVAsRUFBMkMsU0FBQTtBQUN6QyxRQUFBO0FBQUE7QUFBQTtTQUFBLHFDQUFBOzttQkFDRSxFQUFFLENBQUMsTUFBSCxDQUFVLHVDQUFWLEVBQ0E7UUFBQSxZQUFBLEVBQWEsS0FBSyxDQUFDLEdBQW5CO09BREEsRUFDd0IsU0FBQTtlQUN0QixFQUFFLENBQUMsSUFBSCxDQUFRLEtBQUssQ0FBQyxJQUFkO01BRHNCLENBRHhCO0FBREY7O0VBRHlDLENBQTNDO0FBRCtCLENBQWQ7O0FBT2I7Ozs7Ozs7NEJBQ0osUUFBQSxHQUFVOzs0QkFDVixNQUFBLEdBQ0U7SUFBQSw2QkFBQSxFQUErQix3QkFBL0I7Ozs0QkFFRixzQkFBQSxHQUF3QixTQUFDLEtBQUQ7QUFFdEIsUUFBQTtJQUFBLEdBQUEsR0FBTSxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQXBCLENBQWlDLFlBQWpDO1dBQ04sZUFBQSxDQUFnQixHQUFoQjtFQUhzQjs7OztHQUxJLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBV2xELE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbnsgbmF2aWdhdGVfdG9fdXJsIH0gPSByZXF1aXJlICdhZ2F0ZS9zcmMvYXBwdXRpbCdcblxuQnVtYmxyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2J1bWJscidcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuc2lkZWJhcl90ZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICB0Yy5kaXYgJy5zaWRlYmFyLW1lbnUuYnRuLWdyb3VwLXZlcnRpY2FsJywgLT5cbiAgICBmb3IgZW50cnkgaW4gbW9kZWwuZW50cmllc1xuICAgICAgdGMuYnV0dG9uICcuc2lkZWJhci1lbnRyeS1idXR0b24uYnRuLmJ0bi1kZWZhdWx0JyxcbiAgICAgICdidXR0b24tdXJsJzplbnRyeS51cmwsIC0+XG4gICAgICAgIHRjLnRleHQgZW50cnkubmFtZSAgICAgICAgICBcblxuY2xhc3MgQmFzZVNpZGVCYXJWaWV3IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBzaWRlYmFyX3RlbXBsYXRlXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgLnNpZGViYXItZW50cnktYnV0dG9uJzogJ3NpZGViYXJfYnV0dG9uX3ByZXNzZWQnXG5cbiAgc2lkZWJhcl9idXR0b25fcHJlc3NlZDogKGV2ZW50KSAtPlxuICAgICNjb25zb2xlLmxvZyBcIlNpZGViYXJfYnV0dG9uX3ByZXNzZWRcIlxuICAgIHVybCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlICdidXR0b24tdXJsJ1xuICAgIG5hdmlnYXRlX3RvX3VybCB1cmxcbiAgICAgIFxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VTaWRlQmFyVmlld1xuIl19
