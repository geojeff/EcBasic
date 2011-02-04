// ==========================================================================
// Project:   EcBasic.cartItemsController
// ==========================================================================
/*globals EcBasic */

/** @class

  The controller for a list of cartItems.

  @extends SC.ArrayController
*/

EcBasic.cartItemsController = SC.ArrayController.create(
/** @scope EcBasic.cartItemsController.prototype */ {
  contentBinding: 'EcBasic.cartController.items',
  canAddContent: YES,
  canRemoveContent: YES,
  destroyOnRemoval: YES,
  isEditable: YES,

  summary: function(key, value) {
    var items = this.get('content');
    if (!SC.none(items)) {
      return 'You have %@ items in your cart.'.fmt(items.get('length'));
    }
    return 'You have 0 items in your cart.';
  }.property('[]').cacheable()

});
