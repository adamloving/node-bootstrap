(function() {
  window.App = (function() {
    function App() {}

    App.prototype.initialize = function() {};

    return App;

  })();

  window.MailerPreviewController = (function() {
    function MailerPreviewController() {}

    MailerPreviewController.prototype.send = function() {
      var _ref;
      $('.btn-primary img').show();
      $.ajax({
        url: '/1/mailers/view-summary/test',
        type: 'POST',
        data: {
          email: $('#to-email').val(),
          userId: (_ref = window.location.search.match(/userId=([A-z0-9]+)/)) != null ? _ref[1] : void 0
        },
        success: function(data, textStatus, jqXHR) {
          $('.alert.hide').addClass('alert-success').text('Email sent!').fadeIn();
          return $('.btn-primary img').hide();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          $('.alert.hide').addClass('alert-error').text(textStatus).fadeIn();
          $('.btn-primary img').hide();
          return console.error(errorThrown);
        }
      });
      return false;
    };

    return MailerPreviewController;

  })();

  window.config = {
    restApiRoot: '/1/'
  };

  window.SlideDeck = Backbone.Model.extend({
    url: function() {
      return "" + window.config.restApiRoot + "decks/" + this.id;
    },
    getCategoryString: function() {
      var _ref;
      return (_ref = this.get('categoryIds')) != null ? _ref.join(', ') : void 0;
    }
  });

  window.Slide = Backbone.Model.extend({
    url: function() {
      return "" + window.config.restApiRoot + "slides/" + this.id;
    }
  });

  window.PopularDeckCollection = Backbone.Collection.extend({
    model: SlideDeck,
    url: function() {
      return "" + window.config.restApiRoot + "decks/popular";
    }
  });

  window.FeaturedDeckCollection = Backbone.Collection.extend({
    model: SlideDeck,
    url: function() {
      return "" + window.config.restApiRoot + "decks/featured";
    }
  });

  window.LegacyPopularDeckCollection = Backbone.Collection.extend({
    model: SlideDeck,
    url: function() {
      return "" + window.config.restApiRoot + "decks/popular/legacy";
    }
  });

  window.LegacyFeaturedDeckCollection = Backbone.Collection.extend({
    model: SlideDeck,
    url: function() {
      return "" + window.config.restApiRoot + "decks/featured/legacy";
    }
  });

  window.RecentDeckCollection = Backbone.Collection.extend({
    model: SlideDeck,
    url: function() {
      return "" + window.config.restApiRoot + "decks/recent";
    }
  });

  window.DeckPage = Backbone.View.extend({
    initialize: function(deck) {
      window.DeckView = Backbone.View.extend({
        el: $('#deck'),
        template: _.template($('#deck-template').html()),
        events: {
          'click #save': this.onSave
        },
        initialize: function() {
          return this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
          this.$el.html(this.template(this.model));
          $('input[ischecked=true]').attr({
            'checked': true
          });
          return this;
        }
      });
      return new window.DeckView(deck);
    },
    onSave: function() {
      window.deck.set('isFeatured', $('input#featured').prop('checked'));
      window.deck.set('isPopular', $('input#popular').prop('checked'));
      $('#save img').show();
      return window.deck.save(deck.attributes, {
        success: function(data, textStatus, jqXHR) {
          $('.alert').addClass('alert-success').text('Deck saved!').fadeIn();
          return $('#save img').hide();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          $('.alert').addClass('alert-error').text(textStatus).fadeIn();
          $('#save img').hide();
          return console.error(errorThrown);
        }
      });
    }
  });

  window.GalleryPage = Backbone.View.extend({
    initialize: function() {
      window.DeckThumbnailView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#item-template').html()),
        events: {},
        initialize: function() {
          return this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
          this.$el.html(this.template(this.model));
          return this;
        }
      });
      window.RecentView = Backbone.View.extend({
        el: 'ul#recent-gallery',
        initialize: function() {
          return this.listenTo(recentDeckCollection, 'reset', this.onReset);
        },
        onReset: function(deckCollection) {
          var deck, view, _i, _len, _ref, _results;
          $(this.el).empty();
          _ref = deckCollection.models;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            deck = _ref[_i];
            view = new DeckThumbnailView({
              model: deck
            });
            _results.push($(this.el).append(view.render().el));
          }
          return _results;
        }
      });
      window.PopularView = Backbone.View.extend({
        el: 'ul#popular-gallery',
        initialize: function() {
          return this.listenTo(popularDeckCollection, 'reset', this.onReset);
        },
        onReset: function(deckCollection) {
          var deck, view, _i, _len, _ref, _results;
          $(this.el).empty();
          _ref = deckCollection.models;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            deck = _ref[_i];
            view = new DeckThumbnailView({
              model: deck
            });
            _results.push($(this.el).append(view.render().el));
          }
          return _results;
        }
      });
      window.FeaturedView = Backbone.View.extend({
        el: 'ul#featured-gallery',
        initialize: function() {
          return this.listenTo(featuredDeckCollection, 'reset', this.onReset);
        },
        onReset: function(deckCollection) {
          var deck, view, _i, _len, _ref, _results;
          $(this.el).empty();
          _ref = deckCollection.models;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            deck = _ref[_i];
            view = new DeckThumbnailView({
              model: deck
            });
            _results.push($(this.el).append(view.render().el));
          }
          return _results;
        }
      });
      window.LegacyPopularView = Backbone.View.extend({
        el: 'ul#legacy-popular-gallery',
        initialize: function() {
          return this.listenTo(legacyPopularDeckCollection, 'reset', this.onReset);
        },
        onReset: function(deckCollection) {
          var deck, view, _i, _len, _ref, _results;
          $(this.el).empty();
          _ref = deckCollection.models;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            deck = _ref[_i];
            view = new DeckThumbnailView({
              model: deck
            });
            _results.push($(this.el).append(view.render().el));
          }
          return _results;
        }
      });
      window.LegacyFeaturedView = Backbone.View.extend({
        el: 'ul#legacy-featured-gallery',
        initialize: function() {
          return this.listenTo(legacyFeaturedDeckCollection, 'reset', this.onReset);
        },
        onReset: function(deckCollection) {
          var deck, view, _i, _len, _ref, _results;
          $(this.el).empty();
          _ref = deckCollection.models;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            deck = _ref[_i];
            view = new DeckThumbnailView({
              model: deck
            });
            _results.push($(this.el).append(view.render().el));
          }
          return _results;
        }
      });
      window.recentDeckCollection = new RecentDeckCollection();
      window.popularDeckCollection = new PopularDeckCollection();
      window.featuredDeckCollection = new FeaturedDeckCollection();
      window.legacyPopularDeckCollection = new LegacyPopularDeckCollection();
      window.legacyFeaturedDeckCollection = new LegacyFeaturedDeckCollection();
      new RecentView();
      new FeaturedView();
      new PopularView();
      new LegacyFeaturedView();
      new LegacyPopularView();
      window.recentDeckCollection.fetch({
        reset: true
      });
      window.featuredDeckCollection.fetch({
        reset: true
      });
      window.popularDeckCollection.fetch({
        reset: true
      });
      window.legacyFeaturedDeckCollection.fetch({
        reset: true
      });
      return window.legacyPopularDeckCollection.fetch({
        reset: true
      });
    }
  });

}).call(this);
