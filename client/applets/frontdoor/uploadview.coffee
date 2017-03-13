Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'

fileinput = require 'bootstrap-fileinput'
require 'bootstrap-fileinput/css/fileinput.css'


MainChannel = Backbone.Radio.channel 'global'

DefaultStaticDocumentTemplate = tc.renderable (doc) ->
  
apiroot = '/api/dev/misc'


class UploadMainView extends Backbone.Marionette.View
  template: tc.renderable ->
    tc.article '.document-view.content', ->
      tc.div '.body', ->
        "Hello there"
    tc.div '.file-div', ->
      tc.input '.fileinput', name:'zathras', type:'file'

  ui:
    fileinput: '.fileinput'
    
  onDomRefresh: () ->
    fi = @ui.fileinput.fileinput
      uploadUrl: "#{apiroot}/upload-photos"
    
    

module.exports = UploadMainView
