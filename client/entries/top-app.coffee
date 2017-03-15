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
      c = MainChannel.request 'main-controller'
      c.loadFrontDoor()
      
module.exports = TopApp


