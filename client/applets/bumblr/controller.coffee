$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

Util = require 'agate/src/apputil'
{ MainController } = require 'agate/src/controllers'
{ make_sidebar_template } = require 'agate/src/templates/layout'

Models = require './models'
Collections = require './collections'

MiscViews = require './views/misc'
SideBarView = require './views/sidebar'


BumblrChannel = Backbone.Radio.channel 'bumblr'

sidebar_template = make_sidebar_template()
  


side_bar_data = new Backbone.Model
  entries: [
    {
      name: 'List Blogs'
      url: '#bumblr/listblogs'
    }
    {
      name: 'Settings'
      url: '#bumblr/settings'
    }
    ]

class BumblerLayout extends Backbone.Marionette.View
  template: sidebar_template
  regions:
    sidebar: '#sidebar'
    content: '#main-content'
    
  
class Controller extends MainController
  layoutClass: BumblerLayout
  sidebarclass: SideBarView
  sidebar_model: side_bar_data
  _make_sidebar: ->
    sidebar = @_empty_sidebar()
    view = new @sidebarclass
      model: @sidebar_model
    sidebar.show view
    
  
  set_header: (title) ->
    header = $ '#header'
    header.text title
    
  start: ->
    #console.log 'bumblr start called'
    @setup_layout_if_needed()
    @set_header 'Bumblr'
    @list_blogs()

  default_view: ->
    @start()
    
  show_mainview: () ->
    @_make_sidebar()
    view = new MiscViews.MainBumblrView
    @layout.showChildView 'content', view
    Util.scroll_top_fast()
    
  show_dashboard: () ->
    @_make_sidebar()
    view = new MiscViews.BumblrDashboardView
    @layout.showChildView 'content', view
    Util.scroll_top_fast()
      
  list_blogs: () ->
    @setup_layout_if_needed()
    @_make_sidebar()
    require.ensure [], () =>
      blogs = BumblrChannel.request 'get_local_blogs'
      SimpleBlogListView = require './views/bloglist'
      view = new SimpleBlogListView
        collection: blogs
      @layout.showChildView 'content', view
    # name the chunk
    , 'bumblr-view-list-blogs'
    
  view_blog: (blog_id) ->
    #console.log 'view blog called for ' + blog_id
    @setup_layout_if_needed()
    @_make_sidebar()
    require.ensure [], () =>
      host = blog_id + '.tumblr.com'
      collection = BumblrChannel.request 'make_blog_post_collection', host
      BlogPostListView = require './views/postlist'
      response = collection.fetch()
      response.done =>
        view = new BlogPostListView
          collection: collection
        @layout.showChildView 'content', view
        Util.scroll_top_fast()
    # name the chunk
    , 'bumblr-view-blog-view'
    
  add_new_blog: () ->
    @setup_layout_if_needed()
    @_make_sidebar()
    require.ensure [], () =>
      NewBlogFormView = require './views/newblog'
      view = new NewBlogFormView
      @layout.showChildView 'content', view
      Util.scroll_top_fast()
    # name the chunk
    , 'bumblr-view-add-blog'
    
          
  settings_page: () ->
    @setup_layout_if_needed()
    @_make_sidebar()
    require.ensure [], () =>
      ConsumerKeyFormView = require './views/settingsform'
      settings = BumblrChannel.request 'get_app_settings'
      view = new ConsumerKeyFormView model:settings
      @layout.showChildView 'content', view
      Util.scroll_top_fast()
    # name the chunk
    , 'bumblr-view-settings'
    
module.exports = Controller

