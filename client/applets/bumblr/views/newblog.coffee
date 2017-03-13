Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'

BootstrapFormView = require 'agate/src/bootstrap_formview'
{ form_group_input_div } = require 'agate/src/templates/forms'
{ navigate_to_url } = require 'agate/src/apputil'

BumblrChannel = Backbone.Radio.channel 'bumblr'

########################################
new_blog_form_view = tc.renderable (model) ->
  form_group_input_div
    input_id: 'input_blogname'
    label: 'Blog Name'
    input_attributes:
      name: 'blog_name'
      placeholder: ''
      value: 'dutch-and-flemish-painters'
  tc.input '.btn.btn-default.btn-xs', type:'submit', value:'Add Blog'

########################################

class NewBlogFormView extends BootstrapFormView
  template: new_blog_form_view
  ui:
    blog_name: '[name="blog_name"]'

  updateModel: ->
    #console.log 'updateModel'
    @collection = BumblrChannel.request 'get_local_blogs'
    @model = @collection.add_blog @ui.blog_name.val()

  onSuccess: ->
    #console.log 'onSuccess called'
    navigate_to_url '#bumblr/listblogs'

  createModel: ->
    return new Backbone.Model url:'/'



module.exports = NewBlogFormView


