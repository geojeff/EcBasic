// ==========================================================================
// EcBasic.statechart
// ==========================================================================
/*globals EcBasic*/

/**
   @author Jeff Pittman
*/

EcBasic.statechart = Ki.Statechart.create({

  rootState: Ki.State.design({
    initialSubstate: "STARTING",
    //trace: YES,
    //substatesAreConcurrent: YES,

    // ----------------------------------------
    //    state: STARTING
    // ----------------------------------------
    STARTING: Ki.State.design({
      enterState: function() {
        console.log('STARTING');

        var categories = EcBasic.store.find(EcBasic.Category);
        var products = EcBasic.store.find(EcBasic.Product);

        if (SC.none(categories) || categories.get('length') === 0) {
          if (EcBasic.adminController.get('isLoggedIn') === NO) {
            EcBasic.statechart.rootState.gotoState('LOGGING_IN');
          } else {
            EcBasic.statechart.rootState.gotoState('COLD_START');
          }
        } else if (SC.none(products) || products.get('length') === 0) {
          if (EcBasic.adminController.get('isLoggedIn') === NO) {
            EcBasic.statechart.rootState.gotoState('LOGGING_IN');
          } else {
            EcBasic.statechart.rootState.gotoState('COLD_START');
          }
        } else {
          EcBasic.statechart.rootState.gotoState('LOADING_APP');
        }
      },

      exitState: function() {
      }
    }),

    // ----------------------------------------
    //    state: LOGGING_IN
    // ----------------------------------------
    LOGGING_IN: Ki.State.design({

      enterState: function() {
        console.log('LOGGING_IN');
        var pane = EcBasic.getPath('loginPanel');
        if (pane) {
          pane.append();
          pane.focus();
        }
      },

      exitState: function() {
        console.log('leaving LOGGING_IN');
        var pane = EcBasic.getPath('loginPanel');
        if (pane) {
          pane.remove();
        }
      },

      authenticate: function() {
        this.gotoState('AUTHENTICATING');
      }
    }),

    // ----------------------------------------
    //    state: AUTHENTICATING
    // ----------------------------------------
    AUTHENTICATING: Ki.State.design({
      enterState: function() {
        console.log('AUTHENTICATING');

        // In a live app, auth on the data source would call the backend,
        // which would have callbacks to send events to the "authResult" functions here.
        //return Ki.Async.perform('logIn');

        // But for development, we will fake auth
        return Ki.Async.perform('fakeLogIn');
      },

      exitState: function() {
      },

      logIn: function() {
        var username = EcBasic.adminController.get('username');
        var password = EcBasic.adminController.get('password');

        EcBasic.store.dataSource.connect(EcBasic.store, function() {
          EcBasic.store.dataSource.authRequest(username, password);
        });
      },

      fakeLogIn: function() {
        var username = EcBasic.adminController.get('username');
        var password = EcBasic.adminController.get('password');

        console.log('letting in: %@ / %@'.fmt(username, password));
        this.authSuccess();
      },

      // [TODO: make an authFailureCallback in Thoth-SC]
      authFailure: function(errorMessage) {
        EcBasic.adminController.set('loginErrorMessage', errorMessage);
        this.resumeGotoState();
        this.gotoState('LOGGING_IN');
      },

      authSuccess: function() {
        this.resumeGotoState();
        EcBasic.adminController.set('isLoggedIn', YES);
        EcBasic.statechart.rootState.gotoState('STARTING');
      }
    }),

    // ----------------------------------------
    //    state: COLD_START
    // ----------------------------------------
    COLD_START: Ki.State.design({
      initialSubstate: "ADDING_CATEGORY_COLD_START",

      enterState: function() {
        console.log('COLD_START');
      },

      exitState: function() {
      },

      // ----------------------------------------
      //    state: ADDING_CATEGORY_COLD_START
      // ----------------------------------------
      ADDING_CATEGORY_COLD_START: Ki.State.design({
        _category: null,

        enterState: function() {
          console.log('ADDING_CATEGORY_COLD_START');

          if (EcBasic.storeType === 'fixtures') {
            this._category = EcBasic.store.find(EcBasic.Category, 1);
          }

          if (SC.none(this._category)) {
            this._category = EcBasic.store.createRecord(EcBasic.Category, { name: 'Change Me', isVisible: YES, products: [] } );
            this.addObserver('_category.status', this, 'finalizeCategory');
            EcBasic.store.commitRecords();
          } else {
            EcBasic.categoryController.set('content', this._category);
            delete this._category;
            this.gotoState('ADDING_PRODUCT_COLD_START');
          }
        },

        finalizeCategory: function() {
          var val = this._category.get('status');

          if (val & SC.Record.READY_CLEAN) {
            EcBasic.categoriesController.set('content', [this._category]);
            EcBasic.categoriesController.selectObject(EcBasic.categoriesController.firstSelectableObject());
            EcBasic.categoryController.set('isEditing', YES);

            this.removeObserver('_category.status', this, 'finalizeCategory');
            delete this.category;

            var pane = EcBasic.mainPage.getPath('categoryPane');
            if (!SC.none(pane)) {
              pane.append();
            }
          }
        },

        exitState: function() {
          var pane = EcBasic.mainPage.getPath('categoryPane');
          if (!SC.none(pane)) {
            pane.remove();
          }
          EcBasic.categoryController.set('isEditing', NO);
        },

        cancel: function() {
          this.gotoState('LOADING_APP');
        },

        save: function() {
          this.gotoState('ADDING_PRODUCT_COLD_START');
        }
      }),

      // ----------------------------------------
      //    state: ADDING_PRODUCT_COLD_START
      // ----------------------------------------
      ADDING_PRODUCT_COLD_START: Ki.State.design({
        _category: null,
        _product: null,

        enterState: function() {
          console.log('ADDING_PRODUCT_COLD_START');

          // Grab the category created in ADDING_CATEGORY_COLD_START
          this._category = EcBasic.store.find(EcBasic.Category).firstObject();

          if (EcBasic.storeType === 'fixtures') {
            this._product = EcBasic.store.find(EcBasic.Product, 1);
          }

          if (SC.none(this._product) && !SC.none(this._category)) {
            this._product = EcBasic.store.createRecord(EcBasic.Product, { isVisible: YES });
            this.addObserver('_product.status', this, 'finalizeProduct');
            EcBasic.store.commitRecords();
          } else {
            EcBasic.productController.set('content', this._product);
            delete this._product;
            this.gotoState('SHOWING_STANDARD');
          }
        },

        finalizeProduct: function() {
          var val = this._product.get('status');

          if (val & SC.Record.READY_CLEAN) {
            console.log('0');
            //console.log(SC.inspect(this._category));
            //this._product.set('category', this._category);                // [TODO - error, products of null]
            //this._category.get('products').pushObject(this._product);     //    same thing if this is tried

            console.log('1');
            //me._category.get('products').pushObject(product); // SO, SHOULD NOT PUSH HERE, EH?

            EcBasic.productController.set('content', this._product);
            console.log('2');
            EcBasic.productController.set('isEditing', YES);

            console.log('3');
            this.removeObserver('_product.status', this, 'finalizeProduct');
            console.log('4');
            delete this._product;
            console.log('5');

            var pane = EcBasic.mainPage.getPath('productPane');
            if (!SC.none(pane)) {
              pane.append();
            }
          }
        },

        exitState: function() {
          var pane = EcBasic.mainPage.getPath('productPane');
          if (!SC.none(pane)) {
            pane.remove();
          }
          EcBasic.productController.set('isEditing', NO);
        },

        cancel: function() {
          this.gotoState('LOADING_APP');
        },

        save: function() {
          this.gotoState('LOADING_APP');
        }
      })
    }),

    // ----------------------------------------
    //    state: LOADING_APP
    // ----------------------------------------
    LOADING_APP: Ki.State.design({
      enterState: function() {
        console.log('LOADING_APP');

        var rootNode = SC.Object.create({
          treeItemIsExpanded: YES,
          name: 'root',
          itemView: SC.ListItemView,

          treeItemChildren: function() {
            var categoryQuery = SC.Query.local(EcBasic.Category, 'isVisible=YES', { orderBy: 'name' });
            return EcBasic.store.find(categoryQuery);
          }.property()
        });

        EcBasic.productTreeController.set('content', rootNode);

        EcBasic.getPath('mainPage.mainPane').append();

        EcBasic.statechart.rootState.gotoState('APP_LOADED');
      },

      exitState: function() {
      }

    }),

    // ----------------------------------------
    //    state: APP_LOADED
    // ----------------------------------------
    APP_LOADED: Ki.State.design({
      initialSubstate: "SHOWING_STANDARD",

      enterState: function() {
        console.log('APP_LOADED');
      },

      exitState: function() {
      },

      // -------------------------------------------
      //    state: SHOWING_STANDARD
      // -------------------------------------------
      SHOWING_STANDARD: Ki.State.design({
        initialSubstate: "READY_STANDARD",

        enterState: function() {
          console.log('SHOWING_STANDARD');
        },

        exitState: function() {
        },

        showGraphic:    function() { this.gotoState('SHOWING_GRAPHIC'); },

        // -------------------------------------------
        //    state: READY_STANDARD
        // -------------------------------------------
        READY_STANDARD: Ki.State.design({
          enterState: function() {
            console.log('READY_STANDARD');

            var cart = EcBasic.cartController.get('content');

            if (SC.none(cart)) {
              // If there is no cart, make one
              this.cart = EcBasic.store.createRecord(EcBasic.Cart, { items: [] });
              this.addObserver('cart.status', this, 'finalizeCart');
              EcBasic.store.commitRecords();
            }
          },

          exitState: function() {
          },

          adminLogin: function() { this.gotoState('LOGGING_IN'); },
          showProductItem: function() { this.gotoState('SHOWING_PRODUCT_ITEM'); },
          showCart: function() { this.gotoState('SHOWING_CART'); },

          finalizeCart: function() {
            var cart = this.get('cart'),
                val = cart.get('status');

            if (val & SC.Record.READY_CLEAN) {
              EcBasic.cartController.set('content', cart);
              this.removeObserver('cart.status', this, 'finalizeCart');
              delete this.cart;
            }
          }
        }),

        SHOWING_PRODUCT_ITEM: Ki.State.design({
          enterState: function() {
            console.log('SHOWING_PRODUCT_ITEM');

            var selection = EcBasic.productTreeNodeController.get('content');

            if (selection && selection.kindOf(EcBasic.Product)) {
              var pane = EcBasic.mainPage.getPath('productItemPane').append();
            }
          },

          exitState: function() {
            EcBasic.mainPage.getPath('productItemPane').remove();
          },

          hideProductItem: function() { this.gotoState('SHOWING_STANDARD'); },
          addCartItem:  function() { this.gotoState('ADDING_CART_ITEM'); },
          deleteCartItem:  function() { this.gotoState('DELETING_CART_ITEM'); }
        }),

        ADDING_CART_ITEM: Ki.State.design({
          _product: null,
          _cartItem: null,
          _messagePane: null,

          enterState: function() {
            console.log('ADDING_CART_ITEM');
            var product, quantity, stock;

            product = EcBasic.productTreeNodeController.get('content');
            if (!SC.none(product) && product.kindOf(EcBasic.Product)) {
              this.set('_product', product);

              stock = product.get('stock');
              quantity = product.get('quantity');

              if (quantity > 0 && stock >= quantity) {
                this._cartItem = product.get('cartItem');

                if (!SC.none(this._cartItem)) {
                  console.log('adding to existing cartItem ', quantity);
                  this._cartItem.incrementProperty('quantity', quantity);
                  this._product.decrementProperty('stock', quantity);
                  this.gotoState('SHOWING_STANDARD');
                } else {
                  this._cartItem = EcBasic.store.createRecord(EcBasic.CartItem, { quantity: quantity });
                  this.addObserver('_cartItem.status', this, 'finalizeCartItem');
                  EcBasic.store.commitRecords();
                }
              } else {
                this._messagePane = EcBasic.mainPage.getPath('messagePane');
                this._messagePane.get('contentView').set('title', "Availability Problem");
                this._messagePane.get('contentView').set('message', "For this item, the quantity available is %@, but you requested %@.".fmt(stock, quantity));
                this._messagePane.append();
              }
            } else {
              this.gotoState('SHOWING_STANDARD');
            }
          },

          exitState: function() {
            if (!SC.none(this.get('_messagePane'))) {
              this._messagePane.remove();
              delete this._messagePane;
              console.log('messagePane removed');
            }
          },

          messageShown: function() {
            this.gotoState('SHOWING_PRODUCT_ITEM');
          },

          finalizeCartItem: function() {
            var val = this._cartItem.get('status');

            if (val & SC.Record.READY_CLEAN) {
              EcBasic.cartController.get('items').pushObject(this._cartItem);

              this._product.set('cartItem', this._cartItem);

              for (var i=0, len=this._cartItem.get('quantity'); i<len; i++) {
                this._product.decrementProperty('stock');
              }

              this.removeObserver('_cartItem.status', this, 'finalizeCartItem');

              delete this._cartItem;
              delete this._product;

              this.gotoState('SHOWING_STANDARD');
            }
          }
        }),

        SHOWING_CART: Ki.State.design({
          enterState: function() {
            console.log('SHOWING_CART');
            var pane = EcBasic.mainPage.getPath('cartContentPane').append();
          },

          exitState: function() {
            EcBasic.mainPage.getPath('cartContentPane').remove();
          },

          hideCart: function() {
            this.gotoState('SHOWING_STANDARD');
          },

          removeCartItem: function() {
            var cartItem = EcBasic.cartItemsController.get('selection').get('firstObject');
            if (!SC.none(cartItem)) {
              EcBasic.cartController.get('items').removeInverseRecord(cartItem);
              EcBasic.cartItemsController.removeObject(cartItem);    // this controller has destroyOnRemoval YES
              EcBasic.mainPage.getPath('cartContentPane').get('contentView').get('itemList').reload(); // force list reload
            }
          },

          clearCart: function() {
            console.log('removing all');
            var cartItem, items = EcBasic.cartController.get('items');
            while (items.get('length') > 0) {
              console.log('removing all items length: ', items.get('length'));
              cartItem = items.objectAt(0);
              EcBasic.cartController.get('items').removeInverseRecord(cartItem);
              EcBasic.cartItemsController.removeObject(cartItem);    // this controller has destroyOnRemoval YES
            }
            SC.AlertPane.info("Shopping Cart was cleared.", null, null, "Continue Shopping", null, null, this );
            this.gotoState('SHOWING_STANDARD'); // close cart
          },

          showCheckout: function() {
            this.gotoState('SHOWING_CHECKOUT');
          }

        }),

        SHOWING_CHECKOUT: Ki.State.design({
          enterState: function() {
            console.log('SHOWING_CHECKOUT');
            var pane = EcBasic.mainPage.getPath('checkoutPane').append();
          },

          exitState: function() {
            EcBasic.mainPage.getPath('checkoutPane').remove();
          },

          hideCheckout: function() { this.gotoState('SHOWING_STANDARD'); },

          checkout: function() {
            // For PayPal, something like this...
            var info =  { "cmd":           "_cart",
                          "upload":        "1",
                          "business":      "business@example.com",
                          "currency_code": "USD",
                          "notify_url":    "",
                          "return":        "http://www.ecbasic.biz/thank-you" };

            var i = 0;
            EcBasic.cartItemsController.forEach(function(item) {
              i += 1;
              info['item_name_%@'.fmt(i)] = '%@'.fmt(item.get('product').get('name'));
              info['quantity_%@'.fmt(i)] = '%@'.fmt(item.get('quantity'));
              info['amount_%@'.fmt(i)] = '%@'.fmt(item.get('totalPrice'));
            });

            var urlParts = [];
            for (key in info) {
              if (info.hasOwnProperty(key)) {
                urlParts.push('%@=%@'.fmt(key, info[key]));
              }
            }

            var url = 'https://www.paypal.com/us/cgi-bin/websc/?' + urlParts.join('&');

            console.log('url ', url);

            //SC.Request.getUrl(url).send();

            this.gotoState('SHOWING_STANDARD');
          }
        }),

        EDITING_PRODUCT: Ki.State.design({
          enterState: function() {
            console.log('EDITING_PRODUCT');
            var pane = EcBasic.mainPage.getPath('productPane').append();
          },

          exitState: function() {
            EcBasic.mainPage.getPath('productPane').remove();
          },

          cancel: function() { this.gotoState('SHOWING_STANDARD'); },
          save: function() {
            EcBasic.productController.save();
          }
        })
      })
    })
  })
});

