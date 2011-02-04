// ==========================================================================
// Project:   EcBasic.CartItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

/** @class

  (Document Your View Here)

  @extends SC.ListItemView
*/
EcBasic.CartItemView = SC.ListItemView.extend(
/** @scope EcBasic.CartItemView.prototype */ {
  childViews: 'productImage productName productPrice productQuantity productTotalPrice removeButton'.w(),
  classNames: ['cart-item'],
  defaultResponder: EcBasic.statechart,

  productImage: SC.ImageView.design({
    layout: { top: 2, left: 5, height: 46, width: 46},
    classNames: ['product-item-icon'],
    valueBinding: '.parentView*content.product.imgUrl'
  }),

  productName: SC.LabelView.design({
    layout: { left: 60, centerY: 0, height: 14, right: 315 },
    className: ['product-item-name'],
    valueBinding: '.parentView*content.product.name'
  }),

  productPrice: SC.LabelView.design({
    layout: { width: 80, right: 225, centerY: 0, height: 14 },
    className: ['product-item-price'],
    valueBinding: '.parentView*content.product.formattedPrice',
    textAlign: SC.ALIGN_CENTER
  }),

  productQuantity: SC.LabelView.design({
    layout: { width: 80, right: 135, centerY: 0, height: 14 },
    valueBinding: '.parentView*content.quantity',
    textAlign: SC.ALIGN_CENTER
  }),

  productTotalPrice: SC.LabelView.design({
    layout: { width: 80, right: 45, centerY: 0, height: 14 },
    valueBinding: '.parentView*content.formattedTotalPrice',
    textAlign: SC.ALIGN_CENTER
  }),

  removeButton: SC.ImageView.design({
    layout: { width: 15, height: 15, centerY: 0, right: 14},
    canLoadInBackground: YES,
    value: static_url('images/popClose.gif'),
    //action: 'removeCartItem'
    click: function() {
      var content = this.get('parentView').get('content');
      if (content) {
        console.log('content ', content);
        EcBasic.statechart.sendAction('removeCartItem');
        //EcBasic.cartController.destroy();
      }
      return YES;
    }
  }),

  /**
    Change render behaviour to include the childViews (render behavoiur from the SC.View class)
    */
  render: function(context, firstTime) {
    if(firstTime)
      this.renderChildViews(context, firstTime);
  }

});
