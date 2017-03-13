Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'

{ navigate_to_url } = require 'agate/src/apputil'

BumblrChannel = Backbone.Radio.channel 'bumblr'

########################################
sidebar_template = tc.renderable (model) ->
  tc.div '.sidebar-menu.btn-group-vertical', ->
    for entry in model.entries
      tc.button '.sidebar-entry-button.btn.btn-default',
      'button-url':entry.url, ->
        tc.text entry.name          

class BaseSideBarView extends Backbone.Marionette.View
  template: sidebar_template
  events:
    'click .sidebar-entry-button': 'sidebar_button_pressed'

  sidebar_button_pressed: (event) ->
    #console.log "Sidebar_button_pressed"
    url = event.currentTarget.getAttribute 'button-url'
    navigate_to_url url
      

module.exports = BaseSideBarView
