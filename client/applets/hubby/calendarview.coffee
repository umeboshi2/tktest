Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

FullCalendar = require 'fullcalendar'

{ apiroot } = require './collections'

require 'fullcalendar/dist/fullcalendar.css'

HubChannel = Backbone.Radio.channel 'hubby'

#################################
# templates
#################################

tc = require 'teacup'

meeting_calendar = tc.renderable () ->
  tc.div '.listview-header', 'Meetings'
  tc.div '#loading', ->
    tc.h2 ->
      tc.i '.fa.fa-spinner.fa-spin'
      tc.text 'Loading Meetings'
  tc.div '#maincalendar'
#################################

render_calendar_event = (calEvent, element) ->
  calEvent.url = "#hubby/viewmeeting/#{calEvent.id}"
  element.css
    cursor: 'pointer'
    'font-size': '0.9em'
    'font-family': 'Rambla'
    
calendar_view_render = (view, element) ->
  HubChannel.request 'maincalendar:set-date'
  
loading_calendar_events = (isLoading, view) ->
  console.log "calendar view", view
  console.log "calendar loading events", isLoading
  loading = $ '#loading'
  header = $ '.fc-toolbar'
  if isLoading
    loading.show()
    header.hide()
  else
    loading.hide()
    header.show()
  
class MeetingCalendarView extends Backbone.Marionette.View
  template: meeting_calendar
  ui:
    calendar: '#maincalendar'
    loading: '#loading'
    
  options:
    minicalendar: false
    layout: false

  onBeforeDestroy: ->
    cal = @ui.calendar.fullCalendar 'destroy'
    
  onDomRefresh: () ->
    console.log "onDomRefresh calendarview"
    @ui.loading.hide()
    calEventClick = (event) =>
      if not @options.minicalendar
        url = event.url
        Backbone.history.navigate url, trigger: true
      else
        meeting_id = event.id
        HubChannel.request 'view-meeting', @options.layout, 'meeting', meeting_id
    date = HubChannel.request 'maincalendar:get-date' or new Date()
    cal = @ui.calendar
    cal.fullCalendar
      defaultDate: date
      header:
        left: 'prevYear, nextYear'
        center: 'title'
        right: 'prev, next'
      theme: false
      defaultView: 'month'
      eventSources:
        [
          url: "#{apiroot}/meetings/hubcal"
        ]
      eventRender: render_calendar_event
      viewRender: calendar_view_render
      #loading: loading_calendar_events
      eventClick: calEventClick
    console.log "Calendar created"
    cal.fullCalendar('loading', loading_calendar_events)
    # if the current calendar date that has been set,
    # go to that date
    if date != undefined
      cal.fullCalendar('gotoDate', date)
    if cal.fullCalendar('isEventsRendered')
      console.log "ISIS isEventsRendered"
      
      
    
module.exports = MeetingCalendarView
  
