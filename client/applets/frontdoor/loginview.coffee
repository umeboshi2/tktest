Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'

{ navigate_to_url
  make_field_input_ui } = require 'agate/src/apputil'

{ form_group_input_div } = require 'agate/src/templates/forms'
BootstrapFormView = require 'agate/src/bootstrap_formview'

MainChannel = Backbone.Radio.channel 'global'

ghost_login_form =  tc.renderable (user) ->
  form_group_input_div
    input_id: 'input_username'
    label: 'User Name'
    input_attributes:
      name: 'username'
      placeholder: 'User Name'
  form_group_input_div
    input_id: 'input_password'
    label: 'Password'
    input_attributes:
      name: 'password'
      type: 'password'
      placeholder: 'Type your password here....'
  tc.input '.btn.btn-default', type:'submit', value:'login'
  tc.div '.spinner.fa.fa-spinner.fa-spin'


class LoginView extends BootstrapFormView
  template: ghost_login_form
  fieldList: ['username', 'password']
  ui: ->
    uiobject = make_field_input_ui @fieldList
    return uiobject

  createModel: ->
    new Backbone.Model

  updateModel: ->
    console.log 'updateModel called'
    @model.set 'username', @ui.username.val()
    @model.set 'password', @ui.password.val()

  saveModel: ->
    auth = MainChannel.request 'main:app:ghostauth'
    console.log auth
    username  = @model.get 'username'
    password = @model.get 'password'
    res = auth.access username, password
    res.error =>
      @trigger 'save:form:failure', @model
    res.success =>
      @trigger 'save:form:success', @model
      
  onSuccess: ->
    navigate_to_url '/'
    
     
    
module.exports = LoginView
