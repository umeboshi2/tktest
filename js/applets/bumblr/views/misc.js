var Backbone, BumblrChannel, BumblrDashboardView, MainBumblrView, Marionette, bumblr_dashboard_view, main_bumblr_view, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

BumblrChannel = Backbone.Radio.channel('bumblr');

main_bumblr_view = tc.renderable(function(model) {
  return tc.p('main bumblr view');
});

bumblr_dashboard_view = tc.renderable(function(model) {
  return tc.p('bumblr_dashboard_view');
});

MainBumblrView = (function(superClass) {
  extend(MainBumblrView, superClass);

  function MainBumblrView() {
    return MainBumblrView.__super__.constructor.apply(this, arguments);
  }

  MainBumblrView.prototype.template = main_bumblr_view;

  return MainBumblrView;

})(Backbone.Marionette.View);

BumblrDashboardView = (function(superClass) {
  extend(BumblrDashboardView, superClass);

  function BumblrDashboardView() {
    return BumblrDashboardView.__super__.constructor.apply(this, arguments);
  }

  BumblrDashboardView.prototype.template = bumblr_dashboard_view;

  return BumblrDashboardView;

})(Backbone.Marionette.View);

module.exports = {
  MainBumblrView: MainBumblrView,
  BumblrDashboardView: BumblrDashboardView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvdmlld3MvbWlzYy5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9idW1ibHIvdmlld3MvbWlzYy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxxSEFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBR0wsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBR2hCLGdCQUFBLEdBQW1CLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1NBQy9CLEVBQUUsQ0FBQyxDQUFILENBQUssa0JBQUw7QUFEK0IsQ0FBZDs7QUFHbkIscUJBQUEsR0FBd0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7U0FDcEMsRUFBRSxDQUFDLENBQUgsQ0FBSyx1QkFBTDtBQURvQyxDQUFkOztBQUtsQjs7Ozs7OzsyQkFDSixRQUFBLEdBQVU7Ozs7R0FEaUIsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFHM0M7Ozs7Ozs7Z0NBQ0osUUFBQSxHQUFVOzs7O0dBRHNCLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBR3RELE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxjQUFBLEVBQWdCLGNBQWhCO0VBQ0EsbUJBQUEsRUFBcUIsbUJBRHJCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cblxuQnVtYmxyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2J1bWJscidcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xubWFpbl9idW1ibHJfdmlldyA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICB0Yy5wICdtYWluIGJ1bWJsciB2aWV3J1xuXG5idW1ibHJfZGFzaGJvYXJkX3ZpZXcgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMucCAnYnVtYmxyX2Rhc2hib2FyZF92aWV3J1xuXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbmNsYXNzIE1haW5CdW1ibHJWaWV3IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBtYWluX2J1bWJscl92aWV3XG5cbmNsYXNzIEJ1bWJsckRhc2hib2FyZFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IGJ1bWJscl9kYXNoYm9hcmRfdmlld1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIE1haW5CdW1ibHJWaWV3OiBNYWluQnVtYmxyVmlld1xuICBCdW1ibHJEYXNoYm9hcmRWaWV3OiBCdW1ibHJEYXNoYm9hcmRWaWV3XG4iXX0=
