Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'
marked = require 'marked'

MainChannel = Backbone.Radio.channel 'global'

DefaultStaticDocumentTemplate = tc.renderable (doc) ->
  tc.article '.document-view.content', ->
    tc.div '.body', ->
      tc.raw marked doc.content


class FrontDoorMainView extends Backbone.Marionette.View
  template: DefaultStaticDocumentTemplate

module.exports =
  FrontDoorMainView: FrontDoorMainView

