Marionette = require 'backbone.marionette'

TkApplet = require 'tbirds/tkapplet'
Controller = require './controller'
require './collections'

MainChannel = Backbone.Radio.channel 'global'
HubChannel = Backbone.Radio.channel 'hubby'

class Router extends Marionette.AppRouter
  appRoutes:
    'hubby': 'mainview'
    'hubby/listmeetings': 'list_meetings'
    'hubby/viewmeeting/:id': 'view_meeting'
    'hubby/search': 'view_items'
    
class Applet extends TkApplet
  Controller: Controller
  Router: Router

  onBeforeStart: (args) ->
    super args
    controller = @router.controller
    HubChannel.reply 'main-controller', ->
      controller
    HubChannel.reply 'view-calendar', (layout, region) ->
      controller.show_calendar layout, region
    HubChannel.reply 'view-meeting', (layout, region, id) ->
      controller.show_meeting layout, region, id
    HubChannel.reply 'view-items', (layout, region, options) ->
      controller.list_items layout, region, options
    
MainChannel.reply 'applet:hubby:route', () ->
  console.warn "Don't use applet:hubby:route"
  controller = new Controller MainChannel
  HubChannel.reply 'main-controller', ->
    controller
  HubChannel.reply 'view-calendar', (layout, region) ->
    controller.show_calendar layout, region
  HubChannel.reply 'view-meeting', (layout, region, id) ->
    controller.show_meeting layout, region, id
  HubChannel.reply 'view-items', (layout, region, options) ->
    controller.list_items layout, region, options
  router = new Router
    controller: controller

    
module.exports = Applet
