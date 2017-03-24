Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'
ms = require 'ms'

{ MainController } = require 'tbirds/controllers'
{ ToolbarAppletLayout } = require 'tbirds/views/layout'
navigate_to_url = require 'tbirds/util/navigate-to-url'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'
HubChannel = Backbone.Radio.channel 'hubby'

class ToolbarView extends Backbone.Marionette.View
  template: tc.renderable () ->
    tc.div '.btn-group.btn-group-justified', ->
      tc.div '#show-calendar-button.btn.btn-default', ->
        tc.i '.fa.fa-calendar', ' Calendar'
      tc.div '#list-meetings-button.btn.btn-default', ->
        tc.i '.fa.fa-list', ' List Meetings'
    tc.div '.input-group', ->
      tc.input '.form-control', type:'text', placeholder:'search',
      name:'search'
      tc.span '.input-group-btn', ->
        tc.button '#search-button.btn.btn-default', ->
          tc.i '.fa.fa-search', 'Search'
        
  ui:
    search_bth: '#search-button'
    show_cal_btn: '#show-calendar-button'
    list_btn: '#list-meetings-button'
    search_entry: '.form-control'
    
  events:
    'click @ui.show_cal_btn': 'show_calendar'
    'click @ui.list_btn': 'list_meetings'
    'click @ui.search_bth': 'search_hubby'

  show_calendar: ->
    hash = '#hubby'
    if window.location.hash == hash
      controller = HubChannel.request 'main-controller'
      controller.mainview()
    else
      if __DEV__
        console.log "current url", window.location
      navigate_to_url '#hubby'

  list_meetings: ->
    navigate_to_url '#hubby/listmeetings'

  search_hubby: ->
    controller = HubChannel.request 'main-controller'
    options =
      searchParams:
        title: @ui.search_entry.val()
    console.log "search for", options
    controller.view_items options
    
class Controller extends MainController
  layoutClass: ToolbarAppletLayout
  setup_layout_if_needed: ->
    super()
    @layout.showChildView 'toolbar', new ToolbarView

  show_calendar: (layout, region) ->
    #console.log "show_calendar", layout, region
    require.ensure [], () =>
      MeetingCalendarView  = require './calendarview'
      options = {}
      if region == 'minicalendar'
        options.minicalendar = true
        options.layout = layout
      view = new MeetingCalendarView options
      layout.showChildView region, view
    # name the chunk
    , 'hubby-show-calendar'
    
  mainview: ->
    @setup_layout_if_needed()
    #console.log "mainview"
    @show_calendar @layout, 'content'
    

  list_meetings: ->
    @setup_layout_if_needed()
    require.ensure [], () =>
      { MainMeetingModel } = require './collections'
      meetings = HubChannel.request 'meetinglist'
      ListMeetingsView = require './listmeetingsview'
      response = meetings.fetch()
      response.done =>
        view = new ListMeetingsView
          collection: meetings
        @layout.showChildView 'content', view
      response.fail =>
        MessageChannel.request 'danger', 'Failed to load meeting list'
    # name the chunk
    , 'hubby-list-meetings-view'

    

  show_meeting: (layout, region, meeting_id) ->
    require.ensure [], () =>
      { MainMeetingModel } = require './collections'
      ShowMeetingView  = require './meetingview'
      meeting = new MainMeetingModel
        id: meeting_id
      response = meeting.fetch()
      response.done =>
        view = new ShowMeetingView
          model: meeting
        layout.showChildView region, view
      response.fail =>
        MessageChannel.request 'danger', 'Failed to load meeting'
    # name the chunk
    , 'hubby-meetingview'
    
  view_meeting: (meeting_id) ->
    @setup_layout_if_needed()
    @show_meeting @layout, 'content', meeting_id
    
  view_items: (options) ->
    @setup_layout_if_needed()
    @list_items @layout, 'content', options

  list_items: (layout, region, options) ->
    require.ensure [], () =>
      { ItemCollection } = require './collections'
      ListItemsView  = require './search-items-view'
      items = new ItemCollection []
      items.searchParams = options.searchParams
      console.log 'ItemCollection', items
      response = items.fetch()
      response.done =>
        view = new ListItemsView
          collection: items
        layout.showChildView region, view
    # name the chunk
    , 'hubby-search-items-view'
    
module.exports = Controller

