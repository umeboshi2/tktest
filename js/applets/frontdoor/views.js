var Backbone, DefaultStaticDocumentTemplate, FrontDoorMainView, MainChannel, Marionette, marked, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

marked = require('marked');

MainChannel = Backbone.Radio.channel('global');

DefaultStaticDocumentTemplate = tc.renderable(function(doc) {
  return tc.article('.document-view.content', function() {
    return tc.div('.body', function() {
      return tc.raw(marked(doc.content));
    });
  });
});

FrontDoorMainView = (function(superClass) {
  extend(FrontDoorMainView, superClass);

  function FrontDoorMainView() {
    return FrontDoorMainView.__super__.constructor.apply(this, arguments);
  }

  FrontDoorMainView.prototype.template = DefaultStaticDocumentTemplate;

  return FrontDoorMainView;

})(Backbone.Marionette.View);

module.exports = {
  FrontDoorMainView: FrontDoorMainView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3Ivdmlld3MuanMiLCJzb3VyY2VzIjpbImFwcGxldHMvZnJvbnRkb29yL3ZpZXdzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLCtGQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFDTCxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVI7O0FBRVQsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFZCw2QkFBQSxHQUFnQyxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsR0FBRDtTQUM1QyxFQUFFLENBQUMsT0FBSCxDQUFXLHdCQUFYLEVBQXFDLFNBQUE7V0FDbkMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxPQUFQLEVBQWdCLFNBQUE7YUFDZCxFQUFFLENBQUMsR0FBSCxDQUFPLE1BQUEsQ0FBTyxHQUFHLENBQUMsT0FBWCxDQUFQO0lBRGMsQ0FBaEI7RUFEbUMsQ0FBckM7QUFENEMsQ0FBZDs7QUFNMUI7Ozs7Ozs7OEJBQ0osUUFBQSxHQUFVOzs7O0dBRG9CLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBR3BELE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxpQkFBQSxFQUFtQixpQkFBbkIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcbm1hcmtlZCA9IHJlcXVpcmUgJ21hcmtlZCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbkRlZmF1bHRTdGF0aWNEb2N1bWVudFRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAoZG9jKSAtPlxuICB0Yy5hcnRpY2xlICcuZG9jdW1lbnQtdmlldy5jb250ZW50JywgLT5cbiAgICB0Yy5kaXYgJy5ib2R5JywgLT5cbiAgICAgIHRjLnJhdyBtYXJrZWQgZG9jLmNvbnRlbnRcblxuXG5jbGFzcyBGcm9udERvb3JNYWluVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogRGVmYXVsdFN0YXRpY0RvY3VtZW50VGVtcGxhdGVcblxubW9kdWxlLmV4cG9ydHMgPVxuICBGcm9udERvb3JNYWluVmlldzogRnJvbnREb29yTWFpblZpZXdcblxuIl19
