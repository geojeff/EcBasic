// ==========================================================================
// Project:   EcBasic.Cart
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
EcBasic.Cart = SC.Record.extend(
/** @scope EcBasic.Cart.prototype */ {
  items: SC.Record.toMany('EcBasic.CartItem', { inverse: 'cart', isMaster: YES }),

  summary: function(key, value) {
    return 'You have %@ items in your cart.'.fmt(this.get('items').reduce(function(prev, item, idx, e) { return prev + item.get('quantity'); }, 0));
  }.property('items.[]', 'items').cacheable(),

  totalPrice: function(key, value) {
    if (!SC.none(this.get('items'))) {
      var totalPrice = this.get('items').reduce(function(prev, item, idx, e) { return prev + item.get('totalPrice'); }, 0);
      return totalPrice.toFixed(2);
    }
    return 0;
  }.property('items', 'items.[]').cacheable(),

  formattedTotalPrice: function(key, value) {
    var totalPrice = this.get('totalPrice');
    if (!SC.none(totalPrice)) {
      return '$%@'.fmt(totalPrice);
    }
    return '$0';
  }.property('totalPrice').cacheable()

});
