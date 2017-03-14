var $, Backbone, BaseCollection, BaseLocalStorageCollection, DocChannel, MainChannel, Marionette, MessageChannel, StaticDocument, StaticDocumentCollection, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

_ = require('underscore');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

BaseLocalStorageCollection = require('agate/src/lscollection').BaseLocalStorageCollection;

BaseCollection = require('agate/src/collections').BaseCollection;

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

DocChannel = Backbone.Radio.channel('static-documents');

StaticDocument = (function(superClass) {
  extend(StaticDocument, superClass);

  function StaticDocument() {
    return StaticDocument.__super__.constructor.apply(this, arguments);
  }

  StaticDocument.prototype.url = function() {
    var basedir;
    basedir = "/assets/documents";
    if (this.id === 'README') {
      basedir = '';
    }
    return basedir + "/" + this.id + ".md";
  };

  StaticDocument.prototype.fetch = function(options) {
    options = _.extend(options || {}, {
      dataType: 'text'
    });
    return StaticDocument.__super__.fetch.call(this, options);
  };

  StaticDocument.prototype.parse = function(response) {
    return {
      content: response
    };
  };

  return StaticDocument;

})(Backbone.Model);

StaticDocumentCollection = (function(superClass) {
  extend(StaticDocumentCollection, superClass);

  function StaticDocumentCollection() {
    return StaticDocumentCollection.__super__.constructor.apply(this, arguments);
  }

  StaticDocumentCollection.prototype.model = StaticDocument;

  return StaticDocumentCollection;

})(BaseCollection);

DocChannel.reply('get-document', function(name) {
  var model;
  return model = new StaticDocument({
    id: name
  });
});

module.exports = {
  StaticDocument: StaticDocument
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWRvY3VtZW50cy5qcyIsInNvdXJjZXMiOlsic3RhdGljLWRvY3VtZW50cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx5SkFBQTtFQUFBOzs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osQ0FBQSxHQUFJLE9BQUEsQ0FBUSxZQUFSOztBQUNKLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUVYLDZCQUErQixPQUFBLENBQVEsd0JBQVI7O0FBQy9CLGlCQUFtQixPQUFBLENBQVEsdUJBQVI7O0FBRXJCLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBQ2pCLFVBQUEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsa0JBQXZCOztBQUVQOzs7Ozs7OzJCQUNKLEdBQUEsR0FBSyxTQUFBO0FBQ0gsUUFBQTtJQUFBLE9BQUEsR0FBVTtJQUNWLElBQUcsSUFBQyxDQUFBLEVBQUQsS0FBTyxRQUFWO01BQ0UsT0FBQSxHQUFVLEdBRFo7O1dBRUcsT0FBRCxHQUFTLEdBQVQsR0FBWSxJQUFDLENBQUEsRUFBYixHQUFnQjtFQUpmOzsyQkFNTCxLQUFBLEdBQU8sU0FBQyxPQUFEO0lBQ0wsT0FBQSxHQUFVLENBQUMsQ0FBQyxNQUFGLENBQVMsT0FBQSxJQUFXLEVBQXBCLEVBQ1I7TUFBQSxRQUFBLEVBQVUsTUFBVjtLQURRO1dBRVYsMENBQU0sT0FBTjtFQUhLOzsyQkFLUCxLQUFBLEdBQU8sU0FBQyxRQUFEO0FBQ0wsV0FBTztNQUFBLE9BQUEsRUFBUyxRQUFUOztFQURGOzs7O0dBWm9CLFFBQVEsQ0FBQzs7QUFlaEM7Ozs7Ozs7cUNBQ0osS0FBQSxHQUFPOzs7O0dBRDhCOztBQUt2QyxVQUFVLENBQUMsS0FBWCxDQUFpQixjQUFqQixFQUFpQyxTQUFDLElBQUQ7QUFDL0IsTUFBQTtTQUFBLEtBQUEsR0FBUSxJQUFJLGNBQUosQ0FDTjtJQUFBLEVBQUEsRUFBSSxJQUFKO0dBRE07QUFEdUIsQ0FBakM7O0FBTUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLGNBQUEsRUFBZ0IsY0FBaEIiLCJzb3VyY2VzQ29udGVudCI6WyIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUnXG5CYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbnsgQmFzZUxvY2FsU3RvcmFnZUNvbGxlY3Rpb24gfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9sc2NvbGxlY3Rpb24nXG57IEJhc2VDb2xsZWN0aW9uIH0gPSByZXF1aXJlICdhZ2F0ZS9zcmMvY29sbGVjdGlvbnMnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcbkRvY0NoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdzdGF0aWMtZG9jdW1lbnRzJ1xuXG5jbGFzcyBTdGF0aWNEb2N1bWVudCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIHVybDogLT5cbiAgICBiYXNlZGlyID0gXCIvYXNzZXRzL2RvY3VtZW50c1wiXG4gICAgaWYgQGlkID09ICdSRUFETUUnXG4gICAgICBiYXNlZGlyID0gJydcbiAgICBcIiN7YmFzZWRpcn0vI3tAaWR9Lm1kXCJcbiAgICBcbiAgZmV0Y2g6IChvcHRpb25zKSAtPlxuICAgIG9wdGlvbnMgPSBfLmV4dGVuZCBvcHRpb25zIHx8IHt9LFxuICAgICAgZGF0YVR5cGU6ICd0ZXh0J1xuICAgIHN1cGVyIG9wdGlvbnNcblxuICBwYXJzZTogKHJlc3BvbnNlKSAtPlxuICAgIHJldHVybiBjb250ZW50OiByZXNwb25zZVxuICAgIFxuY2xhc3MgU3RhdGljRG9jdW1lbnRDb2xsZWN0aW9uIGV4dGVuZHMgQmFzZUNvbGxlY3Rpb25cbiAgbW9kZWw6IFN0YXRpY0RvY3VtZW50XG4gIFxuXG4gIFxuRG9jQ2hhbm5lbC5yZXBseSAnZ2V0LWRvY3VtZW50JywgKG5hbWUpIC0+XG4gIG1vZGVsID0gbmV3IFN0YXRpY0RvY3VtZW50XG4gICAgaWQ6IG5hbWVcblxuXG4gIFxubW9kdWxlLmV4cG9ydHMgPVxuICBTdGF0aWNEb2N1bWVudDogU3RhdGljRG9jdW1lbnRcbiAgXG5cbiJdfQ==
