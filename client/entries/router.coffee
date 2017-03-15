Marionette = require 'backbone.marionette'

BootStrapAppRouter = require 'agate/src/bootstrap_router'

MainChannel = Backbone.Radio.channel 'global'

class RequireController extends Marionette.Object
  _route_applet: (applet) ->
    MainChannel.request "applet:#{applet}:route"

  loadFrontDoor: ->
    applet = 'frontdoor'
    handler = System.import "../applets/#{applet}/main"
    console.log "system.import", applet
    handler.then =>
      MainChannel.request "applet:#{applet}:route"
      Backbone.history.start() unless Backbone.history.started
      console.log "History Started"
    
  _handle_route: (applet, suffix) ->
    console.log "_handle_route", applet, suffix
    config = MainChannel.request 'main:app:config'
    if not applet
      applet = 'frontdoor'
    if applet in Object.keys config.appletRoutes
      applet = config.appletRoutes[applet]
      console.log "Using defined appletRoute", applet
    handler = System.import "../applets/#{applet}/main"
    console.log "system.import", applet
    handler.then =>
      MainChannel.request "applet:#{applet}:route"
      Backbone.history.loadUrl()
      
  routeApplet: (applet, href) ->
    @_handle_route applet, href

  frontdoor: ->
    @_handle_route 'frontdoor'
  
class Router extends Marionette.AppRouter
  appRoutes:
    #'': 'frontdoor'
    ':applet/*': 'routeApplet'

  onRoute: (name, path, args) ->
    console.log "MainRouter.onRoute", name, path, args
    
MainChannel.reply 'app:main:route', () ->
  controller = new RequireController
  router = new Router
    controller: controller
  MainChannel.reply 'main-controller', ->
    controller
  MainChannel.reply 'main-router', ->
    router
    
