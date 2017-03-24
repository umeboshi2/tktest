Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'
require 'bootstrap'

if __DEV__
  console.warn "__DEV__", __DEV__, "DEBUG", DEBUG
  Backbone.Radio.DEBUG = true

require 'tbirds/applet-router'
TopApp = require 'tbirds/top-app'

MainAppConfig = require './index-config'

MainChannel = Backbone.Radio.channel 'global'

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
  console.warn "main:app:appmodel needs to go.  Use main:app:config"
  new Backbone.Model MainAppConfig

MainChannel.reply 'main:app:object', ->
  app

MainChannel.reply 'main:app:config', ->
  app.options.appConfig
  
# register the main router
MainChannel.request 'main:app:route'

# start the app
app.start()

module.exports = app


