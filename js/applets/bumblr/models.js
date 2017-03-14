var Backbone, BaseLocalStorageModel, BaseTumblrModel, BlogInfo, BumblrChannel, BumblrSettings, baseURL, bumblr_settings, consumer_key,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

BumblrChannel = Backbone.Radio.channel('bumblr');

BaseLocalStorageModel = (function(superClass) {
  extend(BaseLocalStorageModel, superClass);

  function BaseLocalStorageModel() {
    return BaseLocalStorageModel.__super__.constructor.apply(this, arguments);
  }

  BaseLocalStorageModel.prototype.initialize = function() {
    this.fetch();
    return this.on('change', this.save, this);
  };

  BaseLocalStorageModel.prototype.fetch = function() {
    return this.set(JSON.parse(localStorage.getItem(this.id)));
  };

  BaseLocalStorageModel.prototype.save = function(attributes, options) {
    localStorage.setItem(this.id, JSON.stringify(this.toJSON()));
    return $.ajax({
      success: options.success,
      error: options.error
    });
  };

  BaseLocalStorageModel.prototype.destroy = function(options) {
    return localStorage.removeItem(this.id);
  };

  BaseLocalStorageModel.prototype.isEmpty = function() {
    return _.size(this.attributes <= 1);
  };

  return BaseLocalStorageModel;

})(Backbone.Model);

baseURL = '//api.tumblr.com/v2';

BumblrSettings = (function(superClass) {
  extend(BumblrSettings, superClass);

  function BumblrSettings() {
    return BumblrSettings.__super__.constructor.apply(this, arguments);
  }

  BumblrSettings.prototype.id = 'bumblr_settings';

  return BumblrSettings;

})(BaseLocalStorageModel);

BaseTumblrModel = (function(superClass) {
  extend(BaseTumblrModel, superClass);

  function BaseTumblrModel() {
    return BaseTumblrModel.__super__.constructor.apply(this, arguments);
  }

  BaseTumblrModel.prototype.baseURL = baseURL;

  return BaseTumblrModel;

})(Backbone.Model);

BlogInfo = (function(superClass) {
  extend(BlogInfo, superClass);

  function BlogInfo() {
    return BlogInfo.__super__.constructor.apply(this, arguments);
  }

  BlogInfo.prototype.url = function() {
    return this.baseURL + "/blog/" + this.id + "/info?api_key=" + this.api_key + "&callback=?";
  };

  return BlogInfo;

})(BaseTumblrModel);

consumer_key = '4mhV8B1YQK6PUA2NW8eZZXVHjU55TPJ3UZnZGrbSoCnqJaxDyH';

bumblr_settings = new BumblrSettings({
  consumer_key: consumer_key
});

BumblrChannel.reply('get_app_settings', function() {
  return bumblr_settings;
});

