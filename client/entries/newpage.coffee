Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'
require 'bootstrap'

TopApp = require './top-app'
MessagesApp = require './messages'
NavbarApp = require './navbar'
MainAppConfig = require './newpage-config'
require './router'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

# main channel requests
# 
# - applet:#{name}:route
# this creates an AppRouter and a Controller, setting
# routes to access the applet.  The reply function
# is in the "main" module
#
# - mainpage:init (appmodel)
# This request builds the main layout.
#
# 
# 
#

class TkAppState extends Backbone.Model
  defaults:
    AppRegion: new Marionette.Region el:'body'
    startHistory: true
    NavBarClass: false
    appConfig: {}
    
app = new TopApp
  StateModel: TkAppState
  appConfig: MainAppConfig
  
if __DEV__
  # DEBUG attach app to window
  window.App = app

MainChannel.reply 'main:app:appmodel', ->
  new Backbone.Model MainAppConfig

MainChannel.reply 'main:app:object', ->
  app

MainChannel.reply 'main:app:config', ->
  app.options.appConfig
  
# register the main router
MainChannel.request 'app:main:route'

# start the app
app.start()

module.exports = app


