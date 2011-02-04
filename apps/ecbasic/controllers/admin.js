// ==========================================================================
// Project:   EcBasic.adminController
// ==========================================================================
/*globals EcBasic */

/** @class

  For use with adding/editing a product.

  @extends SC.Object
*/
EcBasic.adminController = SC.ObjectController.create(
/** @scope EcBasic.productController.prototype */ {
  username: 'test',
  password: 'test',
  isLoggedIn: NO,
  url: null  // maybe use for final checkout
});
