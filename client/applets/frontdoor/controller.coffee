Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

{ MainController } = require 'agate/src/controllers'
{ login_form } = require 'agate/src/templates/forms'
{ SlideDownRegion } = require 'agate/src/regions'

require '../../static-documents'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'
DocChannel = Backbone.Radio.channel 'static-documents'

tc = require 'teacup'

frontdoor_template = tc.renderable () ->
  tc.div '#main-content.col-sm-10.col-sm-offset-1'
  
class FrontdoorLayout extends Backbone.Marionette.View
  template: frontdoor_template
  regions: ->
    content: new SlideDownRegion
      el: '#main-content'
      speed: 'slow'
  

class Controller extends MainController
  layoutClass: FrontdoorLayout
  
  _view_resource: (doc) ->
    @setup_layout_if_needed()
    { FrontDoorMainView } = require './views'
    view = new FrontDoorMainView
      model: doc
    @layout.showChildView 'content', view

  _view_login: ->
    LoginView = require './loginview'
    view = new LoginView
    @layout.showChildView 'content', view

  view_page: (name) ->
    doc = DocChannel.request 'get-document', name
    console.log "DOC", doc
    response = doc.fetch()
    response.done =>
      if not doc.get 'content'
        doc.set 'content', '# Need a front page.'
      @_view_resource doc
    response.fail =>
      MessageChannel.request 'danger', 'Failed to get document'
      

  frontdoor_needuser: ->
    user = MainChannel.request 'current-user'
    if user.has 'name'
      @frontdoor_hasuser user
    else
      @show_login()
      
  show_login: ->
    @setup_layout_if_needed()
    @_view_login()
    
  frontdoor_hasuser: (user) ->
    @default_view()

  default_view: ->
    @setup_layout_if_needed()
    #@show_login()
    @view_page 'README'
      
  frontdoor: ->
    appmodel = MainChannel.request 'main:app:appmodel'
    if appmodel.get 'needUser'
      console.log 'needUser is true'
      @frontdoor_needuser()
    else
      @default_view()

module.exports = Controller

