// ==========================================================================
// Project:   EcBasic.CartItem
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
EcBasic.CartItem = SC.Record.extend(
/** @scope EcBasic.CartItem.prototype */ {
  quantity:    SC.Record.attr(Number),
  product:     SC.Record.toOne('EcBasic.Product', { inverse: 'cartItem', isMaster: NO }),
  cart:        SC.Record.toOne('EcBasic.Cart', { inverse: 'items', isMaster: NO }),

  totalPrice: function(key, value) {
    var product = this.get('product');
    if (!SC.none(product)) {
      var q = this.get('quantity'),
          p = product.get('price'),
          price = p * q;

      return price;  // if toFixed(2) done here, it sees price as 'Object 031.9'
    }
    return 0;
  }.property('*product.price', 'quantity').cacheable(),

  formattedTotalPrice: function() {
    return '$%@'.fmt(this.get('totalPrice').toFixed(2));  // Note: had to all toFixed(2) here
  }.property('totalPrice').cacheable()

}) ;
