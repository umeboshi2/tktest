Backbone = require 'backbone'
tc = require 'teacup'

BootstrapFormView = require 'agate/src/bootstrap_formview'
{ navigate_to_url } = require 'agate/src/apputil'
{ form_group_input_div } = require 'agate/src/templates/forms'

BumblrChannel = Backbone.Radio.channel 'bumblr'

########################################
consumer_key_form = tc.renderable (settings) ->
  form_group_input_div
    input_id: 'input_key'
    label: 'Consumer Key'
    input_attributes:
      name: 'consumer_key'
      placeholder: ''
      value: settings.consumer_key
  form_group_input_div
    input_id: 'input_secret'
    label: 'Consumer Secret'
    input_attributes:
      name: 'consumer_secret'
      placeholder: ''
      value: settings.consumer_secret
  form_group_input_div
    input_id: 'input_token'
    label: 'Token'
    input_attributes:
      name: 'token'
      placeholder: ''
      value: settings.token
  form_group_input_div
    input_id: 'input_tsecret'
    label: 'Token Secret'
    input_attributes:
      name: 'token_secret'
      placeholder: ''
      value: settings.token_secret
  tc.input '.btn.btn-default.btn-xs', type:'submit', value:'Submit'

########################################
class ConsumerKeyFormView extends BootstrapFormView
  template: consumer_key_form
  ui:
    consumer_key: '[name="consumer_key"]'
    consumer_secret: '[name="consumer_secret"]'
    token: '[name="token"]'
    token_secret: '[name="token_secret"]'

  updateModel: ->
    @model.set
      consumer_key: @ui.consumer_key.val()
      consumer_secret: @ui.consumer_secret.val()
      token: @ui.token.val()
      token_secret: @ui.token_secret.val()

  createModel: ->
    BumblrChannel.request 'get_app_settings'

  onSuccess: (model) ->
    #console.log 'onSuccess called'
    navigate_to_url '#bumblr'

module.exports = ConsumerKeyFormView


