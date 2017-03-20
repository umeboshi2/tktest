Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Masonry = require 'masonry-layout'
imagesLoaded = require 'imagesloaded'
tc = require 'teacup'


#require 'jquery-ui'

{ navigate_to_url } = require 'tbirds/apputil'

BumblrChannel = Backbone.Radio.channel 'bumblr'

########################################
simple_post_page_view = tc.renderable () ->
  tc.div '.mytoolbar.row', ->
    tc.ul '.pager', ->
      tc.li '.previous', ->
        tc.i '#prev-page-button.fa.fa-arrow-left.btn.btn-default'
      tc.li ->
        tc.i '#slideshow-button.fa.fa-play.btn.btn-default'
      tc.li '.next', ->
        tc.i '#next-page-button.fa.fa-arrow-right.btn.btn-default'
    #icon '#prev-page-button.fa.fa-arrow-left.btn.btn-default.pull-left'
    #icon '#slideshow-button.fa.fa-play.btn.btn-default'
  tc.div '#posts-container.row'

simple_post_view = tc.renderable (post) ->
  tc.div '.listview-list-entry', ->
    #p ->
    # a href:post.post_url, target:'_blank', post.blog_name
    tc.span ->
      #for photo in post.photos
      photo = post.photos[0]
      current_width = 0
      current_size = null
      for size in photo.alt_sizes
        if size.width > current_width and size.width < 250
          current_size = size
          current_width = size.width
      size = current_size 
      tc.a href:post.post_url, target:'_blank', ->
        tc.img src:size.url

########################################
class SimpleBlogPostView extends Backbone.Marionette.View
  template: simple_post_view
  className: 'post'




class BlogPostListView extends Backbone.Marionette.CompositeView
  template: simple_post_page_view
  childView: SimpleBlogPostView
  childViewContainer: '#posts-container'
  ui:
    posts: '#posts-container'
    slideshow_button: '#slideshow-button'
    next_button: '#next-page-button'
    prev_putton: '#prev-page-button'
    
  events:
    'click @ui.prev_putton': 'get_prev_page'
    'click @ui.next_button': 'get_next_page'
    'click @ui.slideshow_button': 'manage_slideshow'

  keycommands:
    prev: 65
    next: 90

  manage_slideshow: () ->
    button = @ui.slideshow_button
    if button.hasClass 'fa-play'
      @start_slideshow()
    else
      @stop_slideshow()


  start_slideshow: () ->
    console.log "start slideshow"
    @slideshow_handler = setInterval =>
      console.log "getting next page"
      @get_next_page()
    , 6000
    @ui.slideshow_button.removeClass 'fa-play'
    @ui.slideshow_button.addClass 'fa-stop'

  stop_slideshow: () ->
    clearInterval @slideshow_handler
    @ui.slideshow_button.removeClass 'fa-stop'
    @ui.slideshow_button.addClass 'fa-play'

  get_next_page: () ->
    @ui.posts.hide()
    response = @collection.getNextPage()
    response.done =>
      @set_image_layout()

  get_prev_page: () ->
    response = @collection.getPreviousPage()
    response.done =>
      @set_image_layout()

  get_another_page: (direction) ->
    @ui.posts.hide()
    switch direction
      when 'prev' then response = @collection.getPreviousPage()
      when 'next' then response = @collection.getNextPage()
      else response = null
    if response
      response.done =>
        @set_image_layout()

  handle_key_command: (command) ->
    if command in ['prev', 'next']
      @get_another_page command

  keydownHandler: (event_object) =>
    #console.log 'keydownHandler ' + event_object
    for key, value of @keycommands
      if event_object.keyCode == value
        @handle_key_command key

  set_image_layout: ->
    items = $ '.post'
    imagesLoaded items, =>
      @ui.posts.show()
      #console.log "Images Loaded>.."
      @masonry.reloadItems()
      @masonry.layout()      

  onDomRefresh: () ->
    $('html').keydown @keydownHandler
    @masonry = new Masonry "#posts-container",
      gutter: 2
      isInitLayout: false
      itemSelector: '.post'
    @set_image_layout()

  onBeforeDestroy: () ->
    #console.log "Remove @keydownHandler" + @keydownHandler
    $('html').unbind 'keydown', @keydownHandler
    @stop_slideshow()



module.exports = BlogPostListView
