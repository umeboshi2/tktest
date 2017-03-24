Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

tc = require 'teacup'

BootstrapFormView = require 'tbirds/views/bsformview'
{ make_field_input
  make_field_textarea } = require 'tbirds/templates/forms'

HubChannel = Backbone.Radio.channel 'hubby'

#################################
# templates
#################################

make_item_div = tc.renderable (item) ->
  tc.div '.hubby-meeting-item-info', ->
    tc.div '.hubby-meeting-item-agenda-num', "!agenda_num"
    tc.div '.hubby-meeting-item-fileid', item.file_id
    tc.div '.hubby-meeting-item-status', item.status
  tc.div '.hubby-meeting-item-content', ->
    tc.p '.hubby-meeting-item-text', item.title

class SimpleItemView extends Backbone.Marionette.View
  template: make_item_div
  
class ListItemsViewComposite extends Backbone.Marionette.CompositeView
  childView: SimpleItemView
  template: tc.renderable () ->
    tc.div '.listview-header', ->
      tc.text "Items"
    tc.hr()
    tc.ul "#items-container.list-group"

class ListItemsView extends Backbone.Marionette.CollectionView
  childView: SimpleItemView
  template: tc.renderable () ->
    console.log "ListItemsView options", @options
    tc.div '.listview-header', ->
      tc.text "Items"
    tc.hr()
    tc.ul "#items-container.list-group"
  

module.exports = ListItemsView
  
