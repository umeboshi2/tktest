Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Masonry = require 'masonry-layout'
tc = require 'teacup'

#require 'jquery-ui'

{ navigate_to_url } = require 'agate/src/apputil'

BumblrChannel = Backbone.Radio.channel 'bumblr'

########################################
blog_dialog_view = tc.renderable (blog) ->
  tc.div '.modal-header', ->
    tc.h2 'This is a modal!'
  tc.div '.modal-body', ->
    tc.p 'here is some content'
  tc.div '.modal-footer', ->
    tc.button '#modal-cancel-button.btn', 'cancel'
    tc.button '#modal-ok-button.btn.btn-default', 'Ok'

simple_blog_info = tc.renderable (blog) ->
  tc.div '.blog.listview-list-entry', ->
    tc.a href:'#bumblr/viewblog/' + blog.name, blog.name
    tc.i ".delete-blog-button.fa.fa-close.btn.btn-default.btn-xs",
    blog:blog.name

simple_blog_list = tc.renderable () ->
  tc.div ->
    tc.a '.btn.btn-default', href:'#bumblr/addblog', "Add blog"
    tc.div '#bloglist-container.listview-list'

########################################
class BlogModal extends Backbone.Marionette.View
  template: blog_dialog_view

class SimpleBlogInfoView extends Backbone.Marionette.View
  template: simple_blog_info

class SimpleBlogListView extends Backbone.Marionette.CompositeView
  childView: SimpleBlogInfoView
  template: simple_blog_list
  childViewContainer: '#bloglist-container'
  ui:
    blogs: '#bloglist-container'

  onDomRefresh: () ->
    console.log 'onDomRefresh called on SimpleBlogListView'
    @masonry = new Masonry "#bloglist-container",
      gutter: 2
      isInitLayout: false
      itemSelector: '.blog'
      columnWidth: 100
    delete_buttons = $ '.delete-blog-button'
    delete_buttons.hide()
    delete_buttons.on 'click', (event) =>
      target = $ event.currentTarget
      blog = target.attr 'blog'
      id = "#{blog}.tumblr.com"
      model = @collection.get id
      model.destroy()
      #console.log "Delete #{blog}"
      @masonry.reloadItems()
      @masonry.layout()
    @set_layout()

  set_layout: ->
    @masonry.reloadItems()
    @masonry.layout()
    blog = $ '.blog'
    handlerIn = (event) ->
      window.enterevent = event
      button = $(event.target).find '.delete-blog-button'
      button.show()
      # set button to disappear after two seconds
      # without this, some buttons appear to stick
      # and stay when the mouse jumps between entries
      # too quickly.
      # FIXME configure time elsewhere?
      setTimeout () ->
        button.hide()
      , 2000 
    handlerOut = (event) ->
      window.leaveevent = event
      button = $(event.target).find '.delete-blog-button'
      button.hide()
    blog.hover handlerIn, handlerOut

module.exports = SimpleBlogListView
