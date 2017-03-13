Backbone = require 'backbone'
qs = require 'qs'

HubChannel = Backbone.Radio.channel 'hubby'

apiroot = 'https://infidel-frobozz.rhcloud.com/api/dev/lgr'

class SimpleMeetingModel extends Backbone.Model
  url: () ->
    "#{apiroot}/meetings/#{@id}"

class MainMeetingModel extends Backbone.Model
  url: () ->
    "#{apiroot}/meetings/#{@id}"
    
class MeetingCollection extends Backbone.Collection
  model: SimpleMeetingModel
  url: "#{apiroot}/meetings"
  
class SimpleItemModel extends Backbone.Model
  url: () ->
    "#{apiroot}/items/#{@id}"
  

class ItemCollection extends Backbone.Collection
  model: SimpleItemModel
  url: () ->
    "#{apiroot}/items/search?#{qs.stringify @searchParams}"
    
  
main_meeting_list = new MeetingCollection
HubChannel.reply 'meetinglist', ->
  main_meeting_list

module.exports =
  apiroot: apiroot
  MeetingCollection: MeetingCollection
  MainMeetingModel: MainMeetingModel
  ItemCollection: ItemCollection
  
