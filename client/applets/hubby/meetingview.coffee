$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

tc = require 'teacup'

require 'jquery-ui/ui/widgets/draggable'

HubChannel = Backbone.Radio.channel 'hubby'

#################################
# templates
#################################
{ capitalize } = require 'tbirds/apputil'

compare_property_function = (property) ->
  (a,b) ->
    if a[property] < b[property]
      return -1
    if a[property] > b[property]
      return 1
    return 0

compare_meeting_item = compare_property_function 'item_order'

make_meeting_items = (meeting) ->
  meeting_items = []
  items = meeting.items
  for item in meeting.items
    mitem = item.lgr_meeting_item
    meeting_items.push item.lgr_meeting_item
  meeting_items.sort compare_meeting_item
  meeting_items

make_item_object = (meeting) ->
  Items = {}
  for item in meeting.items
    Items[item.id] = item
  Items

make_agenda_link = (meeting, dtype='A') ->
  qry = "M=#{dtype}&ID=#{meeting.id}&GUID=#{meeting.guid}"
  return "http://hattiesburg.legistar.com/View.ashx?#{qry}"

make_meeting_header = tc.renderable (meeting) ->
  tc.div '.media.hubby-meeting-header', ->
    tc.div '.media-left.media-middle', ->
      tc.div '.media-object.hubby-meeting-header-agenda', ->
        tc.i '.fa.fa-newspaper-o'
        tc.a href:make_agenda_link(meeting), "Agenda: #{meeting.agenda_status}"
    tc.div '.media-body.hubby-meeting-header-text-foo', ->
      tc.h3 '.text-center', "#{meeting.title}"
    tc.div '.media-right.media-middle', ->
      tc.div '.media-object.hubby-meeting-header-minutes', ->
        tc.i '.fa.fa-commenting-o'
        tc.a href:make_agenda_link(meeting, 'M'), "Minutes: #{meeting.minutes_status}"

make_attachments_section = tc.renderable (item) ->
  if item.attachments != undefined and item.attachments.length
    marker = "One Attachment"
    if item.attachments.length > 1
      marker = "#{item.attachments.length} Attachments"
    tc.span '.btn.btn-sm.hubby-meeting-item-attachment-marker', marker
    tc.div '.hubby-meeting-item-attachments', ->
      tc.div '.hubby-meeting-item-attachments-header', 'Attachments'
      for att in item.attachments
        tc.div ->
          url = "http://hattiesburg.legistar.com/#{att.link}"
          tc.a href:url, att.name
  
make_actions_section = tc.renderable (item) ->
  if item.actions? and item.actions.length
    marker = 'Action'
    if item.actions.length > 1
      marker = 'Actions'
    tc.span '.btn.btn-sm.hubby-meeting-item-action-marker', marker
    tc.div '.hubby-meeting-item-actions', ->
      for action in item.actions
        nl = /\r?\n/
        lines = action.action_text.split nl
        tc.div '.hubby-action-text', width:80, ->
          #tc.br()
          #tc.br()
          # FIXME, this is used for spacing
          tc.hr()
          for line in lines
            tc.p line
  
make_meeting_item_list = tc.renderable (meeting) ->
  tc.div '.hubby-meeting-item-list', ->
    agenda_section = 'start'
    for mitem in meeting.meeting_items
      item = meeting.Items[mitem.item_id]
      if mitem.type != agenda_section and mitem.type
        agenda_section = mitem.type
        section_header = capitalize agenda_section + ' Agenda'
        tc.h3 '.hubby-meeting-agenda-header', section_header
      tc.div '.hubby-meeting-item', ->
        tc.div '.hubby-meeting-item-info', ->
          agenda_num = mitem.agenda_num
          if not agenda_num
            agenda_num = "(--)"
          tc.div '.hubby-meeting-item-agenda-num', agenda_num
          tc.div '.hubby-meeting-item-fileid', item.file_id
          tc.div '.hubby-meeting-item-status', item.status
        tc.div '.hubby-meeting-item-content', ->
          tc.p '.hubby-meeting-item-text', item.title
          tc.div ->
            make_attachments_section item
            make_actions_section item

          
show_meeting_template = tc.renderable (meeting) ->
  meeting.meeting_items = make_meeting_items meeting
  meeting.Items = make_item_object meeting
  window.meeting = meeting
  #tc.div '.hubby-meeting-header', ->
  make_meeting_header meeting
  make_meeting_item_list meeting
  
##################################################################
#################################

class ShowMeetingView extends Backbone.Marionette.View
  template: show_meeting_template
  
  onDomRefresh: () ->
    attachments = $ '.hubby-meeting-item-attachments'
    attachments.hide()
    actions = $ '.hubby-meeting-item-actions'
    actions.hide()
    attachments.draggable()
    $('.hubby-meeting-item-info').click ->
      $(this).next().toggle()
    $('.hubby-meeting-item-attachment-marker').click ->
      $(this).next().toggle()
    $('.hubby-meeting-item-action-marker').click ->
      $(this).next().toggle()
   
module.exports = ShowMeetingView
  
