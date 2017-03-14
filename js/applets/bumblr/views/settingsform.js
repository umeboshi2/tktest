var Backbone, BootstrapFormView, BumblrChannel, ConsumerKeyFormView, consumer_key_form, form_group_input_div, navigate_to_url, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

tc = require('teacup');

BootstrapFormView = require('agate/src/bootstrap_formview');

navigate_to_url = require('agate/src/apputil').navigate_to_url;

form_group_input_div = require('agate/src/templates/forms').form_group_input_div;

BumblrChannel = Backbone.Radio.channel('bumblr');

consumer_key_form = tc.renderable(function(settings) {
  form_group_input_div({
    input_id: 'input_key',
    label: 'Consumer Key',
    input_attributes: {
      name: 'consumer_key',
      placeholder: '',
      value: settings.consumer_key
    }
  });
  form_group_input_div({
    input_id: 'input_secret',
    label: 'Consumer Secret',
    input_attributes: {
      name: 'consumer_secret',
      placeholder: '',
      value: settings.consumer_secret
    }
  });
  form_group_input_div({
    input_id: 'input_token',
    label: 'Token',
    input_attributes: {
      name: 'token',
      placeholder: '',
      value: settings.token
    }
  });
  form_group_input_div({
    input_id: 'input_tsecret',
    label: 'Token Secret',
    input_attributes: {
      name: 'token_secret',
      placeholder: '',
      value: settings.token_secret
    }
  });
  return tc.input('.btn.btn-default.btn-xs', {
    type: 'submit',
    value: 'Submit'
  });
});

ConsumerKeyFormView = (function(superClass) {
  extend(ConsumerKeyFormView, superClass);

  function ConsumerKeyFormView() {
    return ConsumerKeyFormView.__super__.constructor.apply(this, arguments);
  }

  ConsumerKeyFormView.prototype.template = consumer_key_form;

  ConsumerKeyFormView.prototype.ui = {
    consumer_key: '[name="consumer_key"]',
    consumer_secret: '[name="consumer_secret"]',
    token: '[name="token"]',
    token_secret: '[name="token_secret"]'
  };

  ConsumerKeyFormView.prototype.updateModel = function() {
    return this.model.set({
      consumer_key: this.ui.consumer_key.val(),
      consumer_secret: this.ui.consumer_secret.val(),
      token: this.ui.token.val(),
      token_secret: this.ui.token_secret.val()
    });
  };

  ConsumerKeyFormView.prototype.createModel = function() {
    return BumblrChannel.request('get_app_settings');
  };

  ConsumerKeyFormView.prototype.onSuccess = function(model) {
    return navigate_to_url('#bumblr');
  };

  return ConsumerKeyFormView;

})(BootstrapFormView);

