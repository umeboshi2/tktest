webpackJsonp([6],{

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

var capitalize, form_group_input_div, login_form, make_field_input, make_field_select, make_field_textarea, make_login_form, name_content_form, tc;

tc = __webpack_require__(6);

capitalize = __webpack_require__(129).capitalize;

form_group_input_div = tc.renderable(function(data) {
  return tc.div('.form-group', function() {
    var atts, input_type, selector;
    tc.label('.control-label', {
      "for": data.input_id
    }, data.label);
    selector = "#" + data.input_id + ".form-control";
    atts = data.input_attributes;
    input_type = tc.input;
    if (data != null ? data.input_type : void 0) {
      input_type = tc[data.input_type];
      return input_type(selector, atts, function() {
        return tc.text(data != null ? data.content : void 0);
      });
    } else {
      return input_type(selector, atts);
    }
  });
});

make_field_input = function(field) {
  return tc.renderable(function(model) {
    return form_group_input_div({
      input_id: "input_" + field,
      label: capitalize(field),
      input_attributes: {
        name: field,
        placeholder: field,
        value: model[field]
      }
    });
  });
};

make_field_textarea = function(field) {
  return tc.renderable(function(model) {
    return form_group_input_div({
      input_id: "input_" + field,
      input_type: 'textarea',
      label: capitalize(field),
      input_attributes: {
        name: field,
        placeholder: field
      },
      content: model[field]
    });
  });
};

make_field_select = function(field, optlist) {
  return tc.renderable(function(model) {
    tc.div('.form-group', function() {
      tc.label('.control-label', {
        "for": "select_" + field
      });
      return capitalize(field);
    });
    return tc.select('.form-control', {
      name: "select_" + field
    }, function() {
      var i, len, opt, results;
      results = [];
      for (i = 0, len = optlist.length; i < len; i++) {
        opt = optlist[i];
        if (model[field] === opt) {
          results.push(tc.option({
            selected: null,
            value: opt
          }, opt));
        } else {
          results.push(tc.option({
            value: opt
          }, opt));
        }
      }
      return results;
    });
  });
};

make_login_form = function(action, method) {
  if (action == null) {
    action = '/login';
  }
  if (method == null) {
    method = 'POST';
  }
  return tc.renderable(function(user) {
    return tc.form({
      role: 'form',
      method: method,
      action: action
    }, function() {
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
      return tc.button('.btn.btn-default', {
        type: 'submit'
      }, 'login');
    });
  });
};

login_form = make_login_form();

name_content_form = tc.renderable(function(model) {
  form_group_input_div({
    input_id: 'input_name',
    label: 'Name',
    input_attributes: {
      name: 'name',
      placeholder: 'Name'
    }
  });
  form_group_input_div({
    input_id: 'input_content',
    input_type: tc.textarea,
    label: 'Content',
    input_attributes: {
      name: 'content',
      placeholder: '...'
    }
  });
  return tc.input('.btn.btn-default.btn-xs', {
    type: 'submit',
    value: 'Add'
  });
});

module.exports = {
  form_group_input_div: form_group_input_div,
  make_field_input: make_field_input,
  make_field_textarea: make_field_textarea,
  make_field_select: make_field_select,
  make_login_form: make_login_form,
  login_form: login_form,
  name_content_form: name_content_form
};


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

var BootstrapFormView, FormView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FormView = __webpack_require__(143);

BootstrapFormView = (function(superClass) {
  extend(BootstrapFormView, superClass);

  function BootstrapFormView() {
    this.invalid = bind(this.invalid, this);
    this.valid = bind(this.valid, this);
    return BootstrapFormView.__super__.constructor.apply(this, arguments);
  }

  BootstrapFormView.prototype.valid = function(view, attr, selector) {
    return this.$("[data-validation=" + attr + "]").parent().removeClass('has-error').addClass('has-success');
  };

  BootstrapFormView.prototype.invalid = function(view, attr, error, selector) {
    this.failure(this.model);
    return this.$("[data-validation=" + attr + "]").parent().removeClass('has-success').addClass('has-error');
  };

  return BootstrapFormView;

})(FormView);

module.exports = BootstrapFormView;


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

// Backbone.Validation v0.7.1
//
// Copyright (c) 2011-2012 Thomas Pedersen
// Distributed under MIT License
//
// Documentation and full license available at:
// http://thedersen.com/projects/backbone-validation
(function (factory) {
  if (true) {
    module.exports = factory(__webpack_require__(3), __webpack_require__(11));
  } else if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], factory);
  }
}(function (Backbone, _) {
  Backbone.Validation = (function(_){
    'use strict';
  
    // Default options
    // ---------------
  
    var defaultOptions = {
      forceUpdate: false,
      selector: 'name',
      labelFormatter: 'sentenceCase',
      valid: Function.prototype,
      invalid: Function.prototype
    };
  
  
    // Helper functions
    // ----------------
  
    // Formatting functions used for formatting error messages
    var formatFunctions = {
      // Uses the configured label formatter to format the attribute name
      // to make it more readable for the user
      formatLabel: function(attrName, model) {
        return defaultLabelFormatters[defaultOptions.labelFormatter](attrName, model);
      },
  
      // Replaces nummeric placeholders like {0} in a string with arguments
      // passed to the function
      format: function() {
        var args = Array.prototype.slice.call(arguments),
            text = args.shift();
        return text.replace(/\{(\d+)\}/g, function(match, number) {
          return typeof args[number] !== 'undefined' ? args[number] : match;
        });
      }
    };
  
    // Flattens an object
    // eg:
    //
    //     var o = {
    //       address: {
    //         street: 'Street',
    //         zip: 1234
    //       }
    //     };
    //
    // becomes:
    //
    //     var o = {
    //       'address.street': 'Street',
    //       'address.zip': 1234
    //     };
    var flatten = function (obj, into, prefix) {
      into = into || {};
      prefix = prefix || '';
  
      _.each(obj, function(val, key) {
        if(obj.hasOwnProperty(key)) {
          if (val && typeof val === 'object' && !(val instanceof Date || val instanceof RegExp)) {
            flatten(val, into, prefix + key + '.');
          }
          else {
            into[prefix + key] = val;
          }
        }
      });
  
      return into;
    };
  
    // Validation
    // ----------
  
    var Validation = (function(){
  
      // Returns an object with undefined properties for all
      // attributes on the model that has defined one or more
      // validation rules.
      var getValidatedAttrs = function(model) {
        return _.reduce(_.keys(model.validation || {}), function(memo, key) {
          memo[key] = void 0;
          return memo;
        }, {});
      };
  
      // Looks on the model for validations for a specified
      // attribute. Returns an array of any validators defined,
      // or an empty array if none is defined.
      var getValidators = function(model, attr) {
        var attrValidationSet = model.validation ? model.validation[attr] || {} : {};
  
        // If the validator is a function or a string, wrap it in a function validator
        if (_.isFunction(attrValidationSet) || _.isString(attrValidationSet)) {
          attrValidationSet = {
            fn: attrValidationSet
          };
        }
  
        // Stick the validator object into an array
        if(!_.isArray(attrValidationSet)) {
          attrValidationSet = [attrValidationSet];
        }
  
        // Reduces the array of validators into a new array with objects
        // with a validation method to call, the value to validate against
        // and the specified error message, if any
        return _.reduce(attrValidationSet, function(memo, attrValidation) {
          _.each(_.without(_.keys(attrValidation), 'msg'), function(validator) {
            memo.push({
              fn: defaultValidators[validator],
              val: attrValidation[validator],
              msg: attrValidation.msg
            });
          });
          return memo;
        }, []);
      };
  
      // Validates an attribute against all validators defined
      // for that attribute. If one or more errors are found,
      // the first error message is returned.
      // If the attribute is valid, an empty string is returned.
      var validateAttr = function(model, attr, value, computed) {
        // Reduces the array of validators to an error message by
        // applying all the validators and returning the first error
        // message, if any.
        return _.reduce(getValidators(model, attr), function(memo, validator){
          // Pass the format functions plus the default
          // validators as the context to the validator
          var ctx = _.extend({}, formatFunctions, defaultValidators),
              result = validator.fn.call(ctx, value, attr, validator.val, model, computed);
  
          if(result === false || memo === false) {
            return false;
          }
          if (result && !memo) {
            return validator.msg || result;
          }
          return memo;
        }, '');
      };
  
      // Loops through the model's attributes and validates them all.
      // Returns and object containing names of invalid attributes
      // as well as error messages.
      var validateModel = function(model, attrs) {
        var error,
            invalidAttrs = {},
            isValid = true,
            computed = _.clone(attrs),
            flattened = flatten(attrs);
  
        _.each(flattened, function(val, attr) {
          error = validateAttr(model, attr, val, computed);
          if (error) {
            invalidAttrs[attr] = error;
            isValid = false;
          }
        });
  
        return {
          invalidAttrs: invalidAttrs,
          isValid: isValid
        };
      };
  
      // Contains the methods that are mixed in on the model when binding
      var mixin = function(view, options) {
        return {
  
          // Check whether or not a value passes validation
          // without updating the model
          preValidate: function(attr, value) {
            return validateAttr(this, attr, value, _.extend({}, this.attributes));
          },
  
          // Check to see if an attribute, an array of attributes or the
          // entire model is valid. Passing true will force a validation
          // of the model.
          isValid: function(option) {
            var flattened = flatten(this.attributes);
  
            if(_.isString(option)){
              return !validateAttr(this, option, flattened[option], _.extend({}, this.attributes));
            }
            if(_.isArray(option)){
              return _.reduce(option, function(memo, attr) {
                return memo && !validateAttr(this, attr, flattened[attr], _.extend({}, this.attributes));
              }, true, this);
            }
            if(option === true) {
              this.validate();
            }
            return this.validation ? this._isValid : true;
          },
  
          // This is called by Backbone when it needs to perform validation.
          // You can call it manually without any parameters to validate the
          // entire model.
          validate: function(attrs, setOptions){
            var model = this,
                validateAll = !attrs,
                opt = _.extend({}, options, setOptions),
                validatedAttrs = getValidatedAttrs(model),
                allAttrs = _.extend({}, validatedAttrs, model.attributes, attrs),
                changedAttrs = flatten(attrs || allAttrs),
  
                result = validateModel(model, allAttrs);
  
            model._isValid = result.isValid;
  
            // After validation is performed, loop through all changed attributes
            // and call the valid callbacks so the view is updated.
            _.each(validatedAttrs, function(val, attr){
              var invalid = result.invalidAttrs.hasOwnProperty(attr);
              if(!invalid){
                opt.valid(view, attr, opt.selector);
              }
            });
  
            // After validation is performed, loop through all changed attributes
            // and call the invalid callback so the view is updated.
            _.each(validatedAttrs, function(val, attr){
              var invalid = result.invalidAttrs.hasOwnProperty(attr),
                  changed = changedAttrs.hasOwnProperty(attr);
  
              if(invalid && (changed || validateAll)){
                opt.invalid(view, attr, result.invalidAttrs[attr], opt.selector);
              }
            });
  
            // Trigger validated events.
            // Need to defer this so the model is actually updated before
            // the event is triggered.
            _.defer(function() {
              model.trigger('validated', model._isValid, model, result.invalidAttrs);
              model.trigger('validated:' + (model._isValid ? 'valid' : 'invalid'), model, result.invalidAttrs);
            });
  
            // Return any error messages to Backbone, unless the forceUpdate flag is set.
            // Then we do not return anything and fools Backbone to believe the validation was
            // a success. That way Backbone will update the model regardless.
            if (!opt.forceUpdate && _.intersection(_.keys(result.invalidAttrs), _.keys(changedAttrs)).length > 0) {
              return result.invalidAttrs;
            }
          }
        };
      };
  
      // Helper to mix in validation on a model
      var bindModel = function(view, model, options) {
        _.extend(model, mixin(view, options));
      };
  
      // Removes the methods added to a model
      var unbindModel = function(model) {
        delete model.validate;
        delete model.preValidate;
        delete model.isValid;
      };
  
      // Mix in validation on a model whenever a model is
      // added to a collection
      var collectionAdd = function(model) {
        bindModel(this.view, model, this.options);
      };
  
      // Remove validation from a model whenever a model is
      // removed from a collection
      var collectionRemove = function(model) {
        unbindModel(model);
      };
  
      // Returns the public methods on Backbone.Validation
      return {
  
        // Current version of the library
        version: '0.7.1',
  
        // Called to configure the default options
        configure: function(options) {
          _.extend(defaultOptions, options);
        },
  
        // Hooks up validation on a view with a model
        // or collection
        bind: function(view, options) {
          var model = view.model,
              collection = view.collection;
  
          options = _.extend({}, defaultOptions, defaultCallbacks, options);
  
          if(typeof model === 'undefined' && typeof collection === 'undefined'){
            throw 'Before you execute the binding your view must have a model or a collection.\n' +
                  'See http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.';
          }
  
          if(model) {
            bindModel(view, model, options);
          }
          else if(collection) {
            collection.each(function(model){
              bindModel(view, model, options);
            });
            collection.bind('add', collectionAdd, {view: view, options: options});
            collection.bind('remove', collectionRemove);
          }
        },
  
        // Removes validation from a view with a model
        // or collection
        unbind: function(view) {
          var model = view.model,
              collection = view.collection;
  
          if(model) {
            unbindModel(view.model);
          }
          if(collection) {
            collection.each(function(model){
              unbindModel(model);
            });
            collection.unbind('add', collectionAdd);
            collection.unbind('remove', collectionRemove);
          }
        },
  
        // Used to extend the Backbone.Model.prototype
        // with validation
        mixin: mixin(null, defaultOptions)
      };
    }());
  
  
    // Callbacks
    // ---------
  
    var defaultCallbacks = Validation.callbacks = {
  
      // Gets called when a previously invalid field in the
      // view becomes valid. Removes any error message.
      // Should be overridden with custom functionality.
      valid: function(view, attr, selector) {
        view.$('[' + selector + '~="' + attr + '"]')
            .removeClass('invalid')
            .removeAttr('data-error');
      },
  
      // Gets called when a field in the view becomes invalid.
      // Adds a error message.
      // Should be overridden with custom functionality.
      invalid: function(view, attr, error, selector) {
        view.$('[' + selector + '~="' + attr + '"]')
            .addClass('invalid')
            .attr('data-error', error);
      }
    };
  
  
    // Patterns
    // --------
  
    var defaultPatterns = Validation.patterns = {
      // Matches any digit(s) (i.e. 0-9)
      digits: /^\d+$/,
  
      // Matched any number (e.g. 100.000)
      number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
  
      // Matches a valid email address (e.g. mail@example.com)
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
  
      // Mathes any valid url (e.g. http://www.xample.com)
      url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    };
  
  
    // Error messages
    // --------------
  
    // Error message for the build in validators.
    // {x} gets swapped out with arguments form the validator.
    var defaultMessages = Validation.messages = {
      required: '{0} is required',
      acceptance: '{0} must be accepted',
      min: '{0} must be greater than or equal to {1}',
      max: '{0} must be less than or equal to {1}',
      range: '{0} must be between {1} and {2}',
      length: '{0} must be {1} characters',
      minLength: '{0} must be at least {1} characters',
      maxLength: '{0} must be at most {1} characters',
      rangeLength: '{0} must be between {1} and {2} characters',
      oneOf: '{0} must be one of: {1}',
      equalTo: '{0} must be the same as {1}',
      pattern: '{0} must be a valid {1}'
    };
  
    // Label formatters
    // ----------------
  
    // Label formatters are used to convert the attribute name
    // to a more human friendly label when using the built in
    // error messages.
    // Configure which one to use with a call to
    //
    //     Backbone.Validation.configure({
    //       labelFormatter: 'label'
    //     });
    var defaultLabelFormatters = Validation.labelFormatters = {
  
      // Returns the attribute name with applying any formatting
      none: function(attrName) {
        return attrName;
      },
  
      // Converts attributeName or attribute_name to Attribute name
      sentenceCase: function(attrName) {
        return attrName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
          return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
        }).replace('_', ' ');
      },
  
      // Looks for a label configured on the model and returns it
      //
      //      var Model = Backbone.Model.extend({
      //        validation: {
      //          someAttribute: {
      //            required: true
      //          }
      //        },
      //
      //        labels: {
      //          someAttribute: 'Custom label'
      //        }
      //      });
      label: function(attrName, model) {
        return (model.labels && model.labels[attrName]) || defaultLabelFormatters.sentenceCase(attrName, model);
      }
    };
  
  
    // Built in validators
    // -------------------
  
    var defaultValidators = Validation.validators = (function(){
      // Use native trim when defined
      var trim = String.prototype.trim ?
        function(text) {
          return text === null ? '' : String.prototype.trim.call(text);
        } :
        function(text) {
          var trimLeft = /^\s+/,
              trimRight = /\s+$/;
  
          return text === null ? '' : text.toString().replace(trimLeft, '').replace(trimRight, '');
        };
  
      // Determines whether or not a value is a number
      var isNumber = function(value){
        return _.isNumber(value) || (_.isString(value) && value.match(defaultPatterns.number));
      };
  
      // Determines whether or not not a value is empty
      var hasValue = function(value) {
        return !(_.isNull(value) || _.isUndefined(value) || (_.isString(value) && trim(value) === ''));
      };
  
      return {
        // Function validator
        // Lets you implement a custom function used for validation
        fn: function(value, attr, fn, model, computed) {
          if(_.isString(fn)){
            fn = model[fn];
          }
          return fn.call(model, value, attr, computed);
        },
  
        // Required validator
        // Validates if the attribute is required or not
        required: function(value, attr, required, model, computed) {
          var isRequired = _.isFunction(required) ? required.call(model, value, attr, computed) : required;
          if(!isRequired && !hasValue(value)) {
            return false; // overrides all other validators
          }
          if (isRequired && !hasValue(value)) {
            return this.format(defaultMessages.required, this.formatLabel(attr, model));
          }
        },
  
        // Acceptance validator
        // Validates that something has to be accepted, e.g. terms of use
        // `true` or 'true' are valid
        acceptance: function(value, attr, accept, model) {
          if(value !== 'true' && (!_.isBoolean(value) || value === false)) {
            return this.format(defaultMessages.acceptance, this.formatLabel(attr, model));
          }
        },
  
        // Min validator
        // Validates that the value has to be a number and equal to or greater than
        // the min value specified
        min: function(value, attr, minValue, model) {
          if (!isNumber(value) || value < minValue) {
            return this.format(defaultMessages.min, this.formatLabel(attr, model), minValue);
          }
        },
  
        // Max validator
        // Validates that the value has to be a number and equal to or less than
        // the max value specified
        max: function(value, attr, maxValue, model) {
          if (!isNumber(value) || value > maxValue) {
            return this.format(defaultMessages.max, this.formatLabel(attr, model), maxValue);
          }
        },
  
        // Range validator
        // Validates that the value has to be a number and equal to or between
        // the two numbers specified
        range: function(value, attr, range, model) {
          if(!isNumber(value) || value < range[0] || value > range[1]) {
            return this.format(defaultMessages.range, this.formatLabel(attr, model), range[0], range[1]);
          }
        },
  
        // Length validator
        // Validates that the value has to be a string with length equal to
        // the length value specified
        length: function(value, attr, length, model) {
          if (!hasValue(value) || trim(value).length !== length) {
            return this.format(defaultMessages.length, this.formatLabel(attr, model), length);
          }
        },
  
        // Min length validator
        // Validates that the value has to be a string with length equal to or greater than
        // the min length value specified
        minLength: function(value, attr, minLength, model) {
          if (!hasValue(value) || trim(value).length < minLength) {
            return this.format(defaultMessages.minLength, this.formatLabel(attr, model), minLength);
          }
        },
  
        // Max length validator
        // Validates that the value has to be a string with length equal to or less than
        // the max length value specified
        maxLength: function(value, attr, maxLength, model) {
          if (!hasValue(value) || trim(value).length > maxLength) {
            return this.format(defaultMessages.maxLength, this.formatLabel(attr, model), maxLength);
          }
        },
  
        // Range length validator
        // Validates that the value has to be a string and equal to or between
        // the two numbers specified
        rangeLength: function(value, attr, range, model) {
          if(!hasValue(value) || trim(value).length < range[0] || trim(value).length > range[1]) {
            return this.format(defaultMessages.rangeLength, this.formatLabel(attr, model), range[0], range[1]);
          }
        },
  
        // One of validator
        // Validates that the value has to be equal to one of the elements in
        // the specified array. Case sensitive matching
        oneOf: function(value, attr, values, model) {
          if(!_.include(values, value)){
            return this.format(defaultMessages.oneOf, this.formatLabel(attr, model), values.join(', '));
          }
        },
  
        // Equal to validator
        // Validates that the value has to be equal to the value of the attribute
        // with the name specified
        equalTo: function(value, attr, equalTo, model, computed) {
          if(value !== computed[equalTo]) {
            return this.format(defaultMessages.equalTo, this.formatLabel(attr, model), this.formatLabel(equalTo, model));
          }
        },
  
        // Pattern validator
        // Validates that the value has to match the pattern specified.
        // Can be a regular expression or the name of one of the built in patterns
        pattern: function(value, attr, pattern, model) {
          if (!hasValue(value) || !value.toString().match(defaultPatterns[pattern] || pattern)) {
            return this.format(defaultMessages.pattern, this.formatLabel(attr, model), pattern);
          }
        }
      };
    }());
  
    return Validation;
  }(_));
  
  return Backbone.Validation;
}));

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

