// ==========================================================================
// Project:   EcBasic.ProductItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

/** @class
  (Document Your View Here)
*/
EcBasic.ProductItemView = SC.ListItemView.extend(
/** @scope EcBasic.ProductItemView.prototype */ {
  childViews: 'productImage productName productPrice'.w(),
  classNames: ['product-item'],
  defaultResponder: EcBasic.statechart,

  productImage: SC.ImageView.design({
    layout: { top: 2, left: 32, height: 46, width: 46},
    classNames: ['product-item-icon'],
    valueBinding: '.parentView*content.imgUrl'
  }),

  productName: SC.LabelView.design({
    layout: { left: 90, centerY: 0, height: 24, right: 190 },
    className: ['product-item-name'],
    valueBinding: '.parentView*content.name'
  }),

//  editButton: SC.ButtonView.design({
//    layout: { centerY: 0, centerX: 0, width: 80, height: 32 },
//    title: 'Edit',
//    action: 'editProduct',
//    isEnabledBinding: SC.Binding.from("EcBasic.adminController.isLoggedIn")
//      .bool()
//      .transform(function(value, isForward) {
//      return !value;
//    })
//  }),

  productPrice: SC.LabelView.design({
    layout: { width: 80, right: 10, centerY: 0, height: 24 },
    className: ['product-item-price'],
    valueBinding: '.parentView*content.formattedPrice',
    textAlign: SC.ALIGN_RIGHT
  }),

  /**
    Change render behaviour depending on the type of the item
    */
  render: function(context, firstTime) {
    if (this.get('content').kindOf(EcBasic.Product)) {
      if (firstTime) {
        this.renderChildViews(context, firstTime);
      }
    } else {
      sc_super();
    }
  }
});
