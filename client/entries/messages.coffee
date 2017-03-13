Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

class BaseMessage extends Backbone.Model
  defaults:
    level: 'info'
  
class BaseMessageCollection extends Backbone.Collection
  model: BaseMessage

main_message_collection = new BaseMessageCollection
MessageChannel.reply 'messages', ->
  main_message_collection

display_message = (msg, level, icon=false, delay=6000) =>
  message = new BaseMessage
    content: msg
    level: level
    icon: icon
  ## FIXME make delay configurable
  #delay = 6000
  unless level is 'danger'
    destroy = -> main_message_collection.remove message
    setTimeout destroy, delay
  main_message_collection.add message
  
MessageChannel.reply 'display-message', (msg, lvl='info', icon=false) =>
  console.warn 'icon', icon
  display_message msg, lvl, icon

for level in ['success', 'info', 'warning', 'danger', 'brand']
  do (level) ->
    MessageChannel.reply level, (msg, icon=false) =>
      display_message msg, level, icon
      

MessageChannel.reply 'delete-message', (model) =>
  main_message_collection.remove model


message_box = tc.renderable (msg) ->
  lvl = msg.level
  if lvl == 'error'
    lvl = 'danger'
  tc.div ".alert.alert-#{lvl}", ->
    tc.button '.close', type:'button', 'aria-hidden': true, ->
      tc.raw '&times;'
    if msg.icon
      tc.span ".glyphicon.glyphicon-#{msg.icon}"
    tc.text msg.content
    
class MessageView extends Backbone.Marionette.View
  template: message_box
  ui:
    close_button: 'button.close'

  events:
    'click @ui.close_button': 'destroy_message'

  destroy_message: ->
    MessageChannel.request 'delete-message', @model
    
class MessagesView extends Backbone.Marionette.CollectionView
  childView: MessageView
  


class MessagesApp extends Toolkit.App
  onBeforeStart: ->
    @collection = MessageChannel.request 'messages'
    @setRegion @options.parentApp.getView().getRegion 'messages'
    #console.log "Region should be set", @getRegion()
    
  onStart: ->
    @initPage()
    if @getState 'startHistory'
      Backbone.history.start() unless Backbone.history.started

  initPage: ->
    view = new MessagesView
      collection: @collection
    @showView view

module.exports = MessagesApp
  

