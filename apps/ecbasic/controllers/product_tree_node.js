// ==========================================================================
// Project:   EcBasic.productTreeNodeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EcBasic */

/** @class

  @extends SC.ObjectController
*/
EcBasic.productTreeNodeController = SC.ObjectController.create(
/** @scope EcBasic.productTreeNodeController.prototype */ {
  contentBinding: SC.Binding.single('EcBasic.productTreeController.selection')
});

