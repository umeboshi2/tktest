var Backbone, HubChannel, ListMeetingsView, Marionette, SimpleMeetingView, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

HubChannel = Backbone.Radio.channel('hubby');

SimpleMeetingView = (function(superClass) {
  extend(SimpleMeetingView, superClass);

  function SimpleMeetingView() {
    return SimpleMeetingView.__super__.constructor.apply(this, arguments);
  }

  SimpleMeetingView.prototype.template = tc.renderable(function(model) {
    var item_btn, name;
    name = "meeting";
    item_btn = ".btn.btn-default.btn-xs";
    return tc.li(".list-group-item." + name + "-item", function() {
      return tc.span(function() {
        return tc.a({
          href: "#hubby/viewmeeting/" + model.id
        }, model.title);
      });
    });
  });

  return SimpleMeetingView;

})(Backbone.Marionette.View);

ListMeetingsView = (function(superClass) {
  extend(ListMeetingsView, superClass);

  function ListMeetingsView() {
    return ListMeetingsView.__super__.constructor.apply(this, arguments);
  }

  ListMeetingsView.prototype.childView = SimpleMeetingView;

  ListMeetingsView.prototype.template = tc.renderable(function() {
    tc.div('.listview-header', function() {
      return tc.text("Council Meetings");
    });
    tc.hr();
    return tc.ul("#meetings-container.list-group");
  });

  return ListMeetingsView;

})(Backbone.Marionette.CompositeView);

module.exports = ListMeetingsView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9odWJieS9saXN0bWVldGluZ3N2aWV3LmpzIiwic291cmNlcyI6WyJhcHBsZXRzL2h1YmJ5L2xpc3RtZWV0aW5nc3ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEseUVBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQVFMLFVBQUEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsT0FBdkI7O0FBT1A7Ozs7Ozs7OEJBQ0osUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO0FBQ3RCLFFBQUE7SUFBQSxJQUFBLEdBQU87SUFDUCxRQUFBLEdBQVc7V0FDWCxFQUFFLENBQUMsRUFBSCxDQUFNLG1CQUFBLEdBQW9CLElBQXBCLEdBQXlCLE9BQS9CLEVBQXVDLFNBQUE7YUFDckMsRUFBRSxDQUFDLElBQUgsQ0FBUSxTQUFBO2VBQ04sRUFBRSxDQUFDLENBQUgsQ0FBSztVQUFBLElBQUEsRUFBSyxxQkFBQSxHQUFzQixLQUFLLENBQUMsRUFBakM7U0FBTCxFQUE0QyxLQUFLLENBQUMsS0FBbEQ7TUFETSxDQUFSO0lBRHFDLENBQXZDO0VBSHNCLENBQWQ7Ozs7R0FEb0IsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFXOUM7Ozs7Ozs7NkJBQ0osU0FBQSxHQUFXOzs2QkFDWCxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVAsRUFBMkIsU0FBQTthQUN6QixFQUFFLENBQUMsSUFBSCxDQUFRLGtCQUFSO0lBRHlCLENBQTNCO0lBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBQTtXQUNBLEVBQUUsQ0FBQyxFQUFILENBQU0sZ0NBQU47RUFKc0IsQ0FBZDs7OztHQUZtQixRQUFRLENBQUMsVUFBVSxDQUFDOztBQVNuRCxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG4jRnVsbENhbGVuZGFyID0gcmVxdWlyZSAnZnVsbGNhbGVuZGFyJ1xuXG4jIEZJWE1FXG4jcmVxdWlyZSAnLi4vLi4vbm9kZV9tb2R1bGVzL2Z1bGxjYWxlbmRhci9kaXN0L2Z1bGxjYWxlbmRhci5jc3MnXG4jcmVxdWlyZSAnZnVsbGNhbGVuZGFyL2Rpc3QvZnVsbGNhbGVuZGFyLmNzcydcblxuSHViQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2h1YmJ5J1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgdGVtcGxhdGVzXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuXG5jbGFzcyBTaW1wbGVNZWV0aW5nVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgbmFtZSA9IFwibWVldGluZ1wiXG4gICAgaXRlbV9idG4gPSBcIi5idG4uYnRuLWRlZmF1bHQuYnRuLXhzXCJcbiAgICB0Yy5saSBcIi5saXN0LWdyb3VwLWl0ZW0uI3tuYW1lfS1pdGVtXCIsIC0+XG4gICAgICB0Yy5zcGFuIC0+XG4gICAgICAgIHRjLmEgaHJlZjpcIiNodWJieS92aWV3bWVldGluZy8je21vZGVsLmlkfVwiLCBtb2RlbC50aXRsZVxuICAgICAgI3RjLmRpdiAnLmJ0bi1ncm91cC5wdWxsLXJpZ2h0JywgLT5cbiAgICAgICMgIHRjLmJ1dHRvbiBcIi5lZGl0LWl0ZW0uI3tpdGVtX2J0bn0uYnRuLWluZm8uZmEuZmEtZWRpdFwiLCAnZWRpdCdcbiAgICAgICMgIHRjLmJ1dHRvbiBcIi5kZWxldGUtaXRlbS4je2l0ZW1fYnRufS5idG4tZGFuZ2VyLmZhLmZhLWNsb3NlXCIsICdkZWxldGUnXG5cbmNsYXNzIExpc3RNZWV0aW5nc1ZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXdcbiAgY2hpbGRWaWV3OiBTaW1wbGVNZWV0aW5nVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLmxpc3R2aWV3LWhlYWRlcicsIC0+XG4gICAgICB0Yy50ZXh0IFwiQ291bmNpbCBNZWV0aW5nc1wiXG4gICAgdGMuaHIoKVxuICAgIHRjLnVsIFwiI21lZXRpbmdzLWNvbnRhaW5lci5saXN0LWdyb3VwXCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RNZWV0aW5nc1ZpZXdcbiAgXG4iXX0=
