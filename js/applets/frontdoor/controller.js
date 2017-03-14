var Backbone, Controller, DocChannel, FrontdoorLayout, MainChannel, MainController, Marionette, MessageChannel, SlideDownRegion, frontdoor_template, login_form, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainController = require('agate/src/controllers').MainController;

login_form = require('agate/src/templates/forms').login_form;

SlideDownRegion = require('agate/src/regions').SlideDownRegion;

require('../../static-documents');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

DocChannel = Backbone.Radio.channel('static-documents');

tc = require('teacup');

frontdoor_template = tc.renderable(function() {
  return tc.div('#main-content.col-sm-10.col-sm-offset-1');
});

FrontdoorLayout = (function(superClass) {
  extend(FrontdoorLayout, superClass);

  function FrontdoorLayout() {
    return FrontdoorLayout.__super__.constructor.apply(this, arguments);
  }

  FrontdoorLayout.prototype.template = frontdoor_template;

  FrontdoorLayout.prototype.regions = function() {
    return {
      content: new SlideDownRegion({
        el: '#main-content',
        speed: 'slow'
      })
    };
  };

  return FrontdoorLayout;

})(Backbone.Marionette.View);

Controller = (function(superClass) {
  extend(Controller, superClass);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.layoutClass = FrontdoorLayout;

  Controller.prototype._view_resource = function(doc) {
    var FrontDoorMainView, view;
    this.setup_layout_if_needed();
    FrontDoorMainView = require('./views').FrontDoorMainView;
    view = new FrontDoorMainView({
      model: doc
    });
    return this.layout.showChildView('content', view);
  };

  Controller.prototype._view_login = function() {
    var LoginView, view;
    LoginView = require('./loginview');
    view = new LoginView;
    return this.layout.showChildView('content', view);
  };

  Controller.prototype.view_page = function(name) {
    var doc, response;
    doc = DocChannel.request('get-document', name);
    response = doc.fetch();
    response.done((function(_this) {
      return function() {
        if (!doc.get('content')) {
          doc.set('content', '# Need a front page.');
        }
        return _this._view_resource(doc);
      };
    })(this));
    return response.fail((function(_this) {
      return function() {
        return MessageChannel.request('danger', 'Failed to get document');
      };
    })(this));
  };

  Controller.prototype.frontdoor_needuser = function() {
    var user;
    user = MainChannel.request('current-user');
    if (user.has('name')) {
      return this.frontdoor_hasuser(user);
    } else {
      return this.show_login();
    }
  };

  Controller.prototype.show_login = function() {
    this.setup_layout_if_needed();
    return this._view_login();
  };

  Controller.prototype.frontdoor_hasuser = function(user) {
    return this.default_view();
  };

  Controller.prototype.default_view = function() {
    this.setup_layout_if_needed();
    return this.view_page('README');
  };

  Controller.prototype.frontdoor = function() {
    var appmodel;
    appmodel = MainChannel.request('main:app:appmodel');
    if (appmodel.get('needUser')) {
      return this.frontdoor_needuser();
    } else {
      return this.default_view();
    }
  };

  return Controller;

})(MainController);