var FormView, Marionette, Validation, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = __webpack_require__(11);

Marionette = __webpack_require__(4);

Validation = __webpack_require__(142);

FormView = (function(superClass) {
  extend(FormView, superClass);

  function FormView() {
    this.invalid = bind(this.invalid, this);
    this.valid = bind(this.valid, this);
    FormView.__super__.constructor.apply(this, arguments);
    this.listenTo(this, 'render', this.hideActivityIndicator);
    this.listenTo(this, 'render', this.prepareModel);
    this.listenTo(this, 'save:form:success', this.success);
    this.listenTo(this, 'save:form:failure', this.failure);
  }

  FormView.prototype.delegateEvents = function(events) {
    this.ui = _.extend(this._baseUI(), _.result(this, 'ui'));
    this.events = _.extend(this._baseEvents(), _.result(this, 'events'));
    return FormView.__super__.delegateEvents.call(this, events);
  };

  FormView.prototype.tagName = 'form';

  FormView.prototype._baseUI = function() {
    return {
      submit: 'input[type="submit"]',
      activityIndicator: '.spinner'
    };
  };

  FormView.prototype._baseEvents = function() {
    var eventHash;
    eventHash = {
      'change [data-validation]': this.validateField,
      'blur [data-validation]': this.validateField,
      'keyup [data-validation]': this.validateField
    };
    eventHash["click " + this.ui.submit] = this.processForm;
    return eventHash;
  };

  FormView.prototype.createModel = function() {
    throw new Error('implement #createModel in your FormView subclass to return a Backbone model');
  };

  FormView.prototype.prepareModel = function() {
    this.model = this.createModel();
    return this.setupValidation();
  };

  FormView.prototype.validateField = function(e) {
    var validation, value;
    validation = $(e.target).attr('data-validation');
    value = $(e.target).val();
    if (this.model.preValidate(validation, value)) {
      return this.invalid(this, validation);
    } else {
      return this.valid(this, validation);
    }
  };

  FormView.prototype.processForm = function(e) {
    e.preventDefault();
    this.showActivityIndicator();
    this.updateModel();
    return this.saveModel();
  };

  FormView.prototype.updateModel = function() {
    throw new Error('implement #updateModel in your FormView subclass to update the attributes of @model');
  };

  FormView.prototype.saveModel = function() {
    var callbacks;
    callbacks = {
      success: (function(_this) {
        return function() {
          return _this.trigger('save:form:success', _this.model);
        };
      })(this),
      error: (function(_this) {
        return function() {
          return _this.trigger('save:form:failure', _this.model);
        };
      })(this)
    };
    return this.model.save({}, callbacks);
  };

  FormView.prototype.success = function(model) {
    this.render();
    return this.onSuccess(model);
  };

  FormView.prototype.onSuccess = function(model) {
    return null;
  };

  FormView.prototype.failure = function(model) {
    this.hideActivityIndicator();
    return this.onFailure(model);
  };

  FormView.prototype.onFailure = function(model) {
    return null;
  };

  FormView.prototype.showActivityIndicator = function() {
    this.ui.activityIndicator.show();
    return this.ui.submit.hide();
  };

  FormView.prototype.hideActivityIndicator = function() {
    this.ui.activityIndicator.hide();
    return this.ui.submit.show();
  };

  FormView.prototype.setupValidation = function() {
    Backbone.Validation.unbind(this);
    return Backbone.Validation.bind(this, {
      valid: this.valid,
      invalid: this.invalid
    });
  };

  FormView.prototype.valid = function(view, attr, selector) {
    return this.$("[data-validation=" + attr + "]").removeClass('invalid').addClass('valid');
  };

  FormView.prototype.invalid = function(view, attr, error, selector) {
    this.failure(this.model);
    return this.$("[data-validation=" + attr + "]").removeClass('valid').addClass('invalid');
  };

  return FormView;

})(Backbone.Marionette.View);

