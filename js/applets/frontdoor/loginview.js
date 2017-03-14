var Backbone, BootstrapFormView, LoginView, MainChannel, Marionette, form_group_input_div, ghost_login_form, make_field_input_ui, navigate_to_url, ref, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

ref = require('agate/src/apputil'), navigate_to_url = ref.navigate_to_url, make_field_input_ui = ref.make_field_input_ui;

form_group_input_div = require('agate/src/templates/forms').form_group_input_div;

BootstrapFormView = require('agate/src/bootstrap_formview');

MainChannel = Backbone.Radio.channel('global');

ghost_login_form = tc.renderable(function(user) {
  form_group_input_div({
    input_id: 'input_username',
    label: 'User Name',
    input_attributes: {
      name: 'username',
      placeholder: 'User Name'
    }
  });
  form_group_input_div({
    input_id: 'input_password',
    label: 'Password',
    input_attributes: {
      name: 'password',
      type: 'password',
      placeholder: 'Type your password here....'
    }
  });
  tc.input('.btn.btn-default', {
    type: 'submit',
    value: 'login'
  });
  return tc.div('.spinner.fa.fa-spinner.fa-spin');
});

LoginView = (function(superClass) {
  extend(LoginView, superClass);

  function LoginView() {
    return LoginView.__super__.constructor.apply(this, arguments);
  }

  LoginView.prototype.template = ghost_login_form;

  LoginView.prototype.fieldList = ['username', 'password'];

  LoginView.prototype.ui = function() {
    var uiobject;
    uiobject = make_field_input_ui(this.fieldList);
    return uiobject;
  };

  LoginView.prototype.createModel = function() {
    return new Backbone.Model;
  };

  LoginView.prototype.updateModel = function() {
    console.log('updateModel called');
    this.model.set('username', this.ui.username.val());
    return this.model.set('password', this.ui.password.val());
  };

  LoginView.prototype.saveModel = function() {
    var auth, password, res, username;
    auth = MainChannel.request('main:app:ghostauth');
    console.log(auth);
    username = this.model.get('username');
    password = this.model.get('password');
    res = auth.access(username, password);
    res.error((function(_this) {
      return function() {
        return _this.trigger('save:form:failure', _this.model);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        return _this.trigger('save:form:success', _this.model);
      };
    })(this));
  };

  LoginView.prototype.onSuccess = function() {
    return navigate_to_url('/');
  };

  return LoginView;

})(BootstrapFormView);