module.exports = {
  BlogInfo: BlogInfo
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvbW9kZWxzLmpzIiwic291cmNlcyI6WyJhcHBsZXRzL2J1bWJsci9tb2RlbHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsaUlBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUVYLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVWOzs7Ozs7O2tDQUNKLFVBQUEsR0FBWSxTQUFBO0lBQ1YsSUFBQyxDQUFBLEtBQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxFQUFELENBQUksUUFBSixFQUFjLElBQUMsQ0FBQSxJQUFmLEVBQXFCLElBQXJCO0VBRlU7O2tDQUdYLEtBQUEsR0FBTyxTQUFBO1dBRU4sSUFBQyxDQUFBLEdBQUQsQ0FBSyxJQUFJLENBQUMsS0FBTCxDQUFXLFlBQVksQ0FBQyxPQUFiLENBQXFCLElBQUMsQ0FBQSxFQUF0QixDQUFYLENBQUw7RUFGTTs7a0NBR1AsSUFBQSxHQUFNLFNBQUMsVUFBRCxFQUFhLE9BQWI7SUFFTCxZQUFZLENBQUMsT0FBYixDQUFxQixJQUFDLENBQUEsRUFBdEIsRUFBMEIsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFDLENBQUEsTUFBRCxDQUFBLENBQWYsQ0FBMUI7QUFDQSxXQUFPLENBQUMsQ0FBQyxJQUFGLENBQ0w7TUFBQSxPQUFBLEVBQVMsT0FBTyxDQUFDLE9BQWpCO01BQ0EsS0FBQSxFQUFPLE9BQU8sQ0FBQyxLQURmO0tBREs7RUFIRjs7a0NBT1AsT0FBQSxHQUFTLFNBQUMsT0FBRDtXQUVQLFlBQVksQ0FBQyxVQUFiLENBQXdCLElBQUMsQ0FBQSxFQUF6QjtFQUZPOztrQ0FHUixPQUFBLEdBQVMsU0FBQTtXQUNSLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBQyxDQUFBLFVBQUQsSUFBZSxDQUF0QjtFQURROzs7O0dBakJ3QixRQUFRLENBQUM7O0FBdUI3QyxPQUFBLEdBQVU7O0FBRUo7Ozs7Ozs7MkJBQ0osRUFBQSxHQUFJOzs7O0dBRHVCOztBQUd2Qjs7Ozs7Ozs0QkFDSixPQUFBLEdBQVM7Ozs7R0FEbUIsUUFBUSxDQUFDOztBQUdqQzs7Ozs7OztxQkFDSixHQUFBLEdBQUssU0FBQTtXQUNBLElBQUMsQ0FBQSxPQUFGLEdBQVUsUUFBVixHQUFrQixJQUFDLENBQUEsRUFBbkIsR0FBc0IsZ0JBQXRCLEdBQXNDLElBQUMsQ0FBQSxPQUF2QyxHQUErQztFQUQ5Qzs7OztHQURnQjs7QUFJdkIsWUFBQSxHQUFlOztBQUNmLGVBQUEsR0FBa0IsSUFBSSxjQUFKLENBQW1CO0VBQUEsWUFBQSxFQUFhLFlBQWI7Q0FBbkI7O0FBQ2xCLGFBQWEsQ0FBQyxLQUFkLENBQW9CLGtCQUFwQixFQUF3QyxTQUFBO1NBQ3RDO0FBRHNDLENBQXhDOztBQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxRQUFBLEVBQVUsUUFBViIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5cbkJ1bWJsckNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdidW1ibHInXG5cbmNsYXNzIEJhc2VMb2NhbFN0b3JhZ2VNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGluaXRpYWxpemU6ICgpIC0+XG4gICAgQGZldGNoKClcbiAgICBAb24gJ2NoYW5nZScsIEBzYXZlLCBAXG4gICBmZXRjaDogKCkgLT5cbiAgICAjY29uc29sZS5sb2cgJz09PT09IEZFVENIIEZJUkVEIExPQURJTkcgTE9DQUwgU1RPUkFHRSA9PT09J1xuICAgIEBzZXQgSlNPTi5wYXJzZSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSBAaWRcbiAgIHNhdmU6IChhdHRyaWJ1dGVzLCBvcHRpb25zKSAtPlxuICAgICNjb25zb2xlLmxvZyAnPT09PT0gQ0hBTkdFIEZJUkVEIFNBVklORyBMT0NBTCBTVE9SQUdFID09PT0nXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQGlkLCBKU09OLnN0cmluZ2lmeShAdG9KU09OKCkpKVxuICAgIHJldHVybiAkLmFqYXhcbiAgICAgIHN1Y2Nlc3M6IG9wdGlvbnMuc3VjY2Vzc1xuICAgICAgZXJyb3I6IG9wdGlvbnMuZXJyb3JcbiAgICAgIFxuICBkZXN0cm95OiAob3B0aW9ucykgLT5cbiAgICAjY29uc29sZS5sb2cgJz09PT09IERFU1RST1kgTE9DQUwgU1RPUkFHRSA9PT09J1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtIEBpZFxuICAgaXNFbXB0eTogKCkgLT5cbiAgICBfLnNpemUgQGF0dHJpYnV0ZXMgPD0gMVxuICAgIFxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBNb2RlbHNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbmJhc2VVUkwgPSAnLy9hcGkudHVtYmxyLmNvbS92MidcblxuY2xhc3MgQnVtYmxyU2V0dGluZ3MgZXh0ZW5kcyBCYXNlTG9jYWxTdG9yYWdlTW9kZWxcbiAgaWQ6ICdidW1ibHJfc2V0dGluZ3MnXG4gIFxuY2xhc3MgQmFzZVR1bWJsck1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgYmFzZVVSTDogYmFzZVVSTFxuICBcbmNsYXNzIEJsb2dJbmZvIGV4dGVuZHMgQmFzZVR1bWJsck1vZGVsXG4gIHVybDogKCkgLT5cbiAgICBcIiN7QGJhc2VVUkx9L2Jsb2cvI3tAaWR9L2luZm8/YXBpX2tleT0je0BhcGlfa2V5fSZjYWxsYmFjaz0/XCJcbiAgICBcbmNvbnN1bWVyX2tleSA9ICc0bWhWOEIxWVFLNlBVQTJOVzhlWlpYVkhqVTU1VFBKM1VablpHcmJTb0NucUpheER5SCdcbmJ1bWJscl9zZXR0aW5ncyA9IG5ldyBCdW1ibHJTZXR0aW5ncyBjb25zdW1lcl9rZXk6Y29uc3VtZXJfa2V5XG5CdW1ibHJDaGFubmVsLnJlcGx5ICdnZXRfYXBwX3NldHRpbmdzJywgLT5cbiAgYnVtYmxyX3NldHRpbmdzXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIEJsb2dJbmZvOiBCbG9nSW5mb1xuICBcbiJdfQ==
