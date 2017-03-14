var Backbone, BootstrapFormView, BumblrChannel, Marionette, NewBlogFormView, form_group_input_div, navigate_to_url, new_blog_form_view, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

BootstrapFormView = require('agate/src/bootstrap_formview');

form_group_input_div = require('agate/src/templates/forms').form_group_input_div;

navigate_to_url = require('agate/src/apputil').navigate_to_url;

BumblrChannel = Backbone.Radio.channel('bumblr');

new_blog_form_view = tc.renderable(function(model) {
  form_group_input_div({
    input_id: 'input_blogname',
    label: 'Blog Name',
    input_attributes: {
      name: 'blog_name',
      placeholder: '',
      value: 'dutch-and-flemish-painters'
    }
  });
  return tc.input('.btn.btn-default.btn-xs', {
    type: 'submit',
    value: 'Add Blog'
  });
});

NewBlogFormView = (function(superClass) {
  extend(NewBlogFormView, superClass);

  function NewBlogFormView() {
    return NewBlogFormView.__super__.constructor.apply(this, arguments);
  }

  NewBlogFormView.prototype.template = new_blog_form_view;

  NewBlogFormView.prototype.ui = {
    blog_name: '[name="blog_name"]'
  };

  NewBlogFormView.prototype.updateModel = function() {
    this.collection = BumblrChannel.request('get_local_blogs');
    return this.model = this.collection.add_blog(this.ui.blog_name.val());
  };

  NewBlogFormView.prototype.onSuccess = function() {
    return navigate_to_url('#bumblr/listblogs');
  };

  NewBlogFormView.prototype.createModel = function() {
    return new Backbone.Model({
      url: '/'
    });
  };

  return NewBlogFormView;

})(BootstrapFormView);

module.exports = NewBlogFormView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvdmlld3MvbmV3YmxvZy5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9idW1ibHIvdmlld3MvbmV3YmxvZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxzSUFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUwsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLDhCQUFSOztBQUNsQix1QkFBeUIsT0FBQSxDQUFRLDJCQUFSOztBQUN6QixrQkFBb0IsT0FBQSxDQUFRLG1CQUFSOztBQUV0QixhQUFBLEdBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFHaEIsa0JBQUEsR0FBcUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7RUFDakMsb0JBQUEsQ0FDRTtJQUFBLFFBQUEsRUFBVSxnQkFBVjtJQUNBLEtBQUEsRUFBTyxXQURQO0lBRUEsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxXQUFOO01BQ0EsV0FBQSxFQUFhLEVBRGI7TUFFQSxLQUFBLEVBQU8sNEJBRlA7S0FIRjtHQURGO1NBT0EsRUFBRSxDQUFDLEtBQUgsQ0FBUyx5QkFBVCxFQUFvQztJQUFBLElBQUEsRUFBSyxRQUFMO0lBQWUsS0FBQSxFQUFNLFVBQXJCO0dBQXBDO0FBUmlDLENBQWQ7O0FBWWY7Ozs7Ozs7NEJBQ0osUUFBQSxHQUFVOzs0QkFDVixFQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVcsb0JBQVg7Ozs0QkFFRixXQUFBLEdBQWEsU0FBQTtJQUVYLElBQUMsQ0FBQSxVQUFELEdBQWMsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsaUJBQXRCO1dBQ2QsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVosQ0FBcUIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBZCxDQUFBLENBQXJCO0VBSEU7OzRCQUtiLFNBQUEsR0FBVyxTQUFBO1dBRVQsZUFBQSxDQUFnQixtQkFBaEI7RUFGUzs7NEJBSVgsV0FBQSxHQUFhLFNBQUE7QUFDWCxXQUFPLElBQUksUUFBUSxDQUFDLEtBQWIsQ0FBbUI7TUFBQSxHQUFBLEVBQUksR0FBSjtLQUFuQjtFQURJOzs7O0dBZGU7O0FBbUI5QixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5Cb290c3RyYXBGb3JtVmlldyA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9ib290c3RyYXBfZm9ybXZpZXcnXG57IGZvcm1fZ3JvdXBfaW5wdXRfZGl2IH0gPSByZXF1aXJlICdhZ2F0ZS9zcmMvdGVtcGxhdGVzL2Zvcm1zJ1xueyBuYXZpZ2F0ZV90b191cmwgfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9hcHB1dGlsJ1xuXG5CdW1ibHJDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnYnVtYmxyJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5uZXdfYmxvZ19mb3JtX3ZpZXcgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICBpbnB1dF9pZDogJ2lucHV0X2Jsb2duYW1lJ1xuICAgIGxhYmVsOiAnQmxvZyBOYW1lJ1xuICAgIGlucHV0X2F0dHJpYnV0ZXM6XG4gICAgICBuYW1lOiAnYmxvZ19uYW1lJ1xuICAgICAgcGxhY2Vob2xkZXI6ICcnXG4gICAgICB2YWx1ZTogJ2R1dGNoLWFuZC1mbGVtaXNoLXBhaW50ZXJzJ1xuICB0Yy5pbnB1dCAnLmJ0bi5idG4tZGVmYXVsdC5idG4teHMnLCB0eXBlOidzdWJtaXQnLCB2YWx1ZTonQWRkIEJsb2cnXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuY2xhc3MgTmV3QmxvZ0Zvcm1WaWV3IGV4dGVuZHMgQm9vdHN0cmFwRm9ybVZpZXdcbiAgdGVtcGxhdGU6IG5ld19ibG9nX2Zvcm1fdmlld1xuICB1aTpcbiAgICBibG9nX25hbWU6ICdbbmFtZT1cImJsb2dfbmFtZVwiXSdcblxuICB1cGRhdGVNb2RlbDogLT5cbiAgICAjY29uc29sZS5sb2cgJ3VwZGF0ZU1vZGVsJ1xuICAgIEBjb2xsZWN0aW9uID0gQnVtYmxyQ2hhbm5lbC5yZXF1ZXN0ICdnZXRfbG9jYWxfYmxvZ3MnXG4gICAgQG1vZGVsID0gQGNvbGxlY3Rpb24uYWRkX2Jsb2cgQHVpLmJsb2dfbmFtZS52YWwoKVxuXG4gIG9uU3VjY2VzczogLT5cbiAgICAjY29uc29sZS5sb2cgJ29uU3VjY2VzcyBjYWxsZWQnXG4gICAgbmF2aWdhdGVfdG9fdXJsICcjYnVtYmxyL2xpc3RibG9ncydcblxuICBjcmVhdGVNb2RlbDogLT5cbiAgICByZXR1cm4gbmV3IEJhY2tib25lLk1vZGVsIHVybDonLydcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTmV3QmxvZ0Zvcm1WaWV3XG5cblxuIl19
