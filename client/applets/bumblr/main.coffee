Marionette = require 'backbone.marionette'

TkApplet = require 'agate/src/tkapplet'
Controller = require './controller'

MainChannel = Backbone.Radio.channel 'global'
BumblrChannel = Backbone.Radio.channel 'bumblr'



class Router extends Marionette.AppRouter
  appRoutes:
    'bumblr': 'start'
    'bumblr/settings': 'settings_page'
    'bumblr/dashboard': 'show_dashboard'
    'bumblr/listblogs': 'list_blogs'
    'bumblr/viewblog/:id': 'view_blog'
    'bumblr/addblog' : 'add_new_blog'


class Applet extends TkApplet
  Controller: Controller
  Router: Router

  onBeforeStart: ->
    blog_collection = BumblrChannel.request 'get_local_blogs'
    # FIXME use better lscollection
    blog_collection.fetch()
    super arguments
  
MainChannel.reply 'applet:bumblr:route', () ->
  console.warn "Don't use applet:bumblr:route"
  controller = new Controller MainChannel
  blog_collection = BumblrChannel.request 'get_local_blogs'
  # FIXME use better lscollection
  blog_collection.fetch()
  router = new Router
    controller: controller
    
module.exports = Applet
