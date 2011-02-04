// ==========================================================================
// Project:   EcBasic.Product
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
EcBasic.Product = SC.Record.extend(
/** @scope EcBasic.Product.prototype */ {
  name:        SC.Record.attr(String),
  description: SC.Record.attr(String),
  price:       SC.Record.attr(Number),
  stock:       SC.Record.attr(Number, { defaultValue: 0 } ),
  quantity:    SC.Record.attr(Number, { defaultValue: 1 }),
  isVisible:   SC.Record.attr(Boolean),
  imgUrl:      SC.Record.attr(String),
  category:    SC.Record.toOne('EcBasic.Category', { inverse: 'products', isMaster: NO }),
  cartItem:    SC.Record.toOne('EcBasic.CartItem', { inverse: 'product', isMaster: YES }),

  treeItemIsExpanded: NO,
  treeItemChildren: null,

  formattedPrice: function() {
    return '$%@'.fmt(this.get('price'));
  }.property('price').cacheable(),

  inStock: function() {
    return this.get('stock') > 0;
  }.property('stock').cacheable(),

  stockSummary: function() {
    if (this.get('inStock') == NO)
      return 'Out of stock';
    return 'Stock: %@'.fmt(this.get('stock'));
  }.property('stock').cacheable()
});

