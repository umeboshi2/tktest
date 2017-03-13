Backbone = require 'backbone'

BumblrChannel = Backbone.Radio.channel 'bumblr'

class BaseLocalStorageModel extends Backbone.Model
  initialize: () ->
    @fetch()
    @on 'change', @save, @
   fetch: () ->
    #console.log '===== FETCH FIRED LOADING LOCAL STORAGE ===='
    @set JSON.parse localStorage.getItem @id
   save: (attributes, options) ->
    #console.log '===== CHANGE FIRED SAVING LOCAL STORAGE ===='
    localStorage.setItem(@id, JSON.stringify(@toJSON()))
    return $.ajax
      success: options.success
      error: options.error
      
  destroy: (options) ->
    #console.log '===== DESTROY LOCAL STORAGE ===='
    localStorage.removeItem @id
   isEmpty: () ->
    _.size @attributes <= 1
    
########################################
# Models
########################################
baseURL = '//api.tumblr.com/v2'

class BumblrSettings extends BaseLocalStorageModel
  id: 'bumblr_settings'
  
class BaseTumblrModel extends Backbone.Model
  baseURL: baseURL
  
class BlogInfo extends BaseTumblrModel
  url: () ->
    "#{@baseURL}/blog/#{@id}/info?api_key=#{@api_key}&callback=?"
    
consumer_key = '4mhV8B1YQK6PUA2NW8eZZXVHjU55TPJ3UZnZGrbSoCnqJaxDyH'
bumblr_settings = new BumblrSettings consumer_key:consumer_key
BumblrChannel.reply 'get_app_settings', ->
  bumblr_settings
    
module.exports =
  BlogInfo: BlogInfo
  
