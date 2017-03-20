Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
PageableCollection = require 'backbone.paginator'

{ BaseLocalStorageCollection } = require 'tbirds/lscollection'

Models = require './models'


MainChannel = Backbone.Radio.channel 'global'
BumblrChannel = Backbone.Radio.channel 'bumblr'

baseURL = '//api.tumblr.com/v2'
  
class PhotoPostCollection extends Backbone.Collection
  url: () ->
    "#{baseURL}/#{@id}/posts/photo?callback=?"
    
class BlogPosts extends PageableCollection
  mode: 'server'
  full: true
  baseURL: baseURL
  url: () ->
    "#{@baseURL}/blog/#{@base_hostname}/posts/photo?api_key=#{@api_key}"

  fetch: (options) ->
    options || options = {}
    data = (options.data || {})
    current_page = @state.currentPage
    offset = current_page * @state.pageSize
    options.offset = offset
    options.dataType = 'jsonp'
    super options
    
  parse: (response) ->
    total_posts = response.response.total_posts
    @state.totalRecords = total_posts
    super response.response.posts
   state:
    firstPage: 0
    pageSize: 15
    
  queryParams:
    pageSize: 'limit'
    offset: () ->
      @state.currentPage * @state.pageSize
      
make_blog_post_collection = (base_hostname) ->
  settings = BumblrChannel.request 'get_app_settings'
  api_key = settings.get 'consumer_key'
  bp = new BlogPosts
  bp.api_key = api_key
  bp.base_hostname = base_hostname
  return bp
  
req = 'make_blog_post_collection'
BumblrChannel.reply req, (base_hostname) ->
  make_blog_post_collection base_hostname
  

class LocalBlogCollection extends BaseLocalStorageCollection
  model: Models.BlogInfo
   # FIXME: This is ugly!
  add_blog: (name) ->
    sitename = "#{name}.tumblr.com"
    model = new Models.BlogInfo
    model.set 'id', sitename
    model.set 'name', name
    model.api_key = @api_key
    @add model
    @save()
    model.fetch()
    return model
        
local_blogs = new LocalBlogCollection
settings = BumblrChannel.request 'get_app_settings'
api_key = settings.get 'consumer_key'
local_blogs.api_key = api_key
BumblrChannel.reply 'get_local_blogs', ->
  local_blogs
   
module.exports =
  PhotoPostCollection: PhotoPostCollection
