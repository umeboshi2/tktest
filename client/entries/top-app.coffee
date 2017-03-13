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
    #console.log "TopApp region set to", @getRegion()
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
    #layout.on 'render', =>
    #  console.log "render called on main layout"
    #  console.log "I used to do stuff here, but now I'm using childApps"
    @showView layout    

  onStart: ->
    #console.log "(onStart) here is where we would be creating the approuters"
    # build main page layout
    @initPage()
    if @getState 'startHistory'
      # FIXME we need something better
      # 
      #console.log "startHistory onStart"
      location = window.location
      hash = if not location.hash then '#' else location.hash
      url = "#{location.hash}"
      #console.log "window.location", location
      #console.log "url", url
      c = MainChannel.request 'main-controller'
      applet = hash.split('/')[0]
      while applet.startsWith '#'
        applet = applet.slice 1
      #console.log "applet", applet, hash
      c.routeApplet applet
      Backbone.history.start(url) unless Backbone.history.started
      #r = new Backbone.Router
      #r.navigate url, trigger: true
      
module.exports = TopApp