module.exports = ConsumerKeyFormView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvdmlld3Mvc2V0dGluZ3Nmb3JtLmpzIiwic291cmNlcyI6WyJhcHBsZXRzL2J1bWJsci92aWV3cy9zZXR0aW5nc2Zvcm0uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsNkhBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxpQkFBQSxHQUFvQixPQUFBLENBQVEsOEJBQVI7O0FBQ2xCLGtCQUFvQixPQUFBLENBQVEsbUJBQVI7O0FBQ3BCLHVCQUF5QixPQUFBLENBQVEsMkJBQVI7O0FBRTNCLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUdoQixpQkFBQSxHQUFvQixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsUUFBRDtFQUNoQyxvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLFdBQVY7SUFDQSxLQUFBLEVBQU8sY0FEUDtJQUVBLGdCQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sY0FBTjtNQUNBLFdBQUEsRUFBYSxFQURiO01BRUEsS0FBQSxFQUFPLFFBQVEsQ0FBQyxZQUZoQjtLQUhGO0dBREY7RUFPQSxvQkFBQSxDQUNFO0lBQUEsUUFBQSxFQUFVLGNBQVY7SUFDQSxLQUFBLEVBQU8saUJBRFA7SUFFQSxnQkFBQSxFQUNFO01BQUEsSUFBQSxFQUFNLGlCQUFOO01BQ0EsV0FBQSxFQUFhLEVBRGI7TUFFQSxLQUFBLEVBQU8sUUFBUSxDQUFDLGVBRmhCO0tBSEY7R0FERjtFQU9BLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsYUFBVjtJQUNBLEtBQUEsRUFBTyxPQURQO0lBRUEsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxPQUFOO01BQ0EsV0FBQSxFQUFhLEVBRGI7TUFFQSxLQUFBLEVBQU8sUUFBUSxDQUFDLEtBRmhCO0tBSEY7R0FERjtFQU9BLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsZUFBVjtJQUNBLEtBQUEsRUFBTyxjQURQO0lBRUEsZ0JBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxjQUFOO01BQ0EsV0FBQSxFQUFhLEVBRGI7TUFFQSxLQUFBLEVBQU8sUUFBUSxDQUFDLFlBRmhCO0tBSEY7R0FERjtTQU9BLEVBQUUsQ0FBQyxLQUFILENBQVMseUJBQVQsRUFBb0M7SUFBQSxJQUFBLEVBQUssUUFBTDtJQUFlLEtBQUEsRUFBTSxRQUFyQjtHQUFwQztBQTdCZ0MsQ0FBZDs7QUFnQ2Q7Ozs7Ozs7Z0NBQ0osUUFBQSxHQUFVOztnQ0FDVixFQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWMsdUJBQWQ7SUFDQSxlQUFBLEVBQWlCLDBCQURqQjtJQUVBLEtBQUEsRUFBTyxnQkFGUDtJQUdBLFlBQUEsRUFBYyx1QkFIZDs7O2dDQUtGLFdBQUEsR0FBYSxTQUFBO1dBQ1gsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQ0U7TUFBQSxZQUFBLEVBQWMsSUFBQyxDQUFBLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBakIsQ0FBQSxDQUFkO01BQ0EsZUFBQSxFQUFpQixJQUFDLENBQUEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFwQixDQUFBLENBRGpCO01BRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQVYsQ0FBQSxDQUZQO01BR0EsWUFBQSxFQUFjLElBQUMsQ0FBQSxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQWpCLENBQUEsQ0FIZDtLQURGO0VBRFc7O2dDQU9iLFdBQUEsR0FBYSxTQUFBO1dBQ1gsYUFBYSxDQUFDLE9BQWQsQ0FBc0Isa0JBQXRCO0VBRFc7O2dDQUdiLFNBQUEsR0FBVyxTQUFDLEtBQUQ7V0FFVCxlQUFBLENBQWdCLFNBQWhCO0VBRlM7Ozs7R0FsQnFCOztBQXNCbEMsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbkJvb3RzdHJhcEZvcm1WaWV3ID0gcmVxdWlyZSAnYWdhdGUvc3JjL2Jvb3RzdHJhcF9mb3JtdmlldydcbnsgbmF2aWdhdGVfdG9fdXJsIH0gPSByZXF1aXJlICdhZ2F0ZS9zcmMvYXBwdXRpbCdcbnsgZm9ybV9ncm91cF9pbnB1dF9kaXYgfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy90ZW1wbGF0ZXMvZm9ybXMnXG5cbkJ1bWJsckNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdidW1ibHInXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbmNvbnN1bWVyX2tleV9mb3JtID0gdGMucmVuZGVyYWJsZSAoc2V0dGluZ3MpIC0+XG4gIGZvcm1fZ3JvdXBfaW5wdXRfZGl2XG4gICAgaW5wdXRfaWQ6ICdpbnB1dF9rZXknXG4gICAgbGFiZWw6ICdDb25zdW1lciBLZXknXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICdjb25zdW1lcl9rZXknXG4gICAgICBwbGFjZWhvbGRlcjogJydcbiAgICAgIHZhbHVlOiBzZXR0aW5ncy5jb25zdW1lcl9rZXlcbiAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICBpbnB1dF9pZDogJ2lucHV0X3NlY3JldCdcbiAgICBsYWJlbDogJ0NvbnN1bWVyIFNlY3JldCdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ2NvbnN1bWVyX3NlY3JldCdcbiAgICAgIHBsYWNlaG9sZGVyOiAnJ1xuICAgICAgdmFsdWU6IHNldHRpbmdzLmNvbnN1bWVyX3NlY3JldFxuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfdG9rZW4nXG4gICAgbGFiZWw6ICdUb2tlbidcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ3Rva2VuJ1xuICAgICAgcGxhY2Vob2xkZXI6ICcnXG4gICAgICB2YWx1ZTogc2V0dGluZ3MudG9rZW5cbiAgZm9ybV9ncm91cF9pbnB1dF9kaXZcbiAgICBpbnB1dF9pZDogJ2lucHV0X3RzZWNyZXQnXG4gICAgbGFiZWw6ICdUb2tlbiBTZWNyZXQnXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICd0b2tlbl9zZWNyZXQnXG4gICAgICBwbGFjZWhvbGRlcjogJydcbiAgICAgIHZhbHVlOiBzZXR0aW5ncy50b2tlbl9zZWNyZXRcbiAgdGMuaW5wdXQgJy5idG4uYnRuLWRlZmF1bHQuYnRuLXhzJywgdHlwZTonc3VibWl0JywgdmFsdWU6J1N1Ym1pdCdcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuY2xhc3MgQ29uc3VtZXJLZXlGb3JtVmlldyBleHRlbmRzIEJvb3RzdHJhcEZvcm1WaWV3XG4gIHRlbXBsYXRlOiBjb25zdW1lcl9rZXlfZm9ybVxuICB1aTpcbiAgICBjb25zdW1lcl9rZXk6ICdbbmFtZT1cImNvbnN1bWVyX2tleVwiXSdcbiAgICBjb25zdW1lcl9zZWNyZXQ6ICdbbmFtZT1cImNvbnN1bWVyX3NlY3JldFwiXSdcbiAgICB0b2tlbjogJ1tuYW1lPVwidG9rZW5cIl0nXG4gICAgdG9rZW5fc2VjcmV0OiAnW25hbWU9XCJ0b2tlbl9zZWNyZXRcIl0nXG5cbiAgdXBkYXRlTW9kZWw6IC0+XG4gICAgQG1vZGVsLnNldFxuICAgICAgY29uc3VtZXJfa2V5OiBAdWkuY29uc3VtZXJfa2V5LnZhbCgpXG4gICAgICBjb25zdW1lcl9zZWNyZXQ6IEB1aS5jb25zdW1lcl9zZWNyZXQudmFsKClcbiAgICAgIHRva2VuOiBAdWkudG9rZW4udmFsKClcbiAgICAgIHRva2VuX3NlY3JldDogQHVpLnRva2VuX3NlY3JldC52YWwoKVxuXG4gIGNyZWF0ZU1vZGVsOiAtPlxuICAgIEJ1bWJsckNoYW5uZWwucmVxdWVzdCAnZ2V0X2FwcF9zZXR0aW5ncydcblxuICBvblN1Y2Nlc3M6IChtb2RlbCkgLT5cbiAgICAjY29uc29sZS5sb2cgJ29uU3VjY2VzcyBjYWxsZWQnXG4gICAgbmF2aWdhdGVfdG9fdXJsICcjYnVtYmxyJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnN1bWVyS2V5Rm9ybVZpZXdcblxuXG4iXX0=
