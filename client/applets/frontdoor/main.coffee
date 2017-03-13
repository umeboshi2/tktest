Marionette = require 'backbone.marionette'

Controller = require './controller'


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
    
MainChannel.reply 'applet:frontdoor:route', () ->
  controller = new Controller MainChannel
  router = new Router
    controller: controller

