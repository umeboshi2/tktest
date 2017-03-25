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

MainAppConfig = require './another-config'

MainChannel = Backbone.Radio.channel 'global'

app = new TopApp
  appConfig: MainAppConfig
  
if __DEV__
  # DEBUG attach app to window
  window.App = app

MainChannel.reply 'main:app:appmodel', ->
  console.warn "main:app:appmodel needs to go.  Use main:app:config"
  new Backbone.Model MainAppConfig

# register the main router
MainChannel.request 'main:app:route'

# start the app
app.start()

module.exports = app


