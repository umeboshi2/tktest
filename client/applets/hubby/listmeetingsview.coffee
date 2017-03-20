Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'

HubChannel = Backbone.Radio.channel 'hubby'

#################################
# templates
#################################


class SimpleMeetingView extends Backbone.Marionette.View
  template: tc.renderable (model) ->
    name = "meeting"
    item_btn = ".btn.btn-default.btn-xs"
    tc.li ".list-group-item.#{name}-item", ->
      tc.span ->
        tc.a href:"#hubby/viewmeeting/#{model.id}", model.title
      #tc.div '.btn-group.pull-right', ->
      #  tc.button ".edit-item.#{item_btn}.btn-info.fa.fa-edit", 'edit'
      #  tc.button ".delete-item.#{item_btn}.btn-danger.fa.fa-close", 'delete'

class ListMeetingsView extends Backbone.Marionette.CompositeView
  childView: SimpleMeetingView
  template: tc.renderable () ->
    tc.div '.listview-header', ->
      tc.text "Council Meetings"
    tc.hr()
    tc.ul "#meetings-container.list-group"


module.exports = ListMeetingsView
  
