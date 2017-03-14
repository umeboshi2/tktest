var Backbone, BaseLocalStorageCollection, BlogPosts, BumblrChannel, LocalBlogCollection, MainChannel, Marionette, Models, PageableCollection, PhotoPostCollection, api_key, baseURL, local_blogs, make_blog_post_collection, req, settings,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

PageableCollection = require('backbone.paginator');

BaseLocalStorageCollection = require('agate/src/lscollection').BaseLocalStorageCollection;

Models = require('./models');

MainChannel = Backbone.Radio.channel('global');

BumblrChannel = Backbone.Radio.channel('bumblr');

baseURL = '//api.tumblr.com/v2';

PhotoPostCollection = (function(superClass) {
  extend(PhotoPostCollection, superClass);

  function PhotoPostCollection() {
    return PhotoPostCollection.__super__.constructor.apply(this, arguments);
  }

  PhotoPostCollection.prototype.url = function() {
    return baseURL + "/" + this.id + "/posts/photo?callback=?";
  };

  return PhotoPostCollection;

})(Backbone.Collection);

BlogPosts = (function(superClass) {
  extend(BlogPosts, superClass);

  function BlogPosts() {
    return BlogPosts.__super__.constructor.apply(this, arguments);
  }

  BlogPosts.prototype.mode = 'server';

  BlogPosts.prototype.full = true;

  BlogPosts.prototype.baseURL = baseURL;

  BlogPosts.prototype.url = function() {
    return this.baseURL + "/blog/" + this.base_hostname + "/posts/photo?api_key=" + this.api_key;
  };

  BlogPosts.prototype.fetch = function(options) {
    var current_page, data, offset;
    options || (options = {});
    data = options.data || {};
    current_page = this.state.currentPage;
    offset = current_page * this.state.pageSize;
    options.offset = offset;
    options.dataType = 'jsonp';
    return BlogPosts.__super__.fetch.call(this, options);
  };

  BlogPosts.prototype.parse = function(response) {
    var total_posts;
    total_posts = response.response.total_posts;
    this.state.totalRecords = total_posts;
    return BlogPosts.__super__.parse.call(this, response.response.posts);
  };

  BlogPosts.prototype.state = {
    firstPage: 0,
    pageSize: 15
  };

  BlogPosts.prototype.queryParams = {
    pageSize: 'limit',
    offset: function() {
      return this.state.currentPage * this.state.pageSize;
    }
  };

  return BlogPosts;

})(PageableCollection);

make_blog_post_collection = function(base_hostname) {
  var api_key, bp, settings;
  settings = BumblrChannel.request('get_app_settings');
  api_key = settings.get('consumer_key');
  bp = new BlogPosts;
  bp.api_key = api_key;
  bp.base_hostname = base_hostname;
  return bp;
};

req = 'make_blog_post_collection';

BumblrChannel.reply(req, function(base_hostname) {
  return make_blog_post_collection(base_hostname);
});

LocalBlogCollection = (function(superClass) {
  extend(LocalBlogCollection, superClass);

  function LocalBlogCollection() {
    return LocalBlogCollection.__super__.constructor.apply(this, arguments);
  }

  LocalBlogCollection.prototype.model = Models.BlogInfo;

  LocalBlogCollection.prototype.add_blog = function(name) {
    var model, sitename;
    sitename = name + ".tumblr.com";
    model = new Models.BlogInfo;
    model.set('id', sitename);
    model.set('name', name);
    model.api_key = this.api_key;
    this.add(model);
    this.save();
    model.fetch();
    return model;
  };

  return LocalBlogCollection;

})(BaseLocalStorageCollection);

local_blogs = new LocalBlogCollection;

settings = BumblrChannel.request('get_app_settings');

api_key = settings.get('consumer_key');

local_blogs.api_key = api_key;

BumblrChannel.reply('get_local_blogs', function() {
  return local_blogs;
});

