# TK Test

A small repo to test [marionette.toolkit](https://github.com/RoundingWellOS/marionette.toolkit).


## Goals

There are three goals that I want to accomplish:

1. Split the loading of modules by route.  Example code for this 
   can be found here: https://github.com/somebody32/splitting-apps-by-routes-with-webpack.
   
2. Make use of [backbone.eventrouter](https://github.com/RoundingWellOS/backbone.eventrouter) to attempt to keep from using "```trigger:true```".

3. Maintain a group of Marionette [AppRouters](http://marionettejs.com/docs/master/marionette.approuter.html).


## Current Code

At the moment, I am attempting to use a simple ```Backbone.Router``` as a 
primary dispatch router.  The main router handles the empty hash and 
routes it to a "frontdoor applet" or it will match a route 
matching ```:applet/*```.  When "applet" is matched, the corresponding 
code should be "required" asynchronously, the routes registered, then 
the appropriate route activated.  At the moment, this is apparently 
triggering the route.

The asynchronous loading of applets is currently working, even though 
the controller for the ```AppRouter``` is being invoked 
using ```Backbone.History.loadUrl()```.  One major problem is that, 
upon initial page load to ```/page#applet```, the route seems to be 
invoked twice, bringing errors.  However, upon initial page 
load to ```/page#applet/subpath``` appears to only invoke the route 
a single time.


