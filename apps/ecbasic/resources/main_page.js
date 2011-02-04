// ==========================================================================
// Project:   EcBasic - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

EcBasic.mainPage = SC.Page.design({
  defaultResponder: EcBasic.statechart,

  mainPane: SC.MainPane.design({
    childViews: 'headerBar logoHeader productsView footerBar'.w(),
    defaultResponder: EcBasic.statechart,

    headerBar: SC.ToolbarView.design({
      layout: { left: 0, right: 0, top: 0, height: 40 },
      anchorLocation: SC.ANCHOR_TOP,
      childViews: 'cartSummary viewCartButton'.w(),

      cartSummary: SC.LabelView.design({
        layout: { centerY: 0, left: 12, height: 32 },
        textAlign: SC.ALIGN_LEFT,
        valueBinding: 'EcBasic.cartItemsController.summary'
      }),

      adminButton: SC.ButtonView.design({
        layout: { centerY: 0, centerX: 0, width: 120, height: 32 },
        title: 'Admin',
        action: 'adminLogin'
      }),

      viewCartButton: SC.ButtonView.design({
        layout: { centerY: 0, right: 12, width: 120, height: 32 },
        title: 'View cart',
        action: 'showCart'
      })
    }),

    logoHeader: SC.View.design({
      layout: { left: 0, right: 0, top: 40, height: 90 },
      childViews: 'logo'.w(),

      logo: SC.View.design({
        layout: { centerY: 0, centerX: 0, width: 489, height: 75 },
        classNames: ['logo']
      })
    }),

    productsView: SC.ScrollView.design({
      layout: { top: 130, left: 0, right: 0, bottom: 0 },

      contentView: SC.ListView.design({
        layout: { left: 0, right: 0, bottom: 0, top: 0 },

        contentValueKey: 'name',
        contentBinding: 'EcBasic.productTreeController.arrangedObjects',
        selectionBinding: 'EcBasic.productTreeController.selection',
        exampleView: EcBasic.ProductItemView,
        action: 'showProductItem',
  
        /*
        customRowHeightIndexes: function() {
          return SC.IndexSet.create(0, this.get('length'));
        }.property('length'),
  
        contentIndexRowHeight: function(view, content, index) {
          var item;
            if (content)
            item = content.objectAt(index);
          if (item && item.kindOf(EcBasic.Product))
            return 50;
          return 18;
        },*/
  
        rowHeight: 50
      })
    }),

    footerBar: SC.ToolbarView.design({
      layout: { left: 0, right: 0, bottom: 0, height: 40},
      anchorLocation: SC.ANCHOR_BOTTOM,
      childViews: 'cartSummary viewCartButton'.w(),

      cartSummary: SC.LabelView.design({
        layout: { centerY: 0, left: 12, height: 32 },
        textAlign: SC.ALIGN_LEFT,
        valueBinding: 'EcBasic.cartItemsController.summary'
      }),

      viewCartButton: SC.ButtonView.design({
        layout: { centerY: 0, right: 12, width: 120, height: 32 },
        title: 'View cart',
        action: 'showCart'
      })
    })

  }),

  productItemPane: SC.PanelPane.design({
    layout: { left: 40, right: 40, top: 80, height: 320 },
    classNames: ['product-detail-pane'],
    defaultResponder: EcBasic.statechart,

    contentView: SC.View.design({
      childViews: 'closeButton productName productImage productDescription stockSummary quantityLabel quantityInput submitButton'.w(),

      closeButton: SC.ButtonView.design({
        layout: { right: 10, top: 10, width: 100, height: 24 },
        title: 'Close',
        action: 'hideProductItem'
      }),

      productName: SC.LabelView.design({
        layout: { left: 10, right: 120, top: 10, height: 24 },
        classNames: ['product-detail-name'],
        textAlign: SC.ALIGN_CENTER,
        fontWeight: SC.BOLD_WEIGHT,
        controlSize: SC.LARGE_CONTROL_SIZE,
  
        valueBinding: 'EcBasic.productTreeNodeController.name' 
      }),
  
      productImage: SC.ImageView.design({
        classNames: ['product-detail-image'],
        layout: { left: 10, top: 40, width: 250, height: 250 },
        valueBinding: 'EcBasic.productTreeNodeController.imgUrl'
      }),
  
      productDescription: SC.TextFieldView.design({
        layout: { left: 275, top: 40, bottom: 36, right: 10 },
        hasHorizontalScroller: NO,
        classNames: ['product-detail-description'],
        valueBinding: 'EcBasic.productTreeNodeController.description',
  
        isTextArea: YES,
  
        render: function(context, firstTime) {
          sc_super();
          var elem = context.element();
          if (elem) {
            this.invokeLast(function() {
                var textareas = elem.getElementsByTagName('textarea');
                if (textareas && textareas.length) {
                  textareas[0].setAttribute('readonly', 'true');
              }
            });
          }
        }
      }),

      stockSummary: SC.LabelView.design({
        layout: { left: 10, width: 100, bottom: 6, height: 16 },
        classNames: ['stock-summary'],
        fontWeight: SC.BOLD_WEIGHT,
        valueBinding: 'EcBasic.productTreeNodeController.stockSummary'
      }),

      quantityLabel: SC.LabelView.design({
        layout: { right: 210, width: 60, height: 16, bottom: 12},
        textAlign: SC.ALIGN_RIGHT,
          value: 'Quantity:'
      }),

      quantityInput: SC.TextFieldView.design({
        layout: { right: 140, height: 24, width: 30, bottom: 6 },
        validator: SC.Validator.Number.create({ places: 0 }),
        isEnabledBinding: 'EcBasic.productTreeNodeController.inStock',
        valueBinding: 'EcBasic.productTreeNodeController.quantity'
      }),

      submitButton: SC.ButtonView.design({
        layout: { right: 10, bottom: 6, height: 24, width: 120 },
        title: 'Add to cart',
        isEnabledBinding: 'EcBasic.productTreeNodeController.inStock',
        action: 'addCartItem'
       })
    }),

    append: function() {
      sc_super();
      var content = this.get('contentView');
      content.get('quantityInput').set('value', 1);
    }
  }),

  cartContentPane: SC.PanelPane.design({
    layout: { top: 80, bottom: 40, left: 40, right: 40 },
    classNames: ['panel-design'],
    defaultResponder: EcBasic.statechart,

    contentView: SC.View.design({
      childViews: 'title closeButton captions totalPriceFooter itemList removeSelectedButton removeAllButton checkoutButton'.w(),
      classNames: ['panel-design'],

      title: SC.LabelView.design({
        layout: { left: 20, top: 10, right: 120, height: 24 },
        classNames: ['cart-title'],
        value: 'Cart',
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT
      }),

      closeButton: SC.ButtonView.design({
        layout: { right: 10, top: 10, width: 100, height: 24 },
        title: 'Close',
        action: 'hideCart'
      }),

      captions: SC.View.design({
        layout: { left: 10, right: 10, top: 39, height: 19 },
        backgroundColor: '#ccc',
        classNames: ['cart-caption'],
        childViews: 'nameCaption priceCaption quantityCaption totalPriceCaption'.w(),
  
        nameCaption: SC.LabelView.design({
          layout: { left: 60, top: 0, right: 310, height: 19 },
          classNames: ['cart-list-caption'],
          value: 'Product'
        }),

        priceCaption: SC.LabelView.design({
          layout: { right: 220, top: 0, width: 90, height: 19 },
          classNames: ['cart-list-caption'],
          value: 'Price/Item',
          textAlign: SC.ALIGN_CENTER
        }),
    
        quantityCaption: SC.LabelView.design({
          layout: { right: 130, top: 0, width: 90, height: 19 },
          classNames: ['cart-list-caption'],
          value: 'Quantity',
          textAlign: SC.ALIGN_CENTER
        }),
  
        totalPriceCaption: SC.LabelView.design({
          layout: { right: 40, top: 0, width: 90, height: 19 },
          classNames: ['cart-list-caption'],
          value: 'Total price ',
          textAlign: SC.ALIGN_CENTER
        })
      }),

      itemList: SC.ScrollView.design({
        layout: { right: 10, left: 10, top: 59, bottom: 60 },

        contentView: SC.ListView.design({
          contentBinding: 'EcBasic.cartItemsController.arrangedObjects',
          selectionBinding: 'EcBasic.cartItemsController.selection',

          rowHeight: 50,
          exampleView: EcBasic.CartItemView
        })
      }),

      totalPriceFooter: SC.View.design({
        layout: { left: 10, right: 10, height: 19, bottom: 40 },
        childViews: 'totalPrice'.w(),
        backgroundColor: '#ccc',
        classNames: ['cart-footer'],

        totalPrice: SC.LabelView.design({
          layout: { right: 40, top: 1, width: 90, height: 18 },
          valueBinding: 'EcBasic.cartController.formattedTotalPrice',
          textAlign: SC.ALIGN_RIGHT
        })
      }),

      removeSelectedButton: SC.ButtonView.design({
        layout: { right: 250, bottom: 10, width: 150, height: 24 },
        title: 'Remove Selected',
        action: 'removeCartItem',
        isEnabledBinding: 'EcBasic.cartItemsController.hasSelection'
      }),

      removeAllButton: SC.ButtonView.design({
        layout: { right: 120, bottom: 10, width: 120, height: 24 },
        title: 'Remove All',
        action: 'clearCart',
        isEnabledBinding: 'EcBasic.cartItemsController.hasItems'
      }),

      checkoutButton: SC.ButtonView.design({
        layout: { right: 10, bottom: 10, width: 100, height: 24 },
        title: 'Check Out',
        action: 'showCheckout',
        isEnabledBinding: 'EcBasic.cartItemsController.hasItems'
      })
    })
  }),

  checkoutPane: SC.PanelPane.design({
    layout: { top: 160, bottom: 80, left: 80, right: 80 },
    classNames: ['panel-design'],
    defaultResponder: EcBasic.statechart,

    contentView: SC.View.design({
      childViews: 'title itemList totalPriceFooter cancelButton checkoutButton'.w(),
      classNames: ['panel-design'],

      title: SC.LabelView.design({
        layout: { left: 20, top: 10, right: 120, height: 24 },
        classNames: ['cart-title'],
        value: 'Checkout Confirmation',
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT
      }),

      itemList: SC.ScrollView.design({
        layout: { right: 10, left: 10, top: 59, bottom: 60 },

        contentView: SC.ListView.design({
          contentBinding: 'EcBasic.cartItemsController.arrangedObjects',
          selectionBinding: 'EcBasic.cartItemsController.selection',

          rowHeight: 50,
          exampleView: EcBasic.CartItemView
        })
      }),

      totalPriceFooter: SC.View.design({
        layout: { left: 10, right: 10, height: 19, bottom: 40 },
        childViews: 'totalPrice'.w(),
        backgroundColor: '#ccc',
        classNames: ['cart-footer'],

        totalPrice: SC.LabelView.design({
          layout: { right: 40, top: 1, width: 90, height: 18 },
          valueBinding: 'EcBasic.cartController.formattedTotalPrice',
          textAlign: SC.ALIGN_RIGHT
        })
      }),

      cancelButton: SC.ButtonView.design({
        layout: { right: 120, bottom: 10, width: 100, height: 24 },
        title: 'Cancel',
        action: 'remove'
      }),

      checkoutButton: SC.ButtonView.design({
        layout: { right: 10, bottom: 10, width: 100, height: 24 },
        title: 'Confirm',
        action: 'checkout',
        isEnabledBinding: 'EcBasic.cartItemsController.hasItems'
      })
    })
  }),

  paypalPane: SC.PanelPane.design({                         // maybe something like this to show Paypal response
    layout: { top: 160, bottom: 80, left: 80, right: 80 },
    classNames: ['panel-design'],
    defaultResponder: EcBasic.statechart,

    contentView: SC.View.design({
      childViews: 'title closeButton webView'.w(),
      classNames: ['panel-design'],

      title: SC.LabelView.design({
        layout: { left: 20, top: 10, right: 120, height: 24 },
        classNames: ['cart-title'],
        value: 'Paypal Checkout',
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT
      }),

      closeButton: SC.ButtonView.design({
        layout: { right: 10, top: 10, width: 100, height: 24 },
        title: 'Close',
        action: 'close'
      }),

      webView: SC.WebView.design({
        layout: { top:59, left: 10, right: 10, bottom: 0 },
        valueBinding: 'EcBasic.adminController.url'
      })
    })
  }),

  categoryPane: SC.PanelPane.design({
    layout: { centerX: 0, top: 80, width: 420, height: 140 },
    classNames: ['category'],
    defaultResponder: EcBasic.statechart,

    contentView: SC.View.design({
      layout: { left: 0, right: 0, top: 0, bottom: 0 },
      childViews: 'title name cancelButton saveButton'.w(),

      title: SC.LabelView.design({
        layout: { left: 20, top: 10, right: 20, height: 24 },
        classNames: ['category-title'],
        value: 'Add a Category',
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT
      }),

      name: SC.View.design({
        layout: { left: 27, right: 24, top: 59, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_category',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 200, height: 22, right: 3, centerY: 0 },

          isEnabledBinding: SC.Binding.from("EcBasic.categoryController.isEditing")
                  .bool()
                  .transform(function(value, isForward) {  // TODO: isForward? and the !value in ecommerce?
            return value;
          }),
          valueBinding: 'EcBasic.categoryController.name'
        })
      }),

      cancelButton: SC.ButtonView.design({
        layout: { right: 120, bottom: 10, width: 100, height: 24 },
        title: 'Cancel',
        action: 'cancel'
      }),

      saveButton: SC.ButtonView.design({
        layout: { right: 10, bottom: 10, width: 100, height: 24 },
        title: 'Save',
        action: 'save',
        isDefault: YES,
        isEnabledBinding: SC.Binding.from("EcBasic.categoryController.isEditing")
                .bool()
                .transform(function(value, isForward) {
          return value;
        })
      })
    })
  }),

  messagePane: SC.PanelPane.design({
    layout: { centerX: 0, top: 80, width: 420, height: 140 },
    classNames: ['message'],
    defaultResponder: EcBasic.statechart,

    contentView: SC.View.design({
      title: null,
      message: null,

      layout: { left: 0, right: 0, top: 0, bottom: 0 },
      childViews: 'titleLabel messageLabel okButton'.w(),

      titleLabel: SC.LabelView.design({
        layout: { left: 20, top: 10, right: 20, height: 24 },
        classNames: ['message-title'],
        valueBinding: '*parentView.title',
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT
      }),

      messageLabel: SC.LabelView.design({
        layout: { left: 20, top: 50, right: 20, height: 24 },
        classNames: ['message-message'],
        valueBinding: '*parentView.message'
      }),

      okButton: SC.ButtonView.design({
        layout: { right: 10, bottom: 10, width: 100, height: 24 },
        title: 'OK',
        action: 'messageShown',
        isDefault: YES
      })
    })
  }),

  productPane: SC.PanelPane.design({
    layout: { centerX: 0, top: 80, width: 420, height: 440 },
    classNames: ['product'],
    defaultResponder: EcBasic.statechart,

    contentView: SC.View.design({
      layout: { left: 0, right: 0, top: 0, bottom: 0 },
      childViews: 'title category name description imgURL price stock cancelButton saveButton'.w(),

      title: SC.LabelView.design({
        layout: { left: 20, top: 10, right: 20, height: 24 },
        classNames: ['product-title'],
        value: 'Add a Product (Select category first.)',
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT
      }),

      category: SC.View.design({
        layout: { left: 17, right: 14, top: 59, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_category',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.SelectFieldView.design({
          layout: { width: 200, height: 22, right: 3, centerY: 0 },

          objectsBinding: 'EcBasic.categoriesController.arrangedObjects',
          nameKey: 'name',
          valueKey: 'value',

          isEnabledBinding: SC.Binding.from("EcBasic.productController.isEditing")
                  .bool()
                  .transform(function(value, isForward) {
            return value;
          }),
          valueBinding: 'EcBasic.productController.category'
        })
      }),

      name: SC.View.design({
        layout: { left: 17, right: 14, top: 100, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_name',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 200, height: 22, right: 3, centerY: 0 },

          isEnabledBinding: SC.Binding.from("EcBasic.productController.isEditing")
                  .bool()
                  .transform(function(value, isForward) {
            return value;
          }),
          valueBinding: 'EcBasic.productController.name'
        })
      }),

      description: SC.View.design({
        layout: { left: 17, right: 14, top: 141, height: 112 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_description',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 200, height: 104, right: 3, centerY: 0 },
          isTextArea: YES,

          isEnabledBinding: SC.Binding.from("EcBasic.productController.isEditing")
                  .bool()
                  .transform(function(value, isForward) {
            return value;
          }),
          valueBinding: 'EcBasic.productController.description'
        })
      }),

      imgURL: SC.View.design({
        layout: { left: 17, right: 14, top: 268, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_imgURL',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 200, height: 22, right: 3, centerY: 0 },

          isEnabledBinding: SC.Binding.from("EcBasic.productController.isEditing")
                  .bool()
                  .transform(function(value, isForward) {
            return value;
          }),
          valueBinding: 'EcBasic.productController.imgURL'
        })
      }),

      price: SC.View.design({
        layout: { left: 17, right: 14, top: 305, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_price',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 40, height: 22, right: 163, centerY: 0 },

          validator: SC.Validator.Number.create({ places: 2 }),
          isEnabledBinding: SC.Binding.from("EcBasic.productController.isEditing")
                  .bool()
                  .transform(function(value, isForward) {
            return value;
          }),
          valueBinding: 'EcBasic.productController.price'
        })
      }),

      stock: SC.View.design({
        layout: { left: 17, right: 14, top: 346, height: 26 },
        childViews: 'label field'.w(),

        label: SC.LabelView.design({
          layout: { left: 0, width: 107, height: 18, centerY: 0 },

          value: '_stock',
          localize: YES,
          textAlign: SC.ALIGN_RIGHT
        }),

        field: SC.TextFieldView.design({
          layout: { width: 40, height: 22, right: 163, centerY: 0 },

          isEnabledBinding: SC.Binding.from("EcBasic.productController.isEditing")
                  .bool()
                  .transform(function(value, isForward) {
            return value;
          }),
          valueBinding: 'EcBasic.productController.stock'
        })
      }),

      cancelButton: SC.ButtonView.design({
        layout: { right: 120, bottom: 10, width: 100, height: 24 },
        title: 'Cancel',
        action: 'cancel'
      }),

      saveButton: SC.ButtonView.design({
        layout: { right: 10, bottom: 10, width: 100, height: 24 },
        title: 'Save',
        action: 'save',
        isDefault: YES,
        isEnabledBinding: SC.Binding.from("EcBasic.productController.isEditing")
                .bool()
                .transform(function(value, isForward) {
          return value;
        })
      })
    })
  })
});