module.exports = FormView;


/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, BootstrapFormView, BumblrChannel, Marionette, NewBlogFormView, form_group_input_div, navigate_to_url, new_blog_form_view, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

tc = __webpack_require__(6);

BootstrapFormView = __webpack_require__(138);

form_group_input_div = __webpack_require__(132).form_group_input_div;

navigate_to_url = __webpack_require__(129).navigate_to_url;

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


/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, BootstrapFormView, BumblrChannel, ConsumerKeyFormView, consumer_key_form, form_group_input_div, navigate_to_url, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

tc = __webpack_require__(6);

BootstrapFormView = __webpack_require__(138);

navigate_to_url = __webpack_require__(129).navigate_to_url;

form_group_input_div = __webpack_require__(132).form_group_input_div;

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


/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var Backbone, BootstrapFormView, HubChannel, ListItemsView, ListItemsViewComposite, Marionette, SimpleItemView, make_field_input, make_field_textarea, make_item_div, ref, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = __webpack_require__(3);

Marionette = __webpack_require__(4);

tc = __webpack_require__(6);

BootstrapFormView = __webpack_require__(138);

ref = __webpack_require__(132), make_field_input = ref.make_field_input, make_field_textarea = ref.make_field_textarea;

HubChannel = Backbone.Radio.channel('hubby');