module.exports = {
  PhotoPostCollection: PhotoPostCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9idW1ibHIvY29sbGVjdGlvbnMuanMiLCJzb3VyY2VzIjpbImFwcGxldHMvYnVtYmxyL2NvbGxlY3Rpb25zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHNPQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSxvQkFBUjs7QUFHbkIsNkJBQStCLE9BQUEsQ0FBUSx3QkFBUjs7QUFFakMsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSOztBQUdULFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsYUFBQSxHQUFnQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRWhCLE9BQUEsR0FBVTs7QUFFSjs7Ozs7OztnQ0FDSixHQUFBLEdBQUssU0FBQTtXQUNBLE9BQUQsR0FBUyxHQUFULEdBQVksSUFBQyxDQUFBLEVBQWIsR0FBZ0I7RUFEZjs7OztHQUQyQixRQUFRLENBQUM7O0FBSXJDOzs7Ozs7O3NCQUNKLElBQUEsR0FBTTs7c0JBQ04sSUFBQSxHQUFNOztzQkFDTixPQUFBLEdBQVM7O3NCQUNULEdBQUEsR0FBSyxTQUFBO1dBQ0EsSUFBQyxDQUFBLE9BQUYsR0FBVSxRQUFWLEdBQWtCLElBQUMsQ0FBQSxhQUFuQixHQUFpQyx1QkFBakMsR0FBd0QsSUFBQyxDQUFBO0VBRHhEOztzQkFHTCxLQUFBLEdBQU8sU0FBQyxPQUFEO0FBQ0wsUUFBQTtJQUFBLE9BQUEsSUFBVyxDQUFBLE9BQUEsR0FBVSxFQUFWO0lBQ1gsSUFBQSxHQUFRLE9BQU8sQ0FBQyxJQUFSLElBQWdCO0lBQ3hCLFlBQUEsR0FBZSxJQUFDLENBQUEsS0FBSyxDQUFDO0lBQ3RCLE1BQUEsR0FBUyxZQUFBLEdBQWUsSUFBQyxDQUFBLEtBQUssQ0FBQztJQUMvQixPQUFPLENBQUMsTUFBUixHQUFpQjtJQUNqQixPQUFPLENBQUMsUUFBUixHQUFtQjtXQUNuQixxQ0FBTSxPQUFOO0VBUEs7O3NCQVNQLEtBQUEsR0FBTyxTQUFDLFFBQUQ7QUFDTCxRQUFBO0lBQUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDaEMsSUFBQyxDQUFBLEtBQUssQ0FBQyxZQUFQLEdBQXNCO1dBQ3RCLHFDQUFNLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBeEI7RUFISzs7c0JBSU4sS0FBQSxHQUNDO0lBQUEsU0FBQSxFQUFXLENBQVg7SUFDQSxRQUFBLEVBQVUsRUFEVjs7O3NCQUdGLFdBQUEsR0FDRTtJQUFBLFFBQUEsRUFBVSxPQUFWO0lBQ0EsTUFBQSxFQUFRLFNBQUE7YUFDTixJQUFDLENBQUEsS0FBSyxDQUFDLFdBQVAsR0FBcUIsSUFBQyxDQUFBLEtBQUssQ0FBQztJQUR0QixDQURSOzs7OztHQXpCb0I7O0FBNkJ4Qix5QkFBQSxHQUE0QixTQUFDLGFBQUQ7QUFDMUIsTUFBQTtFQUFBLFFBQUEsR0FBVyxhQUFhLENBQUMsT0FBZCxDQUFzQixrQkFBdEI7RUFDWCxPQUFBLEdBQVUsUUFBUSxDQUFDLEdBQVQsQ0FBYSxjQUFiO0VBQ1YsRUFBQSxHQUFLLElBQUk7RUFDVCxFQUFFLENBQUMsT0FBSCxHQUFhO0VBQ2IsRUFBRSxDQUFDLGFBQUgsR0FBbUI7QUFDbkIsU0FBTztBQU5tQjs7QUFRNUIsR0FBQSxHQUFNOztBQUNOLGFBQWEsQ0FBQyxLQUFkLENBQW9CLEdBQXBCLEVBQXlCLFNBQUMsYUFBRDtTQUN2Qix5QkFBQSxDQUEwQixhQUExQjtBQUR1QixDQUF6Qjs7QUFJTTs7Ozs7OztnQ0FDSixLQUFBLEdBQU8sTUFBTSxDQUFDOztnQ0FFZCxRQUFBLEdBQVUsU0FBQyxJQUFEO0FBQ1IsUUFBQTtJQUFBLFFBQUEsR0FBYyxJQUFELEdBQU07SUFDbkIsS0FBQSxHQUFRLElBQUksTUFBTSxDQUFDO0lBQ25CLEtBQUssQ0FBQyxHQUFOLENBQVUsSUFBVixFQUFnQixRQUFoQjtJQUNBLEtBQUssQ0FBQyxHQUFOLENBQVUsTUFBVixFQUFrQixJQUFsQjtJQUNBLEtBQUssQ0FBQyxPQUFOLEdBQWdCLElBQUMsQ0FBQTtJQUNqQixJQUFDLENBQUEsR0FBRCxDQUFLLEtBQUw7SUFDQSxJQUFDLENBQUEsSUFBRCxDQUFBO0lBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBQTtBQUNBLFdBQU87RUFUQzs7OztHQUhzQjs7QUFjbEMsV0FBQSxHQUFjLElBQUk7O0FBQ2xCLFFBQUEsR0FBVyxhQUFhLENBQUMsT0FBZCxDQUFzQixrQkFBdEI7O0FBQ1gsT0FBQSxHQUFVLFFBQVEsQ0FBQyxHQUFULENBQWEsY0FBYjs7QUFDVixXQUFXLENBQUMsT0FBWixHQUFzQjs7QUFDdEIsYUFBYSxDQUFDLEtBQWQsQ0FBb0IsaUJBQXBCLEVBQXVDLFNBQUE7U0FDckM7QUFEcUMsQ0FBdkM7O0FBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLG1CQUFBLEVBQXFCLG1CQUFyQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblBhZ2VhYmxlQ29sbGVjdGlvbiA9IHJlcXVpcmUgJ2JhY2tib25lLnBhZ2luYXRvcidcblxuI1V0aWwgPSByZXF1aXJlICdhZ2F0ZS9zcmMvYXBwdXRpbCdcbnsgQmFzZUxvY2FsU3RvcmFnZUNvbGxlY3Rpb24gfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9sc2NvbGxlY3Rpb24nXG5cbk1vZGVscyA9IHJlcXVpcmUgJy4vbW9kZWxzJ1xuXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuQnVtYmxyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2J1bWJscidcblxuYmFzZVVSTCA9ICcvL2FwaS50dW1ibHIuY29tL3YyJ1xuICBcbmNsYXNzIFBob3RvUG9zdENvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIHVybDogKCkgLT5cbiAgICBcIiN7YmFzZVVSTH0vI3tAaWR9L3Bvc3RzL3Bob3RvP2NhbGxiYWNrPT9cIlxuICAgIFxuY2xhc3MgQmxvZ1Bvc3RzIGV4dGVuZHMgUGFnZWFibGVDb2xsZWN0aW9uXG4gIG1vZGU6ICdzZXJ2ZXInXG4gIGZ1bGw6IHRydWVcbiAgYmFzZVVSTDogYmFzZVVSTFxuICB1cmw6ICgpIC0+XG4gICAgXCIje0BiYXNlVVJMfS9ibG9nLyN7QGJhc2VfaG9zdG5hbWV9L3Bvc3RzL3Bob3RvP2FwaV9rZXk9I3tAYXBpX2tleX1cIlxuXG4gIGZldGNoOiAob3B0aW9ucykgLT5cbiAgICBvcHRpb25zIHx8IG9wdGlvbnMgPSB7fVxuICAgIGRhdGEgPSAob3B0aW9ucy5kYXRhIHx8IHt9KVxuICAgIGN1cnJlbnRfcGFnZSA9IEBzdGF0ZS5jdXJyZW50UGFnZVxuICAgIG9mZnNldCA9IGN1cnJlbnRfcGFnZSAqIEBzdGF0ZS5wYWdlU2l6ZVxuICAgIG9wdGlvbnMub2Zmc2V0ID0gb2Zmc2V0XG4gICAgb3B0aW9ucy5kYXRhVHlwZSA9ICdqc29ucCdcbiAgICBzdXBlciBvcHRpb25zXG4gICAgXG4gIHBhcnNlOiAocmVzcG9uc2UpIC0+XG4gICAgdG90YWxfcG9zdHMgPSByZXNwb25zZS5yZXNwb25zZS50b3RhbF9wb3N0c1xuICAgIEBzdGF0ZS50b3RhbFJlY29yZHMgPSB0b3RhbF9wb3N0c1xuICAgIHN1cGVyIHJlc3BvbnNlLnJlc3BvbnNlLnBvc3RzXG4gICBzdGF0ZTpcbiAgICBmaXJzdFBhZ2U6IDBcbiAgICBwYWdlU2l6ZTogMTVcbiAgICBcbiAgcXVlcnlQYXJhbXM6XG4gICAgcGFnZVNpemU6ICdsaW1pdCdcbiAgICBvZmZzZXQ6ICgpIC0+XG4gICAgICBAc3RhdGUuY3VycmVudFBhZ2UgKiBAc3RhdGUucGFnZVNpemVcbiAgICAgIFxubWFrZV9ibG9nX3Bvc3RfY29sbGVjdGlvbiA9IChiYXNlX2hvc3RuYW1lKSAtPlxuICBzZXR0aW5ncyA9IEJ1bWJsckNoYW5uZWwucmVxdWVzdCAnZ2V0X2FwcF9zZXR0aW5ncydcbiAgYXBpX2tleSA9IHNldHRpbmdzLmdldCAnY29uc3VtZXJfa2V5J1xuICBicCA9IG5ldyBCbG9nUG9zdHNcbiAgYnAuYXBpX2tleSA9IGFwaV9rZXlcbiAgYnAuYmFzZV9ob3N0bmFtZSA9IGJhc2VfaG9zdG5hbWVcbiAgcmV0dXJuIGJwXG4gIFxucmVxID0gJ21ha2VfYmxvZ19wb3N0X2NvbGxlY3Rpb24nXG5CdW1ibHJDaGFubmVsLnJlcGx5IHJlcSwgKGJhc2VfaG9zdG5hbWUpIC0+XG4gIG1ha2VfYmxvZ19wb3N0X2NvbGxlY3Rpb24gYmFzZV9ob3N0bmFtZVxuICBcblxuY2xhc3MgTG9jYWxCbG9nQ29sbGVjdGlvbiBleHRlbmRzIEJhc2VMb2NhbFN0b3JhZ2VDb2xsZWN0aW9uXG4gIG1vZGVsOiBNb2RlbHMuQmxvZ0luZm9cbiAgICMgRklYTUU6IFRoaXMgaXMgdWdseSFcbiAgYWRkX2Jsb2c6IChuYW1lKSAtPlxuICAgIHNpdGVuYW1lID0gXCIje25hbWV9LnR1bWJsci5jb21cIlxuICAgIG1vZGVsID0gbmV3IE1vZGVscy5CbG9nSW5mb1xuICAgIG1vZGVsLnNldCAnaWQnLCBzaXRlbmFtZVxuICAgIG1vZGVsLnNldCAnbmFtZScsIG5hbWVcbiAgICBtb2RlbC5hcGlfa2V5ID0gQGFwaV9rZXlcbiAgICBAYWRkIG1vZGVsXG4gICAgQHNhdmUoKVxuICAgIG1vZGVsLmZldGNoKClcbiAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgXG5sb2NhbF9ibG9ncyA9IG5ldyBMb2NhbEJsb2dDb2xsZWN0aW9uXG5zZXR0aW5ncyA9IEJ1bWJsckNoYW5uZWwucmVxdWVzdCAnZ2V0X2FwcF9zZXR0aW5ncydcbmFwaV9rZXkgPSBzZXR0aW5ncy5nZXQgJ2NvbnN1bWVyX2tleSdcbmxvY2FsX2Jsb2dzLmFwaV9rZXkgPSBhcGlfa2V5XG5CdW1ibHJDaGFubmVsLnJlcGx5ICdnZXRfbG9jYWxfYmxvZ3MnLCAtPlxuICBsb2NhbF9ibG9nc1xuICAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIFBob3RvUG9zdENvbGxlY3Rpb246IFBob3RvUG9zdENvbGxlY3Rpb25cbiJdfQ==
