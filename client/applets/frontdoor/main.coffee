Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'

Controller = require './controller'

TkApplet = require 'tbirds/tkapplet'

MainChannel = Backbone.Radio.channel 'global'

class Router extends Marionette.AppRouter
  appRoutes:
    '': 'frontdoor'
    'frontdoor': 'frontdoor'
    'frontdoor/view': 'frontdoor'
    'frontdoor/view/:name': 'view_page'
    'frontdoor/login': 'show_login'
    #FIXME
    'pages/:name': 'view_page'
    
class Applet extends TkApplet
  Controller: Controller
  Router: Router

  onStop: ->
    console.log "(Child) Stopping frontdoor", @.isRunning()
    super()

MainChannel.reply 'applet:frontdoor:route', () ->
  console.warn "Don't use applet:frontdoor:route"
  controller = new Controller MainChannel
  router = new Router
    controller: controller
    
      
module.exports = Applet
