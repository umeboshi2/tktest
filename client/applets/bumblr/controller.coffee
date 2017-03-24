$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'

scroll_top_fast = require 'tbirds/util/scroll-top-fast'
navigate_to_url = require 'tbirds/util/navigate-to-url'

{ MainController } = require 'tbirds/controllers'
{ ToolbarAppletLayout } = require 'tbirds/views/layout'

Models = require './models'
Collections = require './collections'

MiscViews = require './views/misc'

BumblrChannel = Backbone.Radio.channel 'bumblr'


toolbar_data = new Backbone.Model
  entries: [
    {
      name: 'List Blogs'
      url: '#bumblr/listblogs'
      icon: 'list'
    }
    {
      name: 'Settings'
      url: '#bumblr/settings'
      icon: 'gear'
    }
    ]

toolbar_template = tc.renderable (model) ->
  tc.div '.btn-group.btn-group-justified', ->
    for entry in model.entries
      tc.div '.toolbar-button.btn.btn-default',
      'button-url': entry.url, ->
        tc.span ".fa.fa-#{entry.icon}", ' ' + entry.name

class ToolbarView extends Backbone.Marionette.View
  template: toolbar_template
  ui:
    toolbarButton: '.toolbar-button'
  events:
    'click @ui.toolbarButton': 'toolbarButtonPressed'
  toolbarButtonPressed: (event) ->
    console.log "toolbarButtonPressed", event
    url = event.currentTarget.getAttribute 'button-url'
    navigate_to_url url
    
class Controller extends MainController
  layoutClass: ToolbarAppletLayout
  setup_layout_if_needed: ->
    super()
    view = new ToolbarView
      model: toolbar_data
    @layout.showChildView 'toolbar', view
    
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
    view = new MiscViews.MainBumblrView
    @layout.showChildView 'content', view
    scroll_top_fast()
    
  show_dashboard: () ->
    view = new MiscViews.BumblrDashboardView
    @layout.showChildView 'content', view
    scroll_top_fast()
      
  list_blogs: () ->
    @setup_layout_if_needed()
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
    require.ensure [], () =>
      host = blog_id + '.tumblr.com'
      collection = BumblrChannel.request 'make_blog_post_collection', host
      BlogPostListView = require './views/postlist'
      response = collection.fetch()
      response.done =>
        view = new BlogPostListView
          collection: collection
        @layout.showChildView 'content', view
        scroll_top_fast()
    # name the chunk
    , 'bumblr-view-blog-view'
    
  add_new_blog: () ->
    @setup_layout_if_needed()
    require.ensure [], () =>
      NewBlogFormView = require './views/newblog'
      view = new NewBlogFormView
      @layout.showChildView 'content', view
      scroll_top_fast()
    # name the chunk
    , 'bumblr-view-add-blog'
    
          
  settings_page: () ->
    @setup_layout_if_needed()
    require.ensure [], () =>
      ConsumerKeyFormView = require './views/settingsform'
      settings = BumblrChannel.request 'get_app_settings'
      view = new ConsumerKeyFormView model:settings
      @layout.showChildView 'content', view
      scroll_top_fast()
    # name the chunk
    , 'bumblr-view-settings'
    
module.exports = Controller