module.exports = Controller;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9mcm9udGRvb3IvY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSwrSkFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFWCxpQkFBbUIsT0FBQSxDQUFRLHVCQUFSOztBQUNuQixhQUFlLE9BQUEsQ0FBUSwyQkFBUjs7QUFDZixrQkFBb0IsT0FBQSxDQUFRLG1CQUFSOztBQUV0QixPQUFBLENBQVEsd0JBQVI7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFDakIsVUFBQSxHQUFhLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixrQkFBdkI7O0FBRWIsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLGtCQUFBLEdBQXFCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQTtTQUNqQyxFQUFFLENBQUMsR0FBSCxDQUFPLHlDQUFQO0FBRGlDLENBQWQ7O0FBR2Y7Ozs7Ozs7NEJBQ0osUUFBQSxHQUFVOzs0QkFDVixPQUFBLEdBQVMsU0FBQTtXQUNQO01BQUEsT0FBQSxFQUFTLElBQUksZUFBSixDQUNQO1FBQUEsRUFBQSxFQUFJLGVBQUo7UUFDQSxLQUFBLEVBQU8sTUFEUDtPQURPLENBQVQ7O0VBRE87Ozs7R0FGbUIsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFRNUM7Ozs7Ozs7dUJBQ0osV0FBQSxHQUFhOzt1QkFFYixjQUFBLEdBQWdCLFNBQUMsR0FBRDtBQUNkLFFBQUE7SUFBQSxJQUFDLENBQUEsc0JBQUQsQ0FBQTtJQUNFLG9CQUFzQixPQUFBLENBQVEsU0FBUjtJQUN4QixJQUFBLEdBQU8sSUFBSSxpQkFBSixDQUNMO01BQUEsS0FBQSxFQUFPLEdBQVA7S0FESztXQUVQLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixTQUF0QixFQUFpQyxJQUFqQztFQUxjOzt1QkFPaEIsV0FBQSxHQUFhLFNBQUE7QUFDWCxRQUFBO0lBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxhQUFSO0lBQ1osSUFBQSxHQUFPLElBQUk7V0FDWCxJQUFDLENBQUEsTUFBTSxDQUFDLGFBQVIsQ0FBc0IsU0FBdEIsRUFBaUMsSUFBakM7RUFIVzs7dUJBS2IsU0FBQSxHQUFXLFNBQUMsSUFBRDtBQUNULFFBQUE7SUFBQSxHQUFBLEdBQU0sVUFBVSxDQUFDLE9BQVgsQ0FBbUIsY0FBbkIsRUFBbUMsSUFBbkM7SUFDTixRQUFBLEdBQVcsR0FBRyxDQUFDLEtBQUosQ0FBQTtJQUNYLFFBQVEsQ0FBQyxJQUFULENBQWMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ1osSUFBRyxDQUFJLEdBQUcsQ0FBQyxHQUFKLENBQVEsU0FBUixDQUFQO1VBQ0UsR0FBRyxDQUFDLEdBQUosQ0FBUSxTQUFSLEVBQW1CLHNCQUFuQixFQURGOztlQUVBLEtBQUMsQ0FBQSxjQUFELENBQWdCLEdBQWhCO01BSFk7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQ7V0FJQSxRQUFRLENBQUMsSUFBVCxDQUFjLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUNaLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLHdCQUFqQztNQURZO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkO0VBUFM7O3VCQVdYLGtCQUFBLEdBQW9CLFNBQUE7QUFDbEIsUUFBQTtJQUFBLElBQUEsR0FBTyxXQUFXLENBQUMsT0FBWixDQUFvQixjQUFwQjtJQUNQLElBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxNQUFULENBQUg7YUFDRSxJQUFDLENBQUEsaUJBQUQsQ0FBbUIsSUFBbkIsRUFERjtLQUFBLE1BQUE7YUFHRSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBSEY7O0VBRmtCOzt1QkFPcEIsVUFBQSxHQUFZLFNBQUE7SUFDVixJQUFDLENBQUEsc0JBQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxXQUFELENBQUE7RUFGVTs7dUJBSVosaUJBQUEsR0FBbUIsU0FBQyxJQUFEO1dBQ2pCLElBQUMsQ0FBQSxZQUFELENBQUE7RUFEaUI7O3VCQUduQixZQUFBLEdBQWMsU0FBQTtJQUNaLElBQUMsQ0FBQSxzQkFBRCxDQUFBO1dBRUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxRQUFYO0VBSFk7O3VCQUtkLFNBQUEsR0FBVyxTQUFBO0FBQ1QsUUFBQTtJQUFBLFFBQUEsR0FBVyxXQUFXLENBQUMsT0FBWixDQUFvQixtQkFBcEI7SUFDWCxJQUFHLFFBQVEsQ0FBQyxHQUFULENBQWEsVUFBYixDQUFIO2FBQ0UsSUFBQyxDQUFBLGtCQUFELENBQUEsRUFERjtLQUFBLE1BQUE7YUFHRSxJQUFDLENBQUEsWUFBRCxDQUFBLEVBSEY7O0VBRlM7Ozs7R0E3Q1k7O0FBb0R6QixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxueyBNYWluQ29udHJvbGxlciB9ID0gcmVxdWlyZSAnYWdhdGUvc3JjL2NvbnRyb2xsZXJzJ1xueyBsb2dpbl9mb3JtIH0gPSByZXF1aXJlICdhZ2F0ZS9zcmMvdGVtcGxhdGVzL2Zvcm1zJ1xueyBTbGlkZURvd25SZWdpb24gfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9yZWdpb25zJ1xuXG5yZXF1aXJlICcuLi8uLi9zdGF0aWMtZG9jdW1lbnRzJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5Eb2NDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnc3RhdGljLWRvY3VtZW50cydcblxudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbmZyb250ZG9vcl90ZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgdGMuZGl2ICcjbWFpbi1jb250ZW50LmNvbC1zbS0xMC5jb2wtc20tb2Zmc2V0LTEnXG4gIFxuY2xhc3MgRnJvbnRkb29yTGF5b3V0IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBmcm9udGRvb3JfdGVtcGxhdGVcbiAgcmVnaW9uczogLT5cbiAgICBjb250ZW50OiBuZXcgU2xpZGVEb3duUmVnaW9uXG4gICAgICBlbDogJyNtYWluLWNvbnRlbnQnXG4gICAgICBzcGVlZDogJ3Nsb3cnXG4gIFxuXG5jbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWFpbkNvbnRyb2xsZXJcbiAgbGF5b3V0Q2xhc3M6IEZyb250ZG9vckxheW91dFxuICBcbiAgX3ZpZXdfcmVzb3VyY2U6IChkb2MpIC0+XG4gICAgQHNldHVwX2xheW91dF9pZl9uZWVkZWQoKVxuICAgIHsgRnJvbnREb29yTWFpblZpZXcgfSA9IHJlcXVpcmUgJy4vdmlld3MnXG4gICAgdmlldyA9IG5ldyBGcm9udERvb3JNYWluVmlld1xuICAgICAgbW9kZWw6IGRvY1xuICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcblxuICBfdmlld19sb2dpbjogLT5cbiAgICBMb2dpblZpZXcgPSByZXF1aXJlICcuL2xvZ2ludmlldydcbiAgICB2aWV3ID0gbmV3IExvZ2luVmlld1xuICAgIEBsYXlvdXQuc2hvd0NoaWxkVmlldyAnY29udGVudCcsIHZpZXdcblxuICB2aWV3X3BhZ2U6IChuYW1lKSAtPlxuICAgIGRvYyA9IERvY0NoYW5uZWwucmVxdWVzdCAnZ2V0LWRvY3VtZW50JywgbmFtZVxuICAgIHJlc3BvbnNlID0gZG9jLmZldGNoKClcbiAgICByZXNwb25zZS5kb25lID0+XG4gICAgICBpZiBub3QgZG9jLmdldCAnY29udGVudCdcbiAgICAgICAgZG9jLnNldCAnY29udGVudCcsICcjIE5lZWQgYSBmcm9udCBwYWdlLidcbiAgICAgIEBfdmlld19yZXNvdXJjZSBkb2NcbiAgICByZXNwb25zZS5mYWlsID0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCAnRmFpbGVkIHRvIGdldCBkb2N1bWVudCdcbiAgICAgIFxuXG4gIGZyb250ZG9vcl9uZWVkdXNlcjogLT5cbiAgICB1c2VyID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnY3VycmVudC11c2VyJ1xuICAgIGlmIHVzZXIuaGFzICduYW1lJ1xuICAgICAgQGZyb250ZG9vcl9oYXN1c2VyIHVzZXJcbiAgICBlbHNlXG4gICAgICBAc2hvd19sb2dpbigpXG4gICAgICBcbiAgc2hvd19sb2dpbjogLT5cbiAgICBAc2V0dXBfbGF5b3V0X2lmX25lZWRlZCgpXG4gICAgQF92aWV3X2xvZ2luKClcbiAgICBcbiAgZnJvbnRkb29yX2hhc3VzZXI6ICh1c2VyKSAtPlxuICAgIEBkZWZhdWx0X3ZpZXcoKVxuXG4gIGRlZmF1bHRfdmlldzogLT5cbiAgICBAc2V0dXBfbGF5b3V0X2lmX25lZWRlZCgpXG4gICAgI0BzaG93X2xvZ2luKClcbiAgICBAdmlld19wYWdlICdSRUFETUUnXG4gICAgICBcbiAgZnJvbnRkb29yOiAtPlxuICAgIGFwcG1vZGVsID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6YXBwbW9kZWwnXG4gICAgaWYgYXBwbW9kZWwuZ2V0ICduZWVkVXNlcidcbiAgICAgIEBmcm9udGRvb3JfbmVlZHVzZXIoKVxuICAgIGVsc2VcbiAgICAgIEBkZWZhdWx0X3ZpZXcoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xsZXJcblxuIl19
