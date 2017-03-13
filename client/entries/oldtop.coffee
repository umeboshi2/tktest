Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

MessagesApp = require './messages'
NavbarApp = require './navbar'
  
MainChannel = Backbone.Radio.channel 'global'
class TopApp extends Toolkit.App
  onBeforeStart: ->
    appConfig = @options.appConfig
    # FIXME - test for region class
    @setRegion new Marionette.Region el: appConfig.appRegion
    if appConfig.useMessages
      messagesApp = @addChildApp 'messages',
        AppClass: MessagesApp
        startWithParent: true
        ,
        parentApp: @
    if appConfig.useNavbar
      navbarApp = @addChildApp 'navbar',
        AppClass: NavbarApp
        startWithParent: true
        ,
        parentApp: @
        
  initPage: ->
    appConfig = @options.appConfig
    AppLayout = appConfig.layout
    layoutOpts = appConfig.layoutOptions
    layout = new AppLayout appConfig.layoutOptions
    @showView layout    

  onStart: ->
    require '../applets/frontdoor/main'
    require '../applets/bumblr/main'
    require '../applets/hubby/main'
    # build main page layout
    @initPage()
    if @getState 'startHistory'
      # register routes
      ['frontdoor', 'bumblr', 'hubby'].forEach (applet) ->
        MainChannel.request "applet:#{applet}:route"
      Backbone.history.start() unless Backbone.history.started
      
module.exports = TopApp


