webpackJsonp([10],{

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, HubChannel, ListMeetingsView, Marionette, SimpleMeetingView, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

tc = __webpack_require__(6);

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


/***/ })

});
//# sourceMappingURL=10.js.map