module.exports = LoginView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9mcm9udGRvb3IvbG9naW52aWV3LmpzIiwic291cmNlcyI6WyJhcHBsZXRzL2Zyb250ZG9vci9sb2dpbnZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsc0pBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLE1BQzBCLE9BQUEsQ0FBUSxtQkFBUixDQUQxQixFQUFFLHFDQUFGLEVBQ0U7O0FBRUEsdUJBQXlCLE9BQUEsQ0FBUSwyQkFBUjs7QUFDM0IsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLDhCQUFSOztBQUVwQixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVkLGdCQUFBLEdBQW9CLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxJQUFEO0VBQ2hDLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsZ0JBQVY7SUFDQSxLQUFBLEVBQU8sV0FEUDtJQUVBLGdCQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sVUFBTjtNQUNBLFdBQUEsRUFBYSxXQURiO0tBSEY7R0FERjtFQU1BLG9CQUFBLENBQ0U7SUFBQSxRQUFBLEVBQVUsZ0JBQVY7SUFDQSxLQUFBLEVBQU8sVUFEUDtJQUVBLGdCQUFBLEVBQ0U7TUFBQSxJQUFBLEVBQU0sVUFBTjtNQUNBLElBQUEsRUFBTSxVQUROO01BRUEsV0FBQSxFQUFhLDZCQUZiO0tBSEY7R0FERjtFQU9BLEVBQUUsQ0FBQyxLQUFILENBQVMsa0JBQVQsRUFBNkI7SUFBQSxJQUFBLEVBQUssUUFBTDtJQUFlLEtBQUEsRUFBTSxPQUFyQjtHQUE3QjtTQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0NBQVA7QUFmZ0MsQ0FBZDs7QUFrQmQ7Ozs7Ozs7c0JBQ0osUUFBQSxHQUFVOztzQkFDVixTQUFBLEdBQVcsQ0FBQyxVQUFELEVBQWEsVUFBYjs7c0JBQ1gsRUFBQSxHQUFJLFNBQUE7QUFDRixRQUFBO0lBQUEsUUFBQSxHQUFXLG1CQUFBLENBQW9CLElBQUMsQ0FBQSxTQUFyQjtBQUNYLFdBQU87RUFGTDs7c0JBSUosV0FBQSxHQUFhLFNBQUE7V0FDWCxJQUFJLFFBQVEsQ0FBQztFQURGOztzQkFHYixXQUFBLEdBQWEsU0FBQTtJQUNYLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVo7SUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxVQUFYLEVBQXVCLElBQUMsQ0FBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQWIsQ0FBQSxDQUF2QjtXQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFVBQVgsRUFBdUIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBYixDQUFBLENBQXZCO0VBSFc7O3NCQUtiLFNBQUEsR0FBVyxTQUFBO0FBQ1QsUUFBQTtJQUFBLElBQUEsR0FBTyxXQUFXLENBQUMsT0FBWixDQUFvQixvQkFBcEI7SUFDUCxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7SUFDQSxRQUFBLEdBQVksSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWDtJQUNaLFFBQUEsR0FBVyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxVQUFYO0lBQ1gsR0FBQSxHQUFNLElBQUksQ0FBQyxNQUFMLENBQVksUUFBWixFQUFzQixRQUF0QjtJQUNOLEdBQUcsQ0FBQyxLQUFKLENBQVUsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ1IsS0FBQyxDQUFBLE9BQUQsQ0FBUyxtQkFBVCxFQUE4QixLQUFDLENBQUEsS0FBL0I7TUFEUTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBVjtXQUVBLEdBQUcsQ0FBQyxPQUFKLENBQVksQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO2VBQ1YsS0FBQyxDQUFBLE9BQUQsQ0FBUyxtQkFBVCxFQUE4QixLQUFDLENBQUEsS0FBL0I7TUFEVTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBWjtFQVJTOztzQkFXWCxTQUFBLEdBQVcsU0FBQTtXQUNULGVBQUEsQ0FBZ0IsR0FBaEI7RUFEUzs7OztHQTFCVzs7QUErQnhCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbnsgbmF2aWdhdGVfdG9fdXJsXG4gIG1ha2VfZmllbGRfaW5wdXRfdWkgfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9hcHB1dGlsJ1xuXG57IGZvcm1fZ3JvdXBfaW5wdXRfZGl2IH0gPSByZXF1aXJlICdhZ2F0ZS9zcmMvdGVtcGxhdGVzL2Zvcm1zJ1xuQm9vdHN0cmFwRm9ybVZpZXcgPSByZXF1aXJlICdhZ2F0ZS9zcmMvYm9vdHN0cmFwX2Zvcm12aWV3J1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuZ2hvc3RfbG9naW5fZm9ybSA9ICB0Yy5yZW5kZXJhYmxlICh1c2VyKSAtPlxuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfdXNlcm5hbWUnXG4gICAgbGFiZWw6ICdVc2VyIE5hbWUnXG4gICAgaW5wdXRfYXR0cmlidXRlczpcbiAgICAgIG5hbWU6ICd1c2VybmFtZSdcbiAgICAgIHBsYWNlaG9sZGVyOiAnVXNlciBOYW1lJ1xuICBmb3JtX2dyb3VwX2lucHV0X2RpdlxuICAgIGlucHV0X2lkOiAnaW5wdXRfcGFzc3dvcmQnXG4gICAgbGFiZWw6ICdQYXNzd29yZCdcbiAgICBpbnB1dF9hdHRyaWJ1dGVzOlxuICAgICAgbmFtZTogJ3Bhc3N3b3JkJ1xuICAgICAgdHlwZTogJ3Bhc3N3b3JkJ1xuICAgICAgcGxhY2Vob2xkZXI6ICdUeXBlIHlvdXIgcGFzc3dvcmQgaGVyZS4uLi4nXG4gIHRjLmlucHV0ICcuYnRuLmJ0bi1kZWZhdWx0JywgdHlwZTonc3VibWl0JywgdmFsdWU6J2xvZ2luJ1xuICB0Yy5kaXYgJy5zcGlubmVyLmZhLmZhLXNwaW5uZXIuZmEtc3BpbidcblxuXG5jbGFzcyBMb2dpblZpZXcgZXh0ZW5kcyBCb290c3RyYXBGb3JtVmlld1xuICB0ZW1wbGF0ZTogZ2hvc3RfbG9naW5fZm9ybVxuICBmaWVsZExpc3Q6IFsndXNlcm5hbWUnLCAncGFzc3dvcmQnXVxuICB1aTogLT5cbiAgICB1aW9iamVjdCA9IG1ha2VfZmllbGRfaW5wdXRfdWkgQGZpZWxkTGlzdFxuICAgIHJldHVybiB1aW9iamVjdFxuXG4gIGNyZWF0ZU1vZGVsOiAtPlxuICAgIG5ldyBCYWNrYm9uZS5Nb2RlbFxuXG4gIHVwZGF0ZU1vZGVsOiAtPlxuICAgIGNvbnNvbGUubG9nICd1cGRhdGVNb2RlbCBjYWxsZWQnXG4gICAgQG1vZGVsLnNldCAndXNlcm5hbWUnLCBAdWkudXNlcm5hbWUudmFsKClcbiAgICBAbW9kZWwuc2V0ICdwYXNzd29yZCcsIEB1aS5wYXNzd29yZC52YWwoKVxuXG4gIHNhdmVNb2RlbDogLT5cbiAgICBhdXRoID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Z2hvc3RhdXRoJ1xuICAgIGNvbnNvbGUubG9nIGF1dGhcbiAgICB1c2VybmFtZSAgPSBAbW9kZWwuZ2V0ICd1c2VybmFtZSdcbiAgICBwYXNzd29yZCA9IEBtb2RlbC5nZXQgJ3Bhc3N3b3JkJ1xuICAgIHJlcyA9IGF1dGguYWNjZXNzIHVzZXJuYW1lLCBwYXNzd29yZFxuICAgIHJlcy5lcnJvciA9PlxuICAgICAgQHRyaWdnZXIgJ3NhdmU6Zm9ybTpmYWlsdXJlJywgQG1vZGVsXG4gICAgcmVzLnN1Y2Nlc3MgPT5cbiAgICAgIEB0cmlnZ2VyICdzYXZlOmZvcm06c3VjY2VzcycsIEBtb2RlbFxuICAgICAgXG4gIG9uU3VjY2VzczogLT5cbiAgICBuYXZpZ2F0ZV90b191cmwgJy8nXG4gICAgXG4gICAgIFxuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBMb2dpblZpZXdcbiJdfQ==
