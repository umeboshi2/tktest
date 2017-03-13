$ = require 'jquery'
_ = require 'underscore'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

{ BaseLocalStorageCollection } = require 'agate/src/lscollection'
{ BaseCollection } = require 'agate/src/collections'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'
DocChannel = Backbone.Radio.channel 'static-documents'

class StaticDocument extends Backbone.Model
  url: ->
    basedir = "/assets/documents"
    if @id == 'README'
      basedir = ''
    "#{basedir}/#{@id}.md"
    
  fetch: (options) ->
    options = _.extend options || {},
      dataType: 'text'
    super options

  parse: (response) ->
    return content: response
    
class StaticDocumentCollection extends BaseCollection
  model: StaticDocument
  

  
DocChannel.reply 'get-document', (name) ->
  model = new StaticDocument
    id: name


  
module.exports =
  StaticDocument: StaticDocument
  

