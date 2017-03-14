var Backbone, DefaultStaticDocumentTemplate, MainChannel, Marionette, UploadMainView, apiroot, fileinput, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

fileinput = require('bootstrap-fileinput');

require('bootstrap-fileinput/css/fileinput.css');

MainChannel = Backbone.Radio.channel('global');

DefaultStaticDocumentTemplate = tc.renderable(function(doc) {});

apiroot = '/api/dev/misc';

UploadMainView = (function(superClass) {
  extend(UploadMainView, superClass);

  function UploadMainView() {
    return UploadMainView.__super__.constructor.apply(this, arguments);
  }

  UploadMainView.prototype.template = tc.renderable(function() {
    tc.article('.document-view.content', function() {
      return tc.div('.body', function() {
        return "Hello there";
      });
    });
    return tc.div('.file-div', function() {
      return tc.input('.fileinput', {
        name: 'zathras',
        type: 'file'
      });
    });
  });

  UploadMainView.prototype.ui = {
    fileinput: '.fileinput'
  };

  UploadMainView.prototype.onDomRefresh = function() {
    var fi;
    return fi = this.ui.fileinput.fileinput({
      uploadUrl: apiroot + "/upload-photos"
    });
  };

  return UploadMainView;

})(Backbone.Marionette.View);

module.exports = UploadMainView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvdXBsb2Fkdmlldy5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvdXBsb2Fkdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx3R0FBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUwsU0FBQSxHQUFZLE9BQUEsQ0FBUSxxQkFBUjs7QUFDWixPQUFBLENBQVEsdUNBQVI7O0FBR0EsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFZCw2QkFBQSxHQUFnQyxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsR0FBRCxHQUFBLENBQWQ7O0FBRWhDLE9BQUEsR0FBVTs7QUFHSjs7Ozs7OzsyQkFDSixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO0lBQ3RCLEVBQUUsQ0FBQyxPQUFILENBQVcsd0JBQVgsRUFBcUMsU0FBQTthQUNuQyxFQUFFLENBQUMsR0FBSCxDQUFPLE9BQVAsRUFBZ0IsU0FBQTtlQUNkO01BRGMsQ0FBaEI7SUFEbUMsQ0FBckM7V0FHQSxFQUFFLENBQUMsR0FBSCxDQUFPLFdBQVAsRUFBb0IsU0FBQTthQUNsQixFQUFFLENBQUMsS0FBSCxDQUFTLFlBQVQsRUFBdUI7UUFBQSxJQUFBLEVBQUssU0FBTDtRQUFnQixJQUFBLEVBQUssTUFBckI7T0FBdkI7SUFEa0IsQ0FBcEI7RUFKc0IsQ0FBZDs7MkJBT1YsRUFBQSxHQUNFO0lBQUEsU0FBQSxFQUFXLFlBQVg7OzsyQkFFRixZQUFBLEdBQWMsU0FBQTtBQUNaLFFBQUE7V0FBQSxFQUFBLEdBQUssSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBZCxDQUNIO01BQUEsU0FBQSxFQUFjLE9BQUQsR0FBUyxnQkFBdEI7S0FERztFQURPOzs7O0dBWGEsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFpQmpELE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbmZpbGVpbnB1dCA9IHJlcXVpcmUgJ2Jvb3RzdHJhcC1maWxlaW5wdXQnXG5yZXF1aXJlICdib290c3RyYXAtZmlsZWlucHV0L2Nzcy9maWxlaW5wdXQuY3NzJ1xuXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5EZWZhdWx0U3RhdGljRG9jdW1lbnRUZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKGRvYykgLT5cbiAgXG5hcGlyb290ID0gJy9hcGkvZGV2L21pc2MnXG5cblxuY2xhc3MgVXBsb2FkTWFpblZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5hcnRpY2xlICcuZG9jdW1lbnQtdmlldy5jb250ZW50JywgLT5cbiAgICAgIHRjLmRpdiAnLmJvZHknLCAtPlxuICAgICAgICBcIkhlbGxvIHRoZXJlXCJcbiAgICB0Yy5kaXYgJy5maWxlLWRpdicsIC0+XG4gICAgICB0Yy5pbnB1dCAnLmZpbGVpbnB1dCcsIG5hbWU6J3phdGhyYXMnLCB0eXBlOidmaWxlJ1xuXG4gIHVpOlxuICAgIGZpbGVpbnB1dDogJy5maWxlaW5wdXQnXG4gICAgXG4gIG9uRG9tUmVmcmVzaDogKCkgLT5cbiAgICBmaSA9IEB1aS5maWxlaW5wdXQuZmlsZWlucHV0XG4gICAgICB1cGxvYWRVcmw6IFwiI3thcGlyb290fS91cGxvYWQtcGhvdG9zXCJcbiAgICBcbiAgICBcblxubW9kdWxlLmV4cG9ydHMgPSBVcGxvYWRNYWluVmlld1xuIl19