make_item_div = tc.renderable(function(item) {
  tc.div('.hubby-meeting-item-info', function() {
    tc.div('.hubby-meeting-item-agenda-num', "!agenda_num");
    tc.div('.hubby-meeting-item-fileid', item.file_id);
    return tc.div('.hubby-meeting-item-status', item.status);
  });
  return tc.div('.hubby-meeting-item-content', function() {
    return tc.p('.hubby-meeting-item-text', item.title);
  });
});

SimpleItemView = (function(superClass) {
  extend(SimpleItemView, superClass);

  function SimpleItemView() {
    return SimpleItemView.__super__.constructor.apply(this, arguments);
  }

  SimpleItemView.prototype.template = make_item_div;

  return SimpleItemView;

})(Backbone.Marionette.View);

ListItemsViewComposite = (function(superClass) {
  extend(ListItemsViewComposite, superClass);

  function ListItemsViewComposite() {
    return ListItemsViewComposite.__super__.constructor.apply(this, arguments);
  }

  ListItemsViewComposite.prototype.childView = SimpleItemView;

  ListItemsViewComposite.prototype.template = tc.renderable(function() {
    tc.div('.listview-header', function() {
      return tc.text("Items");
    });
    tc.hr();
    return tc.ul("#items-container.list-group");
  });

  return ListItemsViewComposite;

})(Backbone.Marionette.CompositeView);

ListItemsView = (function(superClass) {
  extend(ListItemsView, superClass);

  function ListItemsView() {
    return ListItemsView.__super__.constructor.apply(this, arguments);
  }

  ListItemsView.prototype.childView = SimpleItemView;

  ListItemsView.prototype.template = tc.renderable(function() {
    console.log("ListItemsView options", this.options);
    tc.div('.listview-header', function() {
      return tc.text("Items");
    });
    tc.hr();
    return tc.ul("#items-container.list-group");
  });

  return ListItemsView;

})(Backbone.Marionette.CollectionView);

module.exports = ListItemsView;


/***/ })

});
//# sourceMappingURL=6.js.